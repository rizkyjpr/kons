import "./globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "./sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="w-screen h-screen flex">
                    <Sidebar />
                    {children}
                </div>
            </body>
        </html>
    );
}
