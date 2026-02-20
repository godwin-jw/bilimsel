"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Users, Briefcase, BookOpen, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  // Mobil menü açık mı kapalı mı kontrolü
  const [isOpen, setIsOpen] = useState(false);
  // Scroll yapınca navbarın şeffaflığını değiştirmek için state
  const [scrolled, setScrolled] = useState(false);

  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menü linkleri
  const navItems = [
    { href: "/", label: "Ana Sayfa", icon: Home },
    { href: "/hakkimizda", label: "Hakkımızda", icon: Users },
    { href: "/projeler", label: "Projeler", icon: Briefcase },
    { href: "/yayinlar", label: "Yayınlar", icon: BookOpen },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-gray-200/50 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* LOGO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="shrink-0 flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 tracking-tighter"
              >
                Bilim<span className="text-blue-600">ArGe</span>
              </Link>
            </motion.div>

            {/* MASAÜSTÜ MENÜ */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-all rounded-full hover:bg-blue-50"
                >
                  <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* MASAÜSTÜ AKSİYON BUTONU */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex"
            >
              <Link
                href="/iletisim"
                className="flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
              >
                <Mail className="w-4 h-4" />
                İletişime Geç
              </Link>
            </motion.div>

            {/* MOBİL MENÜ BUTONU (Hamburger) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBİL MENÜ (Açılır Panel) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 w-full bg-white border-b border-gray-200 z-40 md:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // Tıklayınca menüyü kapat
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  href="/iletisim"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  İletişime Geç
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;