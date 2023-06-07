"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/store";
import Axios from "@/lib/postgres";

export const Table = () => {
    const { supplier } = useGlobalContext();

    const [rank, setRank] = useState([]);
    const selectedSupplier = supplier.filter((item: any) => item.check);

    const hitungRank = async () => {
        const bodySupplier = selectedSupplier
            .map((item: any) => `'` + item.id + `'`)
            .join(",");
        const rating = await Axios.post(`/supplier/rating`, {
            id_supplier: bodySupplier,
        }).then((res) => res.data);

        const rank = await Axios.post(`/supplier/rank`, {
            id_supplier: bodySupplier,
        }).then((res) => res.data);

        setRank(rank);
    };

    return (
        <div className="w-full h-full p-4 bg-white flex flex-col justify-between items-center rounded-[20px]">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-center">
                    <p className="font-bold text-black text-xl">
                        List Hasil Perhitungan
                    </p>
                    <button
                        onClick={() => hitungRank()}
                        className="py-2.5 px-3 flex justify-center items-center bg-[#56AAB1] rounded-lg"
                    >
                        <p className="text-white">Hasil Perhitungan</p>
                    </button>
                </div>
                <div className="w-full mt-2 py-3 grid grid-cols-5 border-y border-[#E4E4E4]">
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Ranking
                    </p>
                    <p className="col-span-3 font-bold text-xs text-[#AEAEAE] text-center">
                        Nama
                    </p>
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Bobot Rating
                    </p>
                </div>
                {rank.map((item: any, index: number) => (
                    <div
                        className="w-full py-4 grid grid-cols-5 border-b border-[#E4E4E4]"
                        key={index}
                    >
                        <p className="text-black text-center">{index + 1}</p>
                        <p className="col-span-3 text-black text-center">
                            {item.name}
                        </p>
                        <p className="text-black text-center">{item.rating}</p>
                    </div>
                ))}
            </div>
            <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
        </div>
    );
};
