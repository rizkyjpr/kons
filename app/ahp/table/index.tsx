import { HasilAHP } from "./hasilAHP";
import { HasilNormalisasi } from "./hasilNormalisasi";
import { Perbandingan } from "./perbandingan";

export const Table = () => {
    return (
        <>
            <Perbandingan />
            <HasilNormalisasi />
            <HasilAHP />
        </>
    );
};
