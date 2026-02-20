import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";

// ISR: Sayfa her 60 saniyede bir arka planda yeniden oluşturulur.
export const revalidate = 60;

// Ekip Verilerini Çeken Fonksiyon
async function getTeam() {
  const query = `*[_type == "team"] | order(orderRank) {
    name,
    role,
    image,
    bio
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function HakkimizdaPage() {
  const ekip = await getTeam();

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100">
      {/* Üst Kısım: Misyon & Vizyon */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Biz Kimiz?
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 font-medium">
            Teknolojiyi ve bilimi birleştirerek topluma faydalı projeler üreten
            tutkulu bir ekibiz. Akademik bilgiyi pratik çözümlere dönüştürüyor,
            geleceğin teknolojilerine yön veriyoruz.
          </p>
        </div>
      </section>

      {/* Alt Kısım: Dinamik Ekip Tanıtımı */}
      <section className="py-32 bg-[#0f1424]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
              Ekibimizle Tanışın
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              Projelerimizin arkasındaki vizyoner beyin takımı.
            </p>
          </div>

          {/* Eğer ekip eklenmemişse */}
          {ekip.length === 0 && (
            <div className="text-center py-32 rounded-[3rem] border-2 border-dashed border-white/10 text-gray-500 font-black uppercase tracking-widest">
              Henüz ekip üyesi eklenmemiş.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ekip.map((kisi: any, index: number) => (
              <div
                key={index}
                className="group relative bg-white/5 rounded-[3rem] p-10 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 border border-white/10"
              >
                {/* Profil Resmi */}
                <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-black/30 group-hover:scale-105 transition-transform duration-500 relative">
                  {kisi.image ? (
                    <Image
                      src={urlFor(kisi.image).url()}
                      alt={kisi.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center text-5xl font-black text-gray-400">
                      {kisi.name?.charAt(0)}
                    </div>
                  )}
                </div>

                <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">
                  {kisi.name}
                </h3>

                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
                  {kisi.role}
                </div>

                {kisi.bio && (
                  <p className="text-gray-400 text-lg leading-relaxed line-clamp-3 font-medium">
                    {kisi.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
