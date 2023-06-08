interface Props {
    kriteriaData: any;
    ahp: any;
}

export const HasilAHP = ({ kriteriaData, ahp }: Props) => {
    const renderRowValue = (data: any) => {
        const current = ahp.filter(
            (item: any) => item.id_kriteria === data.id
        )[0];
        return (
            <p
                className="w-[60px] text-xs text-black text-center my-auto"
                key={data.id}
            >
                {current ? current.nilai : 0}
            </p>
        );
    };

    return (
        <div className="w-full p-4 bg-white flex flex-col justify-center items-center rounded-[20px]">
            <div className="w-full flex justify-between items-center">
                <p className="font-bold text-black text-xl">Hasil Bobot AHP</p>
            </div>
            <div
                className={`w-full mt-2 py-3 flex justify-around items-center border-y border-[#E4E4E4]`}
            >
                <p className="w-[60px] font-bold text-xs text-[#AEAEAE] text-center">
                    Nama Kriteria
                </p>
                {kriteriaData.map((item: any, index: number) => (
                    <p
                        className="w-[60px] font-bold text-xs text-[#AEAEAE] text-center"
                        key={index}
                    >
                        {item.name}
                    </p>
                ))}
            </div>
            <div
                className={`w-full py-4 flex justify-around items-center border-b border-[#E4E4E4]`}
            >
                <p className="w-[60px] text-xs text-black text-center my-auto">
                    bobot
                </p>
                {kriteriaData.map((data: any, index: number) =>
                    renderRowValue(data)
                )}
            </div>
            <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
        </div>
    );
};
