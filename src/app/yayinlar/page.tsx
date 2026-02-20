import { client } from "@/sanity/client";
import Link from "next/link";

// ISR: Sayfa her 60 saniyede bir arka planda yeniden oluşturulur.
export const revalidate = 60;

// 1. GÜNCELLEME: Sorguya "slug" bilgisini ekledik
async function getPublications() {
  const query = `*[_type == "publication"] | order(publishedAt desc) {
    title,
    authors,
    publishedAt,
    category,
    summary,
    link,
    "slug": slug.current, 
    "fileUrl": file.asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function YayinlarPage() {
  const yayinlar = await getPublications();

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
            Akademik Arşiv
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Bilimsel <span className="text-indigo-600">Yayınlar</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Grubumuz tarafından hazırlanan, uluslararası standartlarda akademik
            çalışmalar ve makaleler.
          </p>
        </div>

        <div className="grid gap-8">
          {yayinlar.length === 0 && (
            <div className="text-center py-20 rounded-3xl border-2 border-dashed border-white/10 text-gray-500 font-medium">
              Henüz yayın eklenmemiş.
            </div>
          )}

          {yayinlar.map((yayin: any, index: number) => (
            <div
              key={index}
              className="group relative bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <span className="inline-block px-4 py-1.5 text-[10px] font-black tracking-widest text-indigo-600 bg-indigo-50 rounded-full uppercase border border-indigo-100">
                  {yayin.category || "Genel"}
                </span>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  {yayin.publishedAt}
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">
                {yayin.title}
              </h2>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                  {yayin.authors?.charAt(0)}
                </div>
                <p className="text-sm text-gray-400 font-semibold">
                  Yazarlar:{" "}
                  <span className="text-gray-200">{yayin.authors}</span>
                </p>
              </div>

              <p className="text-gray-400 leading-relaxed mb-8 line-clamp-3 text-lg">
                {yayin.summary}
              </p>

              <div className="flex items-center justify-between pt-8 border-t border-white/10">
                <Link
                  href={`/yayinlar/${yayin.slug}`}
                  className="group/btn flex items-center gap-2 text-gray-100 font-black text-sm uppercase tracking-wider"
                >
                  Detayları İncele
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform group-hover/btn:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                {yayin.fileUrl && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    PDF Mevcut
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
