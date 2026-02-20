import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Bölüm 1: Hakkında */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                Bilim<span className="text-blue-600">ArGe</span>
              </span>
            </div>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-8">
              Bilimsel araştırmaları desteklemek, yenilikçi projeler geliştirmek
              ve akademik dünyayı bir araya getirmek için çalışan bağımsız bir
              topluluk.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  href: "https://x.com/nevciimen",
                  icon: Twitter,
                  label: "Twitter",
                },
                {
                  href: "https://linkedin.com/in/SENIN_PROFILIN",
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                {
                  href: "https://github.com/SENIN_KULLANICI_ADIN",
                  icon: Github,
                  label: "GitHub",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Bölüm 2: Hızlı Linkler */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">
              Keşfet
            </h4>
            <ul className="space-y-4">
              {[
                { href: "/projeler", label: "Projeler" },
                { href: "/yayinlar", label: "Yayınlar" },
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/iletisim", label: "İletişim" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-blue-600 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bölüm 3: İletişim */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">
              İletişim
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium">info@bilimarge.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Rize, Türkiye</span>
              </li>
            </ul>
            <div className="mt-8 p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <p className="text-blue-900 font-bold mb-2">Bir fikriniz mi var?</p>
              <Link
                href="/iletisim"
                className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1"
              >
                Bize Ulaşın <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            &copy; 2026 Bilimsel Araştırma Grubu. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <Link href="#" className="hover:text-gray-600">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="hover:text-gray-600">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
