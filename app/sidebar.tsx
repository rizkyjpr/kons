"use client";
import { BarChartIcon } from "@/assets/BarChartIcon";
import { ListIcon } from "@/assets/ListIcon";
import { PersonIcon } from "@/assets/PersonIcon";
import { PieChartIcon } from "@/assets/PieChartIcon";
import { PowerIcon } from "@/assets/PowerIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
    const path = usePathname();

    return (
        <div className="h-screen w-1/4 bg-white px-[30px] py-[60px]">
            <div className="h-full flex flex-col justify-between items-start">
                <div className="flex flex-col justify-center items-start">
                    <div className="flex justify-center items-center">
                        <div className="w-10 h-10 bg-gray-500"></div>
                        <p className="ml-2 font-bold">PT. Bintang Mebel Indo</p>
                    </div>
                    <div className="flex flex-col justify-start items-start mt-24 mb-2">
                        <p className="font-bold text-xs text-[#C8C8C8]">
                            MAIN MENU
                        </p>
                        <Link
                            href={"/kriteria"}
                            className={`flex justify-start items-center w-full gap-2 mt-4 px-3.5 py-3 ${
                                path === "/kriteria"
                                    ? "bg-[#56AAB1] text-white"
                                    : "text-[#CCCCCC]"
                            }`}
                        >
                            <PieChartIcon
                                color={
                                    path === "/kriteria" ? "white" : "#CCCCCC"
                                }
                            />
                            <p className="font-bold">Konfigurasi Kriteria</p>
                        </Link>
                        <Link
                            href={"/ahp"}
                            className={`flex justify-start items-center w-full gap-2 mt-4 px-3.5 py-3 ${
                                path === "/ahp"
                                    ? "bg-[#56AAB1] text-white"
                                    : "text-[#CCCCCC]"
                            }`}
                        >
                            <BarChartIcon
                                color={path === "/ahp" ? "white" : "#CCCCCC"}
                            />
                            <p className="font-bold">Konfigurasi AHP</p>
                        </Link>
                        <Link
                            href={"/alternatif"}
                            className={`flex justify-start items-center w-full gap-2 mt-4 px-3.5 py-3 ${
                                path === "/alternatif"
                                    ? "bg-[#56AAB1] text-white"
                                    : "text-[#CCCCCC]"
                            }`}
                        >
                            <PersonIcon
                                color={
                                    path === "/alternatif" ? "white" : "#CCCCCC"
                                }
                            />
                            <p className="font-bold">Konfigurasi Alternatif</p>
                        </Link>
                        <Link
                            href={"/hasil"}
                            className={`flex justify-start items-center w-full gap-2 mt-4 px-3.5 py-3 ${
                                path === "/hasil"
                                    ? "bg-[#56AAB1] text-white"
                                    : "text-[#CCCCCC]"
                            }`}
                        >
                            <ListIcon
                                color={path === "/hasil" ? "white" : "#CCCCCC"}
                            />
                            <p className="font-bold">Konfigurasi Hasil</p>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <PowerIcon />
                    <p className="font-bold text-[#CCCCCC]">Log Out</p>
                </div>
            </div>
        </div>
    );
};
