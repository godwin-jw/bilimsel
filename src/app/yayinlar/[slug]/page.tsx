import { client } from "@/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";

// Tek bir yayını çeken fonksiyon
async function getPublication(slug: string) {
  const query = `*[_type == "publication" && slug.current == $slug][0]{
    title,
    authors,
    publishedAt,
    category,
    summary,
    link,
    "fileUrl": file.asset->url
  }`;
  
  // Burada slug'ın dolu olduğundan emin oluyoruz
  const data = await client.fetch(query, { slug }, { next: { revalidate: 0 } });
  return data;
}

// ⚠️ DEĞİŞİKLİK BURADA: params artık Promise tipinde
export default async function YayinDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. Önce params'ı bekliyoruz (Next.js 15 kuralı)
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 2. Şimdi slug'ı kullanabiliriz
  const yayin = await getPublication(slug);

  // Eğer yayın bulunamazsa 404 sayfasına at
  if (!yayin) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Geri Dön Butonu */}
        <Link
          href="/yayinlar"
          className="group inline-flex items-center gap-2 text-gray-500 hover:text-gray-100 mb-12 transition-colors font-bold text-sm uppercase tracking-widest"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform group-hover:-translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Tüm Yayınlara Dön
        </Link>

        {/* Detay Kartı */}
        <article className="relative">
          {/* Üst Bilgiler */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black tracking-widest rounded-full uppercase border border-indigo-100">
              {yayin.category || "Genel"}
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {yayin.publishedAt}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-[1.1]">
            {yayin.title}
          </h1>

          <div className="flex items-center gap-4 mb-12 p-6 rounded-3xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-lg font-black text-indigo-300 shadow-sm">
              {yayin.authors?.charAt(0)}
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
                Yazarlar
              </h3>
              <p className="text-lg font-bold text-gray-100">{yayin.authors}</p>
            </div>
          </div>

          {/* İçerik / Özet */}
          <div className="prose prose-indigo prose-lg md:prose-xl max-w-none text-gray-300 mb-16">
            <h3 className="text-2xl font-black text-white tracking-tighter mb-6 uppercase">
              Özet
            </h3>
            <p className="whitespace-pre-line leading-relaxed">
              {yayin.summary}
            </p>
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex flex-col sm:flex-row gap-4 pt-12 border-t border-white/10">
            {yayin.fileUrl && (
              <Link
                href={yayin.fileUrl}
                target="_blank"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-rose-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-50 transition-all border-2 border-rose-100 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                PDF İndir
              </Link>
            )}

            {yayin.link && (
              <Link
                href={yayin.link}
                target="_blank"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/25 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                Kaynağa Git
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}