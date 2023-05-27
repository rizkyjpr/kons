"use client";
import { useState } from "react";
import AddModal from "./modal/addModal";
import EditModal from "./modal/editModal";
import { PencilIcon } from "@/assets/PencilIcon";
import { TrashIcon } from "@/assets/TrashIcon";

export const Table = () => {
    const currentDate = new Date();

    const [data, setData] = useState<any[]>(
        JSON.parse(localStorage.getItem("supplier") || "[]")
    );

    const [addSupplierModal, setAddSupplierModal] = useState(false);
    const [editSupplierModal, setEditSupplierModal] = useState(false);
    const [name, setName] = useState("");

    const kriteria = JSON.parse(
        localStorage.getItem("kriteria") || "[]"
    ).filter((item: any) => item.check);

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

        localStorage.setItem("supplier", JSON.stringify([...data, newData]));

        setName("");
        setData([...data, newData]);
    };

    const handleDelete = (index: number) => {
        const newData = data;
        newData.splice(index, 1);

        setData([...newData]);
        localStorage.setItem("supplier", JSON.stringify(newData));
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
        localStorage.setItem("supplier", JSON.stringify(newData));
    };

    return (
        <>
            {addSupplierModal && <AddModal setModal={setAddSupplierModal} />}
            {editSupplierModal && <EditModal setModal={setEditSupplierModal} />}
            <div className="w-full h-full p-4 bg-white flex flex-col justify-between items-center rounded-[20px]">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold text-black text-xl">
                            List Supplier
                        </p>
                        <button
                            onClick={() => setAddSupplierModal(true)}
                            className="py-2.5 px-3 flex justify-center items-center bg-[#56AAB1] rounded-lg"
                        >
                            <p className="text-white">+ Tambah Supplier</p>
                        </button>
                    </div>
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
                            Rating
                        </p>
                        <p className="font-bold text-xs text-[#AEAEAE] text-center">
                            Action
                        </p>
                    </div>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            className="w-full py-4 grid grid-cols-5 border-b border-[#E4E4E4]"
                            key={item}
                        >
                            <div className="w-5 h-5 mx-auto border border-[#DADADA] rounded-[3px]"></div>
                            <p className="text-black text-center">
                                Fleksibilitas
                            </p>
                            <p className="text-black text-center">
                                May 23, 2023
                            </p>
                            <p className="text-black text-center">
                                Rizky Pratama
                            </p>
                            <div className="mx-auto flex justify-center items-center gap-2.5">
                                <button
                                    onClick={() => setEditSupplierModal(true)}
                                    className="w-10 h-10 flex justify-center items-center bg-[#F9AA61] rounded-lg"
                                >
                                    <PencilIcon />
                                </button>
                                <button className="w-10 h-10 flex justify-center items-center bg-[#F96A61] rounded-lg">
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
            </div>
        </>
    );
};
