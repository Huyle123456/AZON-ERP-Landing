import Image from "next/image";

export default function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Image
        src="/images/bgs/bg3.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Soft dark overlay so the white card pops */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-900/55 via-primary-800/40 to-slate-900/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
