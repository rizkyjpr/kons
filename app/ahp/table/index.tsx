"use client";
import { useState } from "react";
import { HasilAHP } from "./hasilAHP";
import { HasilNormalisasi } from "./hasilNormalisasi";
import { Perbandingan } from "./perbandingan";

export const Table = () => {
    const [kriteriaData, setKriteriaData] = useState<any[]>(
        JSON.parse(localStorage.getItem("kriteria") || "[]")
    );
    const [hasilNormalisasi, setHasilNormalisasi] = useState([]);

    const selectedKriteria = kriteriaData.filter((item) => item.check);

    const handleCalculate = (data: any) => {
        setHasilNormalisasi(data);
    };

    return (
        <>
            <Perbandingan
                kriteriaData={selectedKriteria}
                handleCalculate={handleCalculate}
            />
            <HasilNormalisasi
                kriteriaData={selectedKriteria}
                hasilNormalisasi={hasilNormalisasi}
            />
            <HasilAHP
                kriteriaData={selectedKriteria}
                hasilNormalisasi={hasilNormalisasi}
            />
        </>
    );
};
