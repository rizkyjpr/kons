"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "./Context/store";

export default function Home() {
    const { push } = useRouter();
    const { user } = useGlobalContext();

    useEffect(() => {
        if (!user.name) push("/login");
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-500">
            <h1>Hello</h1>
        </main>
    );
}
