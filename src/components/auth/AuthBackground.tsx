import Image from "next/image";
// Static import → Next.js generates blurDataURL at build time, giving an
// instant low-quality preview while the real image streams in.
import bgImage from "../../../public/images/bgs/bg3.jpg";

export default function AuthBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      // Painted before JS/CSS for <Image> kicks in, so the screen is never
      // pure white during the swap to /login.
      style={{
        background:
          "linear-gradient(135deg, #0f1f33 0%, #1f3f65 45%, #2F5E97 100%)",
      }}
    >
      <Image
        src={bgImage}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
        // Smaller resolution requested — we don't need a 4K hero bg, and a
        // smaller fetch is faster especially on slow networks.
        quality={70}
      />
      {/* Soft dark overlay so the white card pops */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-900/55 via-primary-800/40 to-slate-900/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
