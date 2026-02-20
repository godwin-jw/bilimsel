import { client } from "@/sanity/client";
import Link from "next/link";
import { ArrowRight, Beaker, BookOpen, Users } from "lucide-react";

// İstatistikleri veritabanından çeken fonksiyon
async function getHomeData() {
  const query = `{
    "projeSayisi": count(*[_type == "post"]),
    "yayinSayisi": count(*[_type == "publication"]),
    "ekipSayisi": count(*[_type == "team"])
  }`;

  // Veriyi anlık çekmek için önbelleği kapatıyoruz (revalidate: 0)
  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
  return data;
}

export default async function Home() {
  // Verileri bekle ve al
  const data = await getHomeData();

  return (
    <main className="flex flex-col min-h-screen overflow-hidden bg-[#0b0f1a] text-gray-100">
      {/* HERO BÖLÜMÜ */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-56 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-indigo-400/10 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Beaker className="w-4 h-4" />
            Bilimsel Araştırma Topluluğu
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 leading-[0.9]">
            Geleceği <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
              Bilimle
            </span>{" "}
            Şekillendiriyoruz
          </h1>

          <p className="text-xl md:text-3xl text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 font-medium">
            Disiplinlerarası çalışmalar, akademik makaleler ve yenilikçi
            projelerle bilim dünyasına değer katıyoruz.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Link
              href="/projeler"
              className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-white/10 text-white rounded-[2rem] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 overflow-hidden border border-white/10"
            >
              Projelerimizi İncele
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/hakkimizda"
              className="px-10 py-5 bg-transparent text-gray-200 border-2 border-white/10 rounded-[2rem] font-black text-xl hover:border-white/30 transition-all active:scale-95"
            >
              Ekibimizle Tanış
            </Link>
          </div>
        </div>
      </section>

      {/* İSTATİSTİK BÖLÜMÜ (Dinamik) */}
      <section className="py-32 relative bg-[#0f1424]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Proje Sayısı */}
            <div className="group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Beaker className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-6xl font-black text-white mb-3 tracking-tighter">
                {data.projeSayisi}+
              </div>
              <div className="text-gray-500 font-black uppercase tracking-widest text-xs">
                Tamamlanan Proje
              </div>
            </div>

            {/* Yayın Sayısı */}
            <div className="group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-6xl font-black text-white mb-3 tracking-tighter">
                {data.yayinSayisi}+
              </div>
              <div className="text-gray-500 font-black uppercase tracking-widest text-xs">
                Yayınlanan Makale
              </div>
            </div>

            {/* Ekip Sayısı */}
            <div className="group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-6xl font-black text-white mb-3 tracking-tighter">
                {data.ekipSayisi}
              </div>
              <div className="text-gray-500 font-black uppercase tracking-widest text-xs">
                Aktif Araştırmacı
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
