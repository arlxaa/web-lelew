import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";
import Teardrops from "@/components/Teardrops";
import Loader from "@/components/Loader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — Computer Science Student`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — Portfolio`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Apply saved theme before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}var a=localStorage.getItem('accent');if(a){document.documentElement.setAttribute('data-accent',a);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Loader />
        <div className="app-bg" aria-hidden />
        <div className="app-mesh" aria-hidden />
        <div className="app-grid" aria-hidden />
        <Teardrops />
        {children}
      </body>
    </html>
  );
}
