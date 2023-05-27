import Image from "next/image";
import { Header } from "./header";
import { Table } from "./table";

export default function AHP() {
    return (
        <div className="w-full h-screen flex flex-col gap-5 bg-[#D9D9D9] pl-10 pr-14 py-10 overflow-y-scroll">
            <Header />
            <Table />
        </div>
    );
}
