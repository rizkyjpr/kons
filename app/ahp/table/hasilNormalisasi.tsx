interface Props {
    kriteriaData: any;
    hasilNormalisasi: any;
    lambda: number;
    ci: number;
    cr: number;
}

export const HasilNormalisasi = ({
    kriteriaData,
    hasilNormalisasi,
    lambda,
    ci,
    cr,
}: Props) => {
    const renderRowValue = (row: number, data: any) => {
        return (
            <>
                <p className="text-xs text-black text-center my-auto">
                    {data.name}
                </p>
                {kriteriaData.map((item: any, index: number) => {
                    const current = hasilNormalisasi.filter(
                        (val: any) =>
                            val.id_kriteria_1 === data.id &&
                            val.id_kriteria_2 === item.id
                    )[0];

                    return (
                        <p
                            className="text-xs text-black text-center my-auto"
                            key={index}
                        >
                            {current ? current.nilai_normalisasi : 0}
                        </p>
                    );
                })}
            </>
        );
    };

    return (
        <div className="w-full p-4 bg-white flex flex-col justify-center items-center rounded-[20px]">
            <div className="w-full flex justify-between items-center">
                <p className="font-bold text-black text-xl">
                    Hasil Normalisasi
                </p>
                <div className="flex justify-center items-center gap-3">
                    <p className="font-bold text-xs text-center">
                        LM : {lambda}
                    </p>
                    <p className="font-bold text-xs text-center">CI : {ci}</p>
                    <p className="font-bold text-xs text-center">CR : {cr}</p>
                </div>
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
