import Header from "@/components/Header";
import AOSInit from "@/components/AOSInit";
import Script from "next/script";

export const metadata = {
  title: "Sabim — Календарь беременности и планирования",
  description: "Sabim — это удобный и бесплатный сервис для расчёта срока беременности, планирования зачатия и отслеживания женского здоровья.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
          crossOrigin="anonymous" 
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-body-tertiary">
        <AOSInit />
        <Header/>
        {children}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

