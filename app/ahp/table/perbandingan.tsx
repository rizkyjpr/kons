export const Perbandingan = () => {
    const renderRowValue = (row: number, column: number) => {
        if (row <= column) {
            if (row == 1) {
                return (
                    <p className="text-xs text-black text-center my-auto">
                        Fleksibilitas
                    </p>
                );
            } else {
                return (
                    <p className="text-xs text-black text-center my-auto">1</p>
                );
            }
        } else {
            return (
                <div className="w-[60px] h-10 mx-auto border border-[#DADADA] rounded-[3px]"></div>
            );
        }
    };

    return (
        <div className="w-full p-4 bg-white flex flex-col justify-center items-center rounded-[20px]">
            <div className="w-full flex justify-between items-center">
                <p className="font-bold text-black text-xl">
                    Bobot Perbandingan
                </p>
                <div className="py-2.5 px-3 flex justify-center items-center bg-[#56AAB1] rounded-lg">
                    <p className="text-white">Hitung normalisasi</p>
                </div>
            </div>
            <div className="w-full mt-2 py-3 grid grid-cols-9 border-y border-[#E4E4E4]">
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Nama Kriteria
                </p>
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Fleksibilitas
                </p>
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Modal
                </p>
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Fleksibilitas
                </p>
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Fleksibilitas
                </p>
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Fleksibilitas
                </p>
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Fleksibilitas
                </p>
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Fleksibilitas
                </p>
                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                    Fleksibilitas
                </p>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((column) => (
                <div
                    className="w-full py-4 grid grid-cols-9 border-b border-[#E4E4E4]"
                    key={column}
                >
                    <>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
                            <>{renderRowValue(row, column)}</>
                        ))}
                    </>
                </div>
            ))}
            <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
        </div>
    );
};
