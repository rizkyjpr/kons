"use client";
import { useState } from "react";

interface Props {
    kriteriaData: any;
    setModal(state: boolean): void;
    handleSubmit(data: any): void;
}

export default function AddModal({
    kriteriaData,
    setModal,
    handleSubmit,
}: Props) {
    const initialValue = kriteriaData.map((item: any) => {
        return {
            id_kriteria: item.id,
            nilai: 0,
        };
    });
    const [nama, setNama] = useState("");
    const [rating, setRating] = useState<any[]>(initialValue);

    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[#2E2E2E] bg-opacity-60 flex justify-center items-center">
            <div className="w-[820px] h-[630px] p-10 bg-white rounded-[18px] flex flex-col justify-between items-center">
                <div className="w-full">
                    <p className="font-bold text-[28px] text-black">
                        Tambah Supplier
                    </p>
                    <div className="w-full mt-8">
                        <p className="font-bold text-black">Nama Supplier</p>
                        <input
                            className="mt-2 w-full h-10 border border-[#E1E1E1] px-2"
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </div>

                    <div className="mt-10">
                        <p className="font-bold text-black">Rating Supplier</p>
                        <div className="grid grid-cols-4 mt-8 gap-y-4">
                            {kriteriaData.map((item: any) => (
                                <div
                                    className="flex flex-col justify-start items-start"
                                    key={item.id}
                                >
                                    <p className="font-bold text-black">
                                        {item.name}
                                    </p>
                                    <input
                                        className="mt-2 w-32 h-10 border border-[#E1E1E1] px-2"
                                        type="number"
                                        value={
                                            rating[
                                                rating.findIndex(
                                                    (rtng) =>
                                                        rtng.id_kriteria ===
                                                        item.id
                                                )
                                            ].nilai
                                        }
                                        onChange={(e) => {
                                            const newRatingData = rating;
                                            newRatingData[
                                                rating.findIndex(
                                                    (rtng) =>
                                                        rtng.id_kriteria ===
                                                        item.id
                                                )
                                            ].nilai = Number(e.target.value);

                                            setRating([...newRatingData]);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <button
                        onClick={() => {
                            handleSubmit({
                                nama,
                                rating,
                            });
                            setNama("");
                        }}
                        className="w-full flex justify-center items-center py-3.5 bg-[#56AAB1] text-white rounded-[4px]"
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => setModal(false)}
                        className="w-full flex justify-center items-center py-3.5 bg-white text-[#F96A61] border border-[#F96A61] rounded-[4px]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
