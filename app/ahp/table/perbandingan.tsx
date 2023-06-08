"use client";
import { useEffect, useState } from "react";

interface Props {
    kriteriaData: any;
    mappingData: any;
    handleCalculate(data: any): void;
}

export const Perbandingan = ({
    kriteriaData,
    mappingData,
    handleCalculate,
}: Props) => {
    const [nilai, setNilai] = useState(mappingData);

    useEffect(() => {
        setNilai(mappingData);
    }, []);

    const renderRowValue = (row: number, data: any) => {
        return (
            <>
                <p className="w-[60px] text-xs text-black text-center my-auto">
                    {data.name}
                </p>
                {kriteriaData.map((item: any, index: number) => {
                    const current = nilai.filter(
                        (val: any) =>
                            val.row === data.id && val.column === item.id
                    )[0];

                    const indexNilai = mappingData.findIndex(
                        (val: any) =>
                            val.row === data.id && val.column === item.id
                    );

                    const inversIndexNilai = mappingData.findIndex(
                        (val: any) =>
                            val.column === data.id && val.row === item.id
                    );

                    if (row == index) {
                        return (
                            <p
                                className="w-[60px] text-xs text-black text-center my-auto"
                                key={index}
                            >
                                {current.value}
                            </p>
                        );
                    } else if (row > index) {
                        return (
                            <p
                                className="w-[60px] text-xs text-black text-center my-auto"
                                key={index}
                            >
                                {current.value}
                            </p>
                        );
                    } else {
                        return (
                            <input
                                className="w-[60px] h-10 border border-[#DADADA] rounded-[3px] text-center"
                                type="number"
                                value={nilai[indexNilai].value}
                                onChange={(e) => {
                                    const newNilaiData = nilai;
                                    const fixValue: number =
                                        Number(e.target.value) > 9
                                            ? 9
                                            : Number(e.target.value) < 1
                                            ? 1
                                            : Number(e.target.value);
                                    newNilaiData[indexNilai] = {
                                        ...nilai[indexNilai],
                                        value: fixValue,
                                    };

                                    newNilaiData[inversIndexNilai] = {
                                        ...nilai[inversIndexNilai],
                                        value: 1 / fixValue,
                                    };

                                    setNilai([...newNilaiData]);
                                }}
                                max={9}
                                min={1}
                                key={index}
                            ></input>
                        );
                    }
                })}
            </>
        );
    };
    console.log(kriteriaData.length);

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
                className={`w-full mt-2 py-3 flex justify-around items-center border-y border-[#E4E4E4]`}
            >
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Nama Kriteria
                </p>
                {kriteriaData.map((item: any) => (
                    <p
                        className="w-[60px] font-bold text-xs text-[#AEAEAE] text-center"
                        key={item.id}
                    >
                        {item.name}
                    </p>
                ))}
            </div>
            {kriteriaData.map((data: any, row: number) => (
                <div
                    className={`w-full py-4 flex justify-around items-center border-b border-[#E4E4E4]`}
                    key={row}
                >
                    {renderRowValue(row, data)}
                </div>
            ))}
            <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
        </div>
    );
};
