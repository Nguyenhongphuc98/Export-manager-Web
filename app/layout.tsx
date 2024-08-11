"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import Popup from "./ui/popup";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClassName = `${inter.className} `;

  return (
    <html lang="en">
      <body className={bodyClassName}>
        <RecoilRoot>
          <Suspense>
            {children}
            <Popup />
          </Suspense>
        </RecoilRoot>
      </body>
    </html>
  );
}

/**
 * docker build -t my-nextjs-app .
 * docker run -p 3000:3000 my-nextjs-app
 */