
"use client"; 
import { useState } from "react";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ submitting: false, sent: false, error: false });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // ⚠️ BURAYA DİKKAT: Web3Forms'dan aldığın anahtarı buraya yapıştırmayı unutma!
          access_key: "YOUR_ACCESS_KEY_HERE", 
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ submitting: false, sent: true, error: false });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ submitting: false, sent: false, error: true });
      }
    } catch (error) {
      setStatus({ submitting: false, sent: false, error: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-100 py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/30">
            İletişim
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Bizimle <span className="text-blue-600">İletişime</span> Geçin
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Projelerimiz hakkında bilgi almak veya akademik işbirliği yapmak
            için bize yazın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* SOL TARA: İletişim Bilgileri Kartı */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                İletişim Bilgileri
              </h2>

              <div className="space-y-10 relative z-10">
                {/* E-Posta */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-100 text-sm uppercase tracking-widest mb-1">
                      E-Posta
                    </h3>
                    <p className="text-lg font-medium break-all">
                      iletisim@bilimarge.com
                    </p>
                  </div>
                </div>

                {/* Konum */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-100 text-sm uppercase tracking-widest mb-1">
                      Konum
                    </h3>
                    <p className="text-lg font-medium">
                      Recep Tayyip Erdoğan Üniversitesi
                      <br />
                      Rize, Türkiye
                    </p>
                  </div>
                </div>

                {/* Sosyal Medya */}
                <div className="pt-8 border-t border-white/10">
                  <h3 className="font-bold text-blue-100 text-sm uppercase tracking-widest mb-6">
                    Sosyal Medya
                  </h3>
                  <div className="flex gap-4">
                    {[
                      {
                        href: "https://x.com/nevciimen",
                        label: "Twitter",
                        path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                      },
                      {
                        href: "https://linkedin.com/in/SENIN_PROFILIN",
                        label: "LinkedIn",
                        path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                      },
                      {
                        href: "https://github.com/SENIN_KULLANICI_ADIN",
                        label: "GitHub",
                        path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
                      },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-300 border border-white/10"
                        aria-label={social.label}
                      >
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d={social.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ TARAF: Mesaj Formu */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 rounded-[2.5rem] p-10 md:p-12 border border-white/10 shadow-2xl shadow-black/30 backdrop-blur">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Bildirimler */}
                {status.sent && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-6 py-4 rounded-2xl flex items-center font-bold animate-in fade-in zoom-in duration-500">
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Mesajınız başarıyla gönderildi! En kısa sürede döneceğiz.
                  </div>
                )}
                {status.error && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-700 px-6 py-4 rounded-2xl font-bold animate-in fade-in zoom-in duration-500">
                    Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-black uppercase tracking-widest text-gray-200 ml-1"
                    >
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-white/10 border-2 border-transparent focus:bg-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-100"
                      placeholder="İsim Soyisim"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-black uppercase tracking-widest text-gray-200 ml-1"
                    >
                      E-Posta Adresiniz
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-white/10 border-2 border-transparent focus:bg-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-100"
                      placeholder="ornek@mail.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-black uppercase tracking-widest text-gray-200 ml-1"
                  >
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border-2 border-transparent focus:bg-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-100"
                    placeholder="Konu Başlığı..."
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-black uppercase tracking-widest text-gray-200 ml-1"
                  >
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border-2 border-transparent focus:bg-white/20 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-100 resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className={`group relative bg-gray-900 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-gray-900/20 flex items-center gap-3 overflow-hidden ${
                      status.submitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-blue-600 active:scale-95"
                    }`}
                  >
                    <span className="relative z-10">
                      {status.submitting ? "Gönderiliyor..." : "Mesajı Gönder"}
                    </span>
                    {!status.submitting && (
                      <svg
                        className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}