"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const { push } = useRouter();

    const user = JSON.parse(localStorage.getItem("active-user") || "{}");

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            push("/login");
        } else {
            push("/kriteria");
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-500">
            <h1>Hello</h1>
        </main>
    );
}
