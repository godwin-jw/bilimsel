import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

// Veriyi çeken fonksiyon (GROQ Sorgusu)
async function getProjects() {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    mainImage,
    summary,
    status
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function ProjelerPage() {
  // Verileri veritabanından bekle ve al
  const projeler = await getProjects();

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 py-24 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Briefcase className="w-3 h-3" />
            Portfolyomuz
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            Bilimsel <span className="text-blue-600">Projelerimiz</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium max-w-2xl">
            Akademik disiplin ve yenilikçi yaklaşımlarla yürüttüğümüz güncel
            çalışmalarımız.
          </p>
        </div>

        {/* Proje Listesi - Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projeler.map((proje: any, index: number) => (
            <div
              key={index}
              className="group relative bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
            >
              <BorderBeam size={250} duration={12} delay={index * 2} />
              {/* Resim Alanı */}
              {proje.mainImage && (
                <div className="h-64 w-full relative overflow-hidden">
                  <Image
                    src={urlFor(proje.mainImage).url()}
                    alt={proje.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              <div className="p-8 flex flex-col grow relative">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {proje.status}
                  </span>
                </div>

                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter group-hover:text-blue-400 transition-colors leading-tight">
                  {proje.title}
                </h3>

                <p className="text-gray-400 mb-10 grow line-clamp-3 leading-relaxed font-medium text-lg">
                  {proje.summary}
                </p>
                <Link
                  href={`/projeler/${proje.slug}`}
                  className="inline-flex items-center gap-2 text-gray-100 font-black text-sm uppercase tracking-widest group/btn"
                >
                  <span className="relative">
                    Detayları İncele
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover/btn:w-full" />
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Eğer hiç proje yoksa gösterilecek mesaj */}
        {projeler.length === 0 && (
          <div className="text-center py-40 rounded-[3rem] border-2 border-dashed border-white/10">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">
              Henüz hiç proje eklenmemiş.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
