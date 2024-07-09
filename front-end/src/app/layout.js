import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import AOSProvider from "@/provider/AosProvider";

import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/navbar/Navbar";
import AuthProvider from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online Coffee Shop",
  description: "Online Coffee Shop Management....",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AOSProvider>
            <Navbar />
            {children}
            <Footer />
          </AOSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
