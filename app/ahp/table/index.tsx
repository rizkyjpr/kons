"use client";
import { useState } from "react";
import { HasilAHP } from "./hasilAHP";
import { HasilNormalisasi } from "./hasilNormalisasi";
import { Perbandingan } from "./perbandingan";
import { useGlobalContext } from "@/app/Context/store";
import Axios from "@/lib/postgres";

export const Table = () => {
    const { kriteria, setKriteria } = useGlobalContext();
    const mappingKriteria: any[] = [];

    const selectedKriteria = kriteria.filter((item: any) => item.check);

    selectedKriteria.map((kriteria1: any) => {
        selectedKriteria.map((kriteria2: any) => {
            mappingKriteria.push({
                row: kriteria1.id,
                column: kriteria2.id,
                value: kriteria1.id === kriteria2.id ? 1.0 : 1.0,
            });
        });
    });

    const [hasilNormalisasi, setHasilNormalisasi] = useState([]);
    const [ahp, setAhp] = useState([]);
    const [lambda, setLambda] = useState(0);
    const [ci, setCi] = useState(0);
    const [cr, setCr] = useState(0);

    const handleCalculate = async (data: any) => {
        const save = await Axios.post(`/kriteria/perbandingan`, {
            nilai: data,
        }).then((res) => res.data);

        if (save.status !== 201) return;

        const hasil = await Axios.get(`/kriteria/normalisasi`).then(
            (res) => res.data
        );

        const hasilAhp = await Axios.get(`/kriteria/ahp`).then(
            (res) => res.data
        );

        const hasilLambda = await Axios.get(`/kriteria/lambdamax`).then(
            (res) => res.data.lambda_max
        );

        const hasilCi = await Axios.get(`/kriteria/ci`).then((res) => res.data);

        const hasilCr = await Axios.get(`/kriteria/cr`).then((res) => res.data);

        setHasilNormalisasi(hasil);
        setAhp(hasilAhp);
        setLambda(hasilLambda);
        setCi(hasilCi);
        setCr(hasilCr);
    };

    return (
        <>
            <Perbandingan
                kriteriaData={selectedKriteria}
                mappingData={mappingKriteria}
                handleCalculate={handleCalculate}
            />
            <HasilNormalisasi
                kriteriaData={selectedKriteria}
                hasilNormalisasi={hasilNormalisasi}
                lambda={lambda}
                ci={ci}
                cr={cr}
            />
            <HasilAHP kriteriaData={selectedKriteria} ahp={ahp} />
        </>
    );
};
