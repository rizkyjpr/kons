"use client";
import { TrashIcon } from "@/assets/TrashIcon";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useGlobalContext } from "../Context/store";
import Axios from "@/lib/postgres";

export const Table = () => {
    const { user, kriteria, setKriteria } = useGlobalContext();

    const [kriteriaModal, setKriteriaModal] = useState(false);
    const [kriteriaName, setKriteriaName] = useState("");
    const [type, setType] = useState("Benefit");

    const handleSubmit = async () => {
        const form = {
            name: kriteriaName,
            type,
            added_by: user.id,
        };

        const res = await Axios.post(`/kriteria`, form);

        if (res.data.status !== 201) return;

        const kriteriaData = await Axios.get(`/kriteria`).then((res) => {
            return res.data.map((item: any) => {
                return {
                    ...item,
                    check: false,
                };
            });
        });

        setKriteria(kriteriaData);
    };

    const handleDelete = async (id: number) => {
        const res = await Axios.delete(`/kriteria/${id}`);

        if (res.data.status !== 202) return;

        const kriteriaData = await Axios.get(`/kriteria`).then((res) => {
            return res.data.map((item: any) => {
                return {
                    ...item,
                    check: false,
                };
            });
        });

        setKriteria(kriteriaData);
    };

    const handleCheckbox = (id: number) => {
        const newData = kriteria.map((item: any) => {
            if (id === item.id) {
                return {
                    ...item,
                    check: !item.check,
                };
            } else {
                return item;
            }
        });

        setKriteria(newData);
    };

    useEffect(() => {
        const fetchData = async () => {
            const kriteriaData = await Axios.get(`/kriteria`).then((res) => {
                return res.data.map((item: any) => {
                    return {
                        ...item,
                        check: false,
                    };
                });
            });

            setKriteria(kriteriaData);
        };

        fetchData();
    }, []);

    return (
        <div className="w-full p-4 bg-white flex flex-col justify-between items-center rounded-[20px]">
            <div className="w-full flex flex-col justify-center items-center">
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
                    <div className="absolute top-0 left-0 w-screen h-screen bg-[#2E2E2E] bg-opacity-60 flex justify-center items-center">
                        <div className="w-[354px] bg-white px-6 py-7 drop-shadow rounded-[20px]">
                            <p className="mt-1 font-bold text-black text-sm">
                                Nama Kriteria
                            </p>
                            <input
                                className="w-full h-10 px-2 border border-[#E1E1E1] mt-1"
                                type="text"
                                onChange={(e) =>
                                    setKriteriaName(e.target.value)
                                }
                                value={kriteriaName}
                            />
                            <select
                                onChange={(e) => setType(e.target.value)}
                                value={type}
                                className="w-full h-10 px-2 border border-[#E1E1E1] mt-1"
                            >
                                <option value="Benefit">Benefit</option>
                                <option value="Cost">Cost</option>
                            </select>
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
                        Added by
                    </p>
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Type
                    </p>
                    <p className="font-bold text-xs text-[#AEAEAE] text-center">
                        Action
                    </p>
                </div>
                {kriteria.map((item: any) => (
                    <div
                        className="w-full py-4 grid grid-cols-5 border-b border-[#E4E4E4]"
                        key={item.id}
                    >
                        <button
                            onClick={() => handleCheckbox(item.id)}
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
                            {item.username}
                        </p>
                        <p className="flex justify-center items-center text-black">
                            {item.type}
                        </p>
                        <button
                            onClick={() => handleDelete(item.id)}
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
