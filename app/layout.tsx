"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";
import { GlobalContextProvider } from "./Context/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();

    return (
        <html lang="en">
            <body className={inter.className}>
                <GlobalContextProvider>
                    <div className="w-screen h-screen flex">
                        {!["/login", "/register"].includes(path) && <Sidebar />}
                        {children}
                    </div>
                </GlobalContextProvider>
            </body>
        </html>
    );
}
