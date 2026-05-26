import { NextResponse } from "next/server";

interface Body {
  name: string;
  email: string;
  phone: string;
  plan: string;
  systemName?: string;
}

const MAX_BODY = 8 * 1024; // 8 KB is plenty for a contact form

export async function POST(req: Request) {
  const webhook = process.env.MATTERMOST_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { error: "MATTERMOST_WEBHOOK_URL is not configured" },
      { status: 500 },
    );
  }

  // Reject oversized payloads before parsing
  const len = Number(req.headers.get("content-length") ?? "0");
  if (len > MAX_BODY) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let raw: string;
  try {
    raw = await req.text();
    if (raw.length > MAX_BODY) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  let body: Body;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, phone, plan, systemName } = body;
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !plan) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  // Hard-cap lengths to defend against oversized payloads + Mattermost markdown
  // injection (escape special chars + @/# mentions, strip newlines).
  const sanitize = (raw: string, max: number) =>
    raw
      .slice(0, max)
      .replace(/[\r\n]+/g, " ")
      .replace(/([*_~`|>\\])/g, "\\$1")
      .replace(/@(channel|here|all)/gi, "@​$1");

  const safeName = sanitize(name, 255);
  const safeEmail = sanitize(email, 255);
  const safePhone = sanitize(phone, 32);
  const safeSystem = systemName ? sanitize(systemName, 255) : null;
  const safePlan = sanitize(plan, 32);

  const planLabel =
    safePlan.charAt(0).toUpperCase() + safePlan.slice(1).toLowerCase();
  const headline = `Khách hàng đã chọn gói **${planLabel}**, hãy liên hệ để tư vấn ngay!`;
  const text = [
    headline,
    "",
    `**Tên khách hàng:** ${safeName}`,
    `**Email:** ${safeEmail}`,
    `**Số điện thoại:** ${safePhone}`,
    safeSystem ? `**Tên hệ thống:** ${safeSystem}` : null,
    `**Thời gian:** ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const payload = {
    username: "Azon ERP",
    icon_emoji: ":briefcase:",
    attachments: [
      {
        fallback: `Azon ERP — khách hàng đã chọn gói ${planLabel}, hãy liên hệ để tư vấn ngay`,
        color: "#2F5E97",
        title: "Azon ERP",
        pretext: headline,
        text,
      },
    ],
  };

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return NextResponse.json(
      { error: `Mattermost webhook failed: ${res.status} ${err}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
