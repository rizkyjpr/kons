"use client";
import { Header } from "./header";
import { Table } from "./table";
import { useEffect } from "react";
import { useGlobalContext } from "../Context/store";
import { useRouter } from "next/navigation";

export default function Alternatif() {
    const { push } = useRouter();
    const { user } = useGlobalContext();

    useEffect(() => {
        if (!user.name) push("/login");
    }, []);
    return (
        <div className="w-full h-screen flex flex-col gap-5 bg-[#D9D9D9] pl-10 pr-14 py-10 overflow-y-scroll">
            <Header />
            <Table />
        </div>
    );
}
