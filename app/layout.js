import './globals.css';

export const metadata = {
  title: 'Coy · Discover',
  description: 'A private way to discover people who have already said yes.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#16141f',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
