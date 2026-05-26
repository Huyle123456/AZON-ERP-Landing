"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/login", "/register"];

export default function FloatingContact() {
  const pathname = usePathname() ?? "";
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      <Link href="tel:+84329300677" className="relative" aria-label="Gọi điện">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
        <motion.div
          animate={{ rotate: [0, -12, 12, -12, 12, -8, 8, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2.5 }}
          className="relative w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40"
        >
          <Phone className="w-6 h-6 text-white" />
        </motion.div>
      </Link>

      <Link
        href="https://zalo.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform"
        aria-label="Zalo"
      >
        <Image
          src="/logo/zalo.png"
          alt="Zalo"
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </Link>

      <Link
        href="https://m.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full  shadow-lg hover:scale-110 transition-transform"
        aria-label="Messenger"
      >
        <Image
          src="/logo/messenger.svg"
          alt="Messenger"
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </Link>
    </div>
  );
}
