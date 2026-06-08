// Skeleton shown while the blog detail server component is awaiting data.
// Next.js renders this automatically from /blog/[slug]/loading.tsx whenever
// the matching route segment is fetching. Mirrors the detail page layout
// so the swap-in feels instant.
export default function BlogDetailLoading() {
  return (
    <main className="bg-white min-h-screen mt-16 pb-16 md:pb-24" aria-busy="true">
      {/* Cover image placeholder */}
      <div className="relative w-full aspect-[16/7] md:aspect-[21/8] bg-gray-200 animate-pulse" />

      {/* Title block */}
      <header className="border-b border-gray-200 mt-10 md:mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
          <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse mb-6" />
          <div className="space-y-3 max-w-3xl">
            <div className="h-8 md:h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 md:h-12 bg-gray-200 rounded animate-pulse w-4/5" />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
          {/* Aside: TOC + share */}
          <aside className="order-2 lg:order-1 space-y-8">
            {/* TOC */}
            <div>
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2 border-l-2 border-gray-200 pl-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 bg-gray-200 rounded animate-pulse"
                    style={{ width: `${75 - i * 7}%` }}
                  />
                ))}
              </div>
            </div>
            {/* Share */}
            <div>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-9 w-9 bg-gray-200 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Article body */}
          <div className="order-1 lg:order-2 space-y-4">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-11/12" />

            <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3 mt-8" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />

            {/* Image placeholder inside body */}
            <div className="aspect-video bg-gray-200 rounded-xl animate-pulse mt-6" />

            <div className="h-4 bg-gray-200 rounded animate-pulse mt-6" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          </div>
        </div>
      </div>
    </main>
  );
}
