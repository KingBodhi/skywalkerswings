import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'SkyFox Swings — Luxury Suspension Play',
  description:
    'SkyFox Swings crafts indulgent suspension swings, concierge installs, and body-positive accessories for adults seeking weightless pleasure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-neutral-50 text-neutral-900 font-body'>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
