import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
//import Navbar from "@/components/navbar/nav";
import Footer from "@/components/footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RoleNavbar from "@/components/navbar/roleNavbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RentaFacil",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <header>
                {/* <Navbar /> */}
                <RoleNavbar />
              </header>

              <main>{children}</main>

              <Footer />
            </div>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
