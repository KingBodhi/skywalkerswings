import "./../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = { 
  title: "Skywalker Unlimited — Certified Fall-Protection Systems", 
  description: "Patent-pending Kinetic Fall-Arrest Systems that prevent suspension trauma. ANSI/OSHA certified harnesses for construction, military, and recreational use." 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}