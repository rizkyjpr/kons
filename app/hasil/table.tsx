export const Table = () => {
    return (
        <div className="w-full h-full p-4 bg-white flex flex-col justify-between items-center rounded-[20px]">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-center">
                    <p className="font-bold text-black text-xl">
                        List Hasil Perhitungan
                    </p>
                </div>
                <div className="w-full mt-2 py-3 grid grid-cols-5 border-y border-[#E4E4E4]">
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Ranking
                    </p>
                    <p className="col-span-3 font-bold text-xs text-[#AEAEAE] text-center">
                        Nama
                    </p>
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Bobot Rating
                    </p>
                </div>
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        className="w-full py-4 grid grid-cols-5 border-b border-[#E4E4E4]"
                        key={item}
                    >
                        <p className="text-black text-center">1</p>
                        <p className="col-span-3 text-black text-center">
                            Rizky
                        </p>
                        <p className="text-black text-center">4.5</p>
                    </div>
                ))}
            </div>
            <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
        </div>
    );
};
