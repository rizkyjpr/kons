"use client";
import { TrashIcon } from "@/assets/TrashIcon";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

export const Table = () => {
    const currentDate = new Date();

    const [data, setData] = useState<any[]>(
        JSON.parse(localStorage.getItem("kriteria") || "[]")
    );
    const [kriteriaModal, setKriteriaModal] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = () => {
        let date = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const newData = {
            name,
            date: `${month} ${date}, ${year}`,
            addedBy: "Rizky Pratama",
            check: false,
        };

        localStorage.setItem("kriteria", JSON.stringify([...data, newData]));

        setName("");
        setData([...data, newData]);
    };

    const handleDelete = (index: number) => {
        const newData = data;
        newData.splice(index, 1);

        setData([...newData]);
        localStorage.setItem("kriteria", JSON.stringify(newData));
    };

    const handleCheckbox = (index: number) => {
        const newData = data.map((item, i) => {
            if (index === i) {
                return {
                    ...item,
                    check: !item.check,
                };
            } else {
                return item;
            }
        });

        setData([...newData]);
        localStorage.setItem("kriteria", JSON.stringify(newData));
    };

    return (
        <div className="w-full h-full p-4 bg-white flex flex-col justify-between items-center rounded-[20px]">
            <div className="relative w-full flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-center">
                    <p className="font-bold text-black text-xl">
                        List Kriteria
                    </p>
                    <button
                        onClick={() => setKriteriaModal(true)}
                        className="py-2.5 px-3 flex justify-center items-center bg-[#56AAB1] rounded-lg"
                    >
                        <p className="text-white">+ Tambah Kriteria</p>
                    </button>
                </div>
                {kriteriaModal && (
                    <div className="absolute right-16 top-9 w-[354px] bg-white px-6 py-7 drop-shadow rounded-[20px]">
                        <p className="mt-1 font-bold text-black text-sm">
                            Nama Kriteria
                        </p>
                        <input
                            className="w-full h-10 px-2 border border-[#E1E1E1] mt-1"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <div className="w-full flex justify-center items-center gap-2 mt-2.5">
                            <button
                                onClick={() => setKriteriaModal(false)}
                                className="w-1/2 py-3.5 bg-white border border-[#F96A61] rounded-md"
                            >
                                <p className="font-bold text-xs text-[#F96A61]">
                                    Cancel
                                </p>
                            </button>
                            <button
                                onClick={() => {
                                    handleSubmit();
                                    setKriteriaModal(false);
                                }}
                                className="w-1/2 py-3.5 bg-[#56AAB1] rounded-md"
                            >
                                <p className="font-bold text-xs text-white">
                                    Submit
                                </p>
                            </button>
                        </div>
                    </div>
                )}
                <div className="w-full mt-2 py-3 grid grid-cols-5 border-y border-[#E4E4E4]">
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Include in calculation
                    </p>
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Nama
                    </p>
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Date Added
                    </p>
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Added by
                    </p>
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Action
                    </p>
                </div>
                {data.map((item: any, index: number) => (
                    <div
                        className="w-full py-4 grid grid-cols-5 border-b border-[#E4E4E4]"
                        key={index}
                    >
                        <button
                            onClick={() => handleCheckbox(index)}
                            className={`flex justify-center items-center w-5 h-5 my-auto mx-auto ${
                                item.check
                                    ? "bg-green-500 text-white"
                                    : "border border-[#DADADA]"
                            } rounded-[3px]`}
                        >
                            {item.check && <FiCheck />}
                        </button>
                        <p className="flex justify-center items-center text-black">
                            {item.name}
                        </p>
                        <p className="flex justify-center items-center text-black">
                            {item.date}
                        </p>
                        <p className="flex justify-center items-center text-black">
                            {item.addedBy}
                        </p>
                        <button
                            onClick={() => handleDelete(index)}
                            className="w-10 h-10 mx-auto flex justify-center items-center bg-[#F96A61] rounded-lg"
                        >
                            <TrashIcon />
                        </button>
                    </div>
                ))}
            </div>
            <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
        </div>
    );
};
