"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Field from "./Field";
import PlanSelector, { PlanId } from "./PlanSelector";
import Stepper from "./Stepper";

const VALID_PLANS: PlanId[] = ["free", "standard", "enterprise"];

// Same-origin proxy → /src/app/api/tenant-requests/route.ts → upstream fterp.test
const TENANT_API_URL = "/api/tenant-requests";

// Prefix-only (no dots) — the ".ftech.ltd" suffix is appended on submit.
const DOMAIN_RE = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9]+$/;
const ADMIN_USERNAME_RE = /^[a-z0-9_]+$/;

type FieldKey =
  | "tenant_name"
  | "domain"
  | "customer_name"
  | "customer_phone"
  | "customer_email"
  | "admin_username"
  | "admin_email"
  | "admin_password"
  | "admin_password_confirmation";

const SYSTEM_STEP_KEYS: FieldKey[] = [
  "tenant_name",
  "domain",
  "customer_name",
  "customer_phone",
  "customer_email",
];

type DomainStatus =
  | "idle"
  | "checking"
  | "available"
  | "unavailable"
  | "format_error";

function useDomainCheck(value: string) {
  const [status, setStatus] = useState<DomainStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const v = value.trim();
    if (!v || !DOMAIN_RE.test(v)) {
      setStatus("idle");
      setMessage(null);
      return;
    }
    setStatus("checking");
    setMessage(null);
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/tenant-requests/check-domain?domain=${encodeURIComponent(
            `${v}.ftech.ltd`,
          )}`,
          {
            signal: ctrl.signal,
            headers: { Accept: "application/json" },
          },
        );

        if (res.status === 422) {
          const body = await res.json().catch(() => null);
          const msg = body?.data?.errors?.domain?.[0];
          setStatus("format_error");
          setMessage(msg ?? "Domain không hợp lệ");
          return;
        }

        const body = await res.json().catch(() => null);
        if (body?.data?.available) {
          setStatus("available");
          setMessage(body?.message ?? "Domain có thể sử dụng");
        } else {
          setStatus("unavailable");
          setMessage(body?.message ?? "Domain đã được sử dụng");
        }
      } catch (e) {
        if ((e as Error)?.name === "AbortError") return;
        setStatus("idle");
        setMessage(null);
      }
    }, 450);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [value]);

  return { status, message };
}

function DomainStatusIcon({ status }: { status: DomainStatus }) {
  if (status === "checking") {
    return (
      <svg
        className="h-4 w-4 animate-spin text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (status === "available") {
    return (
      <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (status === "unavailable" || status === "format_error") {
    return (
      <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
      </svg>
    );
  }
  return null;
}

function EyeButton({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
      className="p-2 rounded-md text-slate-400 hover:text-primary-600 hover:bg-slate-100 transition-colors cursor-pointer"
    >
      {show ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 5.09A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7a11.7 11.7 0 01-3.17 4.42M6.12 6.12C4.06 7.4 2.52 9.36 1 12c1.73 3.89 6 7 11 7 1.9 0 3.65-.43 5.18-1.18" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

export default function RegisterFlow() {
  const searchParams = useSearchParams();
  const initialPlanParam = searchParams.get("plan");
  const initialPlan: PlanId | null =
    initialPlanParam && (VALID_PLANS as string[]).includes(initialPlanParam)
      ? (initialPlanParam as PlanId)
      : null;

  // If a valid ?plan=… was passed, pre-select it AND skip the plan-selection
  // step so the user lands directly on the next step.
  const [step, setStep] = useState(initialPlan ? 1 : 0);
  const [plan, setPlan] = useState<PlanId>(initialPlan ?? "free");

  // Free flow — System step
  const [systemName, setSystemName] = useState("");
  const [domain, setDomain] = useState("");
  const [yourName, setYourName] = useState("");
  const [yourPhone, setYourPhone] = useState("");
  const [yourEmail, setYourEmail] = useState("");

  // Free flow — Admin step
  const [adminUsername, setAdminUsername] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminPasswordConfirmation, setAdminPasswordConfirmation] =
    useState("");
  const [showPwd, setShowPwd] = useState(false);

  // Paid flow (tenant request)
  const [tenantName, setTenantName] = useState("");
  const [tenantDomain, setTenantDomain] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldKey, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isFree = plan === "free";
  const t = useTranslations("auth.register");

  const FREE_STEPS = [
    { title: t("stepPlanTitle"), description: t("stepPlanDesc") },
    { title: t("stepSystemTitle"), description: t("stepSystemDesc") },
    { title: t("stepAdminTitle"), description: t("stepAdminDesc") },
    { title: t("stepDoneTitle"), description: t("stepDoneFreeDesc") },
  ];
  const PAID_STEPS = [
    { title: t("stepPlanTitle"), description: t("stepPlanDesc") },
    { title: t("stepContactTitle"), description: t("stepContactDesc") },
    { title: t("stepDoneTitle"), description: t("stepDonePaidDesc") },
  ];
  const steps = isFree ? FREE_STEPS : PAID_STEPS;

  // ─────────────────────────────────────────────────────────────
  //  Per-field validators — return error message or undefined
  // ─────────────────────────────────────────────────────────────
  const validators: Record<FieldKey, (v: string) => string | undefined> = {
    tenant_name: (v) =>
      !v.trim()
        ? t("vTenantRequired")
        : v.length > 255
          ? t("vMax255")
          : undefined,
    domain: (v) =>
      !v.trim()
        ? t("vDomainRequired")
        : v.length > 240
          ? t("vMax240")
          : !DOMAIN_RE.test(v)
            ? t("vDomainFormat")
            : undefined,
    customer_name: (v) =>
      !v.trim()
        ? t("vNameRequired")
        : v.length > 255
          ? t("vMax255")
          : undefined,
    customer_phone: (v) =>
      !v.trim()
        ? t("vPhoneRequired")
        : v.length > 32
          ? t("vMax32")
          : !PHONE_RE.test(v)
            ? t("vPhoneFormat")
            : undefined,
    customer_email: (v) =>
      !v.trim()
        ? t("vEmailRequired")
        : v.length > 255
          ? t("vMax255")
          : !EMAIL_RE.test(v)
            ? t("vEmailFormat")
            : undefined,
    admin_username: (v) =>
      !v.trim()
        ? t("vUsernameRequired")
        : v.length < 3
          ? t("vUsernameMin")
          : v.length > 255
            ? t("vMax255")
            : !ADMIN_USERNAME_RE.test(v)
              ? t("vUsernameFormat")
              : undefined,
    admin_email: (v) =>
      !v.trim()
        ? t("vEmailRequired")
        : v.length > 255
          ? t("vMax255")
          : !EMAIL_RE.test(v)
            ? t("vEmailFormat")
            : undefined,
    admin_password: (v) =>
      !v
        ? t("vPasswordRequired")
        : v.length < 8
          ? t("vPasswordMin")
          : v.length > 255
            ? t("vMax255")
            : undefined,
    admin_password_confirmation: (v) =>
      !v
        ? t("vRePasswordRequired")
        : v !== adminPassword
          ? t("vPasswordMismatch")
          : undefined,
  };

  // Live error per field — recomputed on every render. Empty input → no
  // error (until user blurs / submits). Once any keystroke is entered we
  // show real-time validation. API errors override local validation.
  const liveErr = (key: FieldKey, value: string): string | undefined =>
    fieldErrors[key] ?? (value.length > 0 ? validators[key](value) : undefined);

  // On blur: always run validator (so required-empty error appears too).
  const handleBlur = (key: FieldKey, value: string) => () => {
    setFieldErrors((prev) => ({ ...prev, [key]: validators[key](value) }));
  };

  // Clear field error on change so the user isn't yelled at while typing.
  const clearErr = (key: FieldKey) => {
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  // Validate a whole step at once (on submit).
  const validateKeys = (keys: FieldKey[], values: Record<FieldKey, string>) => {
    const errs: Partial<Record<FieldKey, string>> = { ...fieldErrors };
    let ok = true;
    for (const k of keys) {
      const e = validators[k](values[k]);
      errs[k] = e;
      if (e) ok = false;
    }
    setFieldErrors(errs);
    return ok;
  };

  const adminValues: Record<FieldKey, string> = {
    tenant_name: systemName,
    domain: domain,
    customer_name: yourName,
    customer_phone: yourPhone,
    customer_email: yourEmail,
    admin_username: adminUsername,
    admin_email: adminEmail,
    admin_password: adminPassword,
    admin_password_confirmation: adminPasswordConfirmation,
  };

  const paidValues: Record<FieldKey, string> = {
    tenant_name: tenantName,
    domain: tenantDomain,
    customer_name: customerName,
    customer_phone: customerPhone,
    customer_email: customerEmail,
    admin_username: "",
    admin_email: "",
    admin_password: "",
    admin_password_confirmation: "",
  };

  // Domain availability check (debounced) — applied to whichever flow is active
  const activeDomain = isFree ? domain : tenantDomain;
  const domainCheck = useDomainCheck(activeDomain);
  const domainBlocked =
    domainCheck.status === "unavailable" ||
    domainCheck.status === "format_error";

  const canSubmitSystem =
    systemName.trim() &&
    domain.trim() &&
    yourName.trim() &&
    yourPhone.trim() &&
    yourEmail.trim() &&
    EMAIL_RE.test(yourEmail) &&
    PHONE_RE.test(yourPhone) &&
    !domainBlocked &&
    domainCheck.status !== "checking";

  const canSubmitPaidStep1 =
    customerName.trim() &&
    customerPhone.trim() &&
    customerEmail.trim() &&
    EMAIL_RE.test(customerEmail) &&
    PHONE_RE.test(customerPhone);

  const canSubmitAdmin =
    adminUsername.trim().length >= 3 &&
    ADMIN_USERNAME_RE.test(adminUsername) &&
    adminEmail.trim() &&
    EMAIL_RE.test(adminEmail) &&
    adminPassword.length >= 8 &&
    adminPassword === adminPasswordConfirmation;

  type TenantPayload = {
    tenant_name: string;
    domain: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    admin_username?: string;
    admin_email?: string;
    admin_password?: string;
    admin_password_confirmation?: string;
  };

  const callTenantApi = async (
    payload: TenantPayload,
    onSuccess: () => void,
  ) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(TENANT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        onSuccess();
        return;
      }

      if (res.status === 422) {
        const body = await res.json().catch(() => null);
        const apiErrors: Record<string, string[]> | undefined =
          body?.data?.errors;
        const mapped: Partial<Record<FieldKey, string>> = {};
        if (apiErrors && typeof apiErrors === "object") {
          for (const [key, messages] of Object.entries(apiErrors)) {
            if (Array.isArray(messages) && messages.length > 0) {
              mapped[key as FieldKey] = messages[0];
            }
          }
          setFieldErrors((prev) => ({ ...prev, ...mapped }));

          if (
            isFree &&
            Object.keys(mapped).some((k) =>
              SYSTEM_STEP_KEYS.includes(k as FieldKey),
            )
          ) {
            setStep(1);
          }
        }
        setSubmitError(
          body?.message ?? t("eValidation"),
        );
        return;
      }

      if (res.status === 429) {
        setSubmitError(t("eRateLimit"));
        return;
      }

      setSubmitError(t("eGeneric"));
    } catch {
      setSubmitError(t("eNetwork"));
    } finally {
      setSubmitting(false);
    }
  };

  // Free flow: step 1 (system) → step 2 (admin) → submit → step 3 (done)
  const handleNextFreeStep1 = () => {
    if (!validateKeys(SYSTEM_STEP_KEYS, adminValues)) return;
    setStep(2);
  };

  const handleFreeFinalSubmit = () => {
    const adminKeys: FieldKey[] = [
      "admin_username",
      "admin_email",
      "admin_password",
      "admin_password_confirmation",
    ];
    if (!validateKeys(adminKeys, adminValues)) return;
    callTenantApi(
      {
        tenant_name: systemName.trim(),
        domain: `${domain.trim()}.ftech.ltd`,
        customer_name: yourName.trim(),
        customer_phone: yourPhone.trim(),
        customer_email: yourEmail.trim(),
        admin_username: adminUsername.trim(),
        admin_email: adminEmail.trim(),
        admin_password: adminPassword,
        admin_password_confirmation: adminPasswordConfirmation,
      },
      () => setStep(3),
    );
  };

  // Paid flow: step 1 (tenant) → submit → step 2 (done).
  // Does NOT call the tenant-requests API — only sends a sales-contact
  // notification to Mattermost so the team can follow up.
  const handlePaidSubmit = async () => {
    const paidContactKeys: FieldKey[] = [
      "customer_name",
      "customer_phone",
      "customer_email",
    ];
    if (!validateKeys(paidContactKeys, paidValues)) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName.trim(),
          email: customerEmail.trim(),
          phone: customerPhone.trim(),
          plan,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? t("eGeneric"));
      }
      setStep(2);
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : t("eNetwork"),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const lastStep = steps.length - 1;
  const finishedEmail = isFree
    ? yourEmail
    : adminEmail || customerEmail;

  return (
    <div className="space-y-4">
      <Stepper steps={steps} current={step} />

      {/* STEP 0 — Plan */}
      {step === 0 && (
        <div className="space-y-4">
          <div className="rounded-xl bg-primary-50/70 border border-primary-100 p-4">
            <p className="text-sm text-primary-800">
              <span className="font-semibold">{t("planIntroLead")}</span>
              {t("planIntroMiddle")}
              <span className="font-semibold">{t("planIntroFree")}</span>
              {t("planIntroSuffix")}
              <span className="font-semibold">{t("planIntroLimit")}</span>.
            </p>
          </div>
          <PlanSelector
            value={plan}
            onChange={(p) => {
              setPlan(p);
              setStep(0);
            }}
          />
          <div className="flex justify-end">
            <Button onClick={() => setStep(1)}>{t("bNext")}</Button>
          </div>
        </div>
      )}

      {/* ────────── FREE FLOW — STEP 1: System info ────────── */}
      {isFree && step === 1 && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Field
              label={t("fSystemName")}
              name="systemName"
              placeholder={t("fSystemNamePh")}
              value={systemName}
              onChange={(e) => {
                setSystemName(e.target.value);
                clearErr("tenant_name");
              }}
              onBlur={handleBlur("tenant_name", systemName)}
              error={liveErr("tenant_name", systemName)}
              maxLength={255}
              required
            />
            <Field
              label={t("fDomain")}
              name="domain"
              placeholder={t("fDomainPh")}
              value={domain}
              onChange={(e) => {
                setDomain(
                  e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                );
                clearErr("domain");
              }}
              onBlur={handleBlur("domain", domain)}
              suffix={
                <span className="flex items-center gap-2">
                  <DomainStatusIcon status={domainCheck.status} />
                  <span>.ftech.ltd</span>
                </span>
              }
              error={
                liveErr("domain", domain) ??
                (domainBlocked ? domainCheck.message ?? undefined : undefined)
              }
              hint={
                domainCheck.status === "available" && domainCheck.message
                  ? domainCheck.message
                  : t("fDomainHint")
              }
              required
            />
          </div>

          <div className="pt-2">
            <p className="text-sm font-semibold text-primary-800 mb-3">
              {t("personalInfo")}
            </p>
            <div className="space-y-4">
              <Field
                label={t("fYourName")}
                name="yourName"
                placeholder={t("fYourNamePh")}
                value={yourName}
                onChange={(e) => {
                  setYourName(e.target.value);
                  clearErr("customer_name");
                }}
                onBlur={handleBlur("customer_name", yourName)}
                error={liveErr("customer_name", yourName)}
                maxLength={255}
                required
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label={t("fPhone")}
                  name="yourPhone"
                  type="tel"
                  inputMode="numeric"
                  placeholder={t("fPhonePh")}
                  value={yourPhone}
                  onChange={(e) => {
                    setYourPhone(e.target.value.replace(/\D/g, ""));
                    clearErr("customer_phone");
                  }}
                  onBlur={handleBlur("customer_phone", yourPhone)}
                  error={liveErr("customer_phone", yourPhone)}
                  maxLength={32}
                  required
                />
                <Field
                  label={t("fEmail")}
                  name="yourEmail"
                  type="email"
                  placeholder={t("fEmailPh")}
                  value={yourEmail}
                  onChange={(e) => {
                    setYourEmail(e.target.value);
                    clearErr("customer_email");
                  }}
                  onBlur={handleBlur("customer_email", yourEmail)}
                  error={liveErr("customer_email", yourEmail)}
                  maxLength={255}
                  required
                />
              </div>
            </div>
          </div>

          {submitError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep(0)}>
              {t("bBack")}
            </Button>
            <Button
              onClick={handleNextFreeStep1}
              {...(!canSubmitSystem && { disabled: true })}
              className={!canSubmitSystem ? "opacity-50 cursor-not-allowed" : ""}
            >
              {t("bNext")}
            </Button>
          </div>
        </div>
      )}

      {/* ────────── FREE FLOW — STEP 2: Super Admin + submit ────────── */}
      {isFree && step === 2 && (
        <div className="space-y-4">
          <div className="rounded-xl bg-primary-50/70 border border-primary-100 p-4">
            <p className="text-sm text-primary-800">
              {t("adminIntroPrefix")}
              <span className="font-semibold">{t("adminIntroHighlight")}</span>
              {t("adminIntroSuffix")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label={t("fAdminUsername")}
              name="admin_username"
              placeholder={t("fAdminUsernamePh")}
              value={adminUsername}
              onChange={(e) => {
                setAdminUsername(e.target.value.toLowerCase());
                clearErr("admin_username");
              }}
              onBlur={handleBlur("admin_username", adminUsername)}
              error={liveErr("admin_username", adminUsername)}
              hint={t("fAdminUsernameHint")}
              maxLength={255}
              required
            />
            <Field
              label={t("fAdminEmail")}
              name="admin_email"
              type="email"
              placeholder={t("fAdminEmailPh")}
              value={adminEmail}
              onChange={(e) => {
                setAdminEmail(e.target.value);
                clearErr("admin_email");
              }}
              onBlur={handleBlur("admin_email", adminEmail)}
              error={liveErr("admin_email", adminEmail)}
              maxLength={255}
              required
            />
            <Field
              label={t("fPassword")}
              name="admin_password"
              type={showPwd ? "text" : "password"}
              placeholder={t("fPasswordPh")}
              value={adminPassword}
              onChange={(e) => {
                setAdminPassword(e.target.value);
                clearErr("admin_password");
                // Re-validate confirmation when password changes
                if (adminPasswordConfirmation) clearErr("admin_password_confirmation");
              }}
              onBlur={handleBlur("admin_password", adminPassword)}
              error={liveErr("admin_password", adminPassword)}
              hint={t("fPasswordHint")}
              maxLength={255}
              required
              suffix={
                <EyeButton show={showPwd} onToggle={() => setShowPwd((s) => !s)} />
              }
            />
            <Field
              label={t("fRePassword")}
              name="admin_password_confirmation"
              type={showPwd ? "text" : "password"}
              placeholder={t("fRePasswordPh")}
              value={adminPasswordConfirmation}
              onChange={(e) => {
                setAdminPasswordConfirmation(e.target.value);
                clearErr("admin_password_confirmation");
              }}
              onBlur={handleBlur(
                "admin_password_confirmation",
                adminPasswordConfirmation,
              )}
              error={liveErr(
                "admin_password_confirmation",
                adminPasswordConfirmation,
              )}
              hint={t("fRePasswordHint")}
              maxLength={255}
              required
            />
          </div>

          {submitError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              ← Quay lại
            </Button>
            <Button
              onClick={handleFreeFinalSubmit}
              {...((!canSubmitAdmin || submitting) && { disabled: true })}
              className={
                !canSubmitAdmin || submitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            >
              {submitting ? t("bCreating") : t("bCreateAccount")}
            </Button>
          </div>
        </div>
      )}

      {/* ────────── PAID FLOW (Standard / Enterprise) ────────── */}
      {!isFree && step === 1 && (
        <div className="space-y-4">
          <div className="rounded-xl bg-primary-50/70 border border-primary-100 p-4">
            <p className="text-sm text-primary-800">
              {t("paidIntroPrefix")}
              <span className="font-semibold capitalize">{plan}</span>
              {t("paidIntroSuffix")}
            </p>
          </div>

          <Field
            label={t("fContactName")}
            name="customer_name"
            placeholder={t("fYourNamePh")}
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              clearErr("customer_name");
            }}
            onBlur={handleBlur("customer_name", customerName)}
            error={liveErr("customer_name", customerName)}
            maxLength={255}
            required
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label={t("fPhone")}
              name="customer_phone"
              type="tel"
              inputMode="numeric"
              placeholder={t("fPhonePh")}
              value={customerPhone}
              onChange={(e) => {
                setCustomerPhone(e.target.value.replace(/\D/g, ""));
                clearErr("customer_phone");
              }}
              onBlur={handleBlur("customer_phone", customerPhone)}
              error={liveErr("customer_phone", customerPhone)}
              maxLength={32}
              required
            />
            <Field
              label={t("fEmail")}
              name="customer_email"
              type="email"
              placeholder={t("fEmailPh")}
              value={customerEmail}
              onChange={(e) => {
                setCustomerEmail(e.target.value);
                clearErr("customer_email");
              }}
              onBlur={handleBlur("customer_email", customerEmail)}
              error={liveErr("customer_email", customerEmail)}
              maxLength={255}
              required
            />
          </div>

          {submitError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
          )}

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep(0)}>
              {t("bBack")}
            </Button>
            <Button
              onClick={handlePaidSubmit}
              {...((!canSubmitPaidStep1 || submitting) && { disabled: true })}
              className={
                !canSubmitPaidStep1 || submitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            >
              {submitting ? t("bSending") : t("bSendRequest")}
            </Button>
          </div>
        </div>
      )}

      {/* ────────── DONE (last step, both flows) ────────── */}
      {step === lastStep && step !== 0 && (
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-amber-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-900">
              {isFree ? t("doneFreeTitle") : t("donePaidTitle")}
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {isFree ? (
                <>
                  {t("doneFreeBodyPre")}
                  <span className="font-semibold text-primary-700">
                    {finishedEmail || t("doneFallbackEmail")}
                  </span>
                  .
                </>
              ) : (
                <>
                  {t("donePaidBodyPre")}
                  <span className="font-semibold text-primary-700">
                    {finishedEmail || t("doneFallbackEmail")}
                  </span>
                  {t("donePaidBodySuf")}
                </>
              )}
            </p>
          </div>
          <Button href="/">{t("bHome")}</Button>
        </div>
      )}
    </div>
  );
}
