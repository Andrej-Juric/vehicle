import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import Header from "@/components/templates/header";
import Footer from "@/components/templates/footer";

// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <Header />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
