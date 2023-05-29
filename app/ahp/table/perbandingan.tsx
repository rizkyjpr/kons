"use client";

import { useState } from "react";

interface Props {
    kriteriaData: any;
    handleCalculate(data: any): void;
}

export const Perbandingan = ({ kriteriaData, handleCalculate }: Props) => {
    const initNilai: any[] = [];
    kriteriaData.map((item: any, row: number) => {
        const rowNilai: any[] = [];
        kriteriaData.map((item: any, index: number) => {
            if (row == index) {
                rowNilai[index] = 1;
            } else if (row > index) {
                rowNilai[index] = 0;
            } else {
                rowNilai[index] = 0;
            }
        });
        initNilai.push(rowNilai);
    });

    const [nilai, setNilai] = useState(initNilai);

    const renderRowValue = (row: number, data: any) => {
        return (
            <>
                <p className="text-xs text-black text-center my-auto">
                    {data.name}
                </p>
                {kriteriaData.map((item: any, index: number) => {
                    if (row == index) {
                        return (
                            <p
                                className="text-xs text-black text-center my-auto"
                                key={index}
                            >
                                {nilai[row][index]}
                            </p>
                        );
                    } else if (row > index) {
                        return (
                            <p
                                className="text-xs text-black text-center my-auto"
                                key={index}
                            >
                                {nilai[row][index]}
                            </p>
                        );
                    } else {
                        return (
                            <input
                                className="w-[60px] h-10 mx-auto border border-[#DADADA] rounded-[3px] text-center"
                                type="number"
                                value={nilai[row][index]}
                                onChange={(e) => {
                                    const newNilaiData = nilai;
                                    newNilaiData[row][index] = Number(
                                        e.target.value
                                    );
                                    setNilai([...newNilaiData]);
                                }}
                                key={index}
                            ></input>
                        );
                    }
                })}
            </>
        );
    };

    return (
        <div className="w-full p-4 bg-white flex flex-col justify-center items-center rounded-[20px]">
            <div className="w-full flex justify-between items-center">
                <p className="font-bold text-black text-xl">
                    Bobot Perbandingan
                </p>
                <button
                    onClick={() => handleCalculate(nilai)}
                    className="py-2.5 px-3 flex justify-center items-center bg-[#56AAB1] rounded-lg"
                >
                    <p className="text-white">Hitung normalisasi</p>
                </button>
            </div>
            <div
                className={`w-full mt-2 py-3 grid grid-cols-${
                    kriteriaData.length + 1
                } border-y border-[#E4E4E4]`}
            >
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Nama Kriteria
                </p>
                {kriteriaData.map((item: any, index: number) => (
                    <p
                        className="font-bold text-xs text-[#AEAEAE] text-center"
                        key={index}
                    >
                        {item.name}
                    </p>
                ))}
            </div>
            {kriteriaData.map((data: any, row: number) => (
                <div
                    className={`w-full py-4 grid grid-cols-${
                        kriteriaData.length + 1
                    } border-b border-[#E4E4E4]`}
                    key={row}
                >
                    {renderRowValue(row, data)}
                </div>
            ))}
            <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
        </div>
    );
};
