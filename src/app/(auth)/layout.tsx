import AuthBackground from "@/components/auth/AuthBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Root layout still renders Header/Footer/CTA underneath. Lock body scroll
  // only on >=md so the overlay handles its own state; on mobile, let the
  // overlay scroll vertically when content overflows.
  //
  // AuthBackground lives at the LAYOUT level (not inside each page) so it
  // persists across /login ↔ /register navigation without re-mounting/refetching
  // the hero image.
  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          html, body { overflow: hidden !important; height: 100vh; }
        }
      `}</style>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <AuthBackground />
        {children}
      </div>
    </>
  );
}
