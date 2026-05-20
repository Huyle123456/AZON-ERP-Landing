import Image from "next/image";

/**
 * Shared wrapper that renders the blurred office photo + dark overlay behind
 * whatever is inside (typically CTA + Footer). Reused across pages so the
 * visual continuity stays consistent.
 */
export default function FooterBackdrop({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-xs scale-105"
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-900/80 via-primary-900/75 to-primary-900/90" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
