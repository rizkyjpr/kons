interface Props {
    kriteriaData: any;
    hasilNormalisasi: any;
}

export const HasilAHP = ({ kriteriaData, hasilNormalisasi }: Props) => {
    const renderRowValue = (index: number) => {
        return (
            <p className="text-xs text-black text-center my-auto">
                {hasilNormalisasi.length === 0 ? 0 : hasilNormalisasi[index][0]}
            </p>
        );
    };

    return (
        <div className="w-full p-4 bg-white flex flex-col justify-center items-center rounded-[20px]">
            <div className="w-full flex justify-between items-center">
                <p className="font-bold text-black text-xl">Hasil Bobot AHP</p>
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
            <div
                className={`w-full py-4 grid grid-cols-${
                    kriteriaData.length + 1
                } border-b border-[#E4E4E4]`}
            >
                <p className="text-xs text-black text-center my-auto">bobot</p>
                {kriteriaData.map((data: any, index: number) =>
                    renderRowValue(index)
                )}
            </div>
            <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
        </div>
    );
};
