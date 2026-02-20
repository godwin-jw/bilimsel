import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import { PortableText } from "next-sanity";
import Link from "next/link"; // Link bileşenini ekledik

// ISR: Her slug sayfası 60 saniyede bir yeniden oluşturulur.
export const revalidate = 60;

// Bilinmeyen slug'lara 404 yerine dinamik render izni ver
export const dynamicParams = true;

// Build sırasında mevcut tüm proje slug'larını önceden oluştur
export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
  const projeler = await client.fetch(query);
  return projeler.map((p: { slug: string }) => ({ slug: p.slug }));
}

// Tek bir projeyi çeken fonksiyon
async function getProject(slug: string) {
  // DİKKAT: Query'yi daha güvenli hale getirdik ($slug parametresi ile)
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    status,
    content
  }`;
  
  // Parametreyi query'ye gönderiyoruz
  const data = await client.fetch(query, { slug });
  return data;
}

// Next.js 15 İçin Doğru Tanımlama
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  // 1. ADIM: Params verisini 'await' ile çözümlüyoruz (Next.js 15 kuralı)
  const { slug } = await params;

  // 2. ADIM: Çözümlenen slug ile veriyi çekiyoruz
  const proje = await getProject(slug);

  // Debug için terminale yazdıralım (Sorun olursa buraya bakarsın)
  console.log("Aranan Slug:", slug);
  console.log("Bulunan Proje:", proje?.title);

  if (!proje) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Proje Bulunamadı</h1>
          <p className="text-gray-500 mt-2">Aradığınız '{slug}' isminde bir proje yok.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Başlık ve Durum */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
            {proje.status}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8">
            {proje.title}
          </h1>
        </div>

        {/* Büyük Kapak Resmi */}
        {proje.mainImage && (
          <div className="relative w-full h-[400px] md:h-[600px] mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10">
            <Image
              src={urlFor(proje.mainImage).url()}
              alt={proje.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Zengin İçerik (Makale Metni) */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-300 prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
          {proje.content && <PortableText value={proje.content} />}
        </div>

        <div className="mt-20 pt-10 border-t border-white/10">
          <Link
            href="/projeler"
            className="group flex items-center gap-2 text-gray-100 font-black text-sm uppercase tracking-wider hover:text-blue-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Geri Dön
          </Link>
        </div>
      </div>
    </div>
  );
}