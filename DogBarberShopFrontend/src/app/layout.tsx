
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";



const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <head>
          <script
            src="https://kit.fontawesome.com/2d6908b6f2.js"
            crossOrigin="anonymous"
          ></script>

          <link rel="icon" href="assets/images/favicon-32x32.png" />

          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
            crossOrigin="anonymous"
          ></link>
        </head>
        <body className={`${poppins.className} txt-color-3 `}>{children}</body>
      </html>
    
  );
}
