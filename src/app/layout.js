import "./globals.css";

export const metadata = {
  title: "Portal Académico",
  description: "Organizador de ramos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}