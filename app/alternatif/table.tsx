"use client";
import { useState } from "react";
import AddModal from "./modal/addModal";
import EditModal from "./modal/editModal";
import { PencilIcon } from "@/assets/PencilIcon";
import { TrashIcon } from "@/assets/TrashIcon";
import { FiCheck } from "react-icons/fi";

export const Table = () => {
    const currentDate = new Date();

    const [data, setData] = useState<any[]>(
        JSON.parse(localStorage.getItem("supplier") || "[]")
    );

    const [currentSupplier, setCurrentSupplier] = useState(-1);
    const [addSupplierModal, setAddSupplierModal] = useState(false);
    const [editSupplierModal, setEditSupplierModal] = useState(false);

    const kriteria = JSON.parse(
        localStorage.getItem("kriteria") || "[]"
    ).filter((item: any) => item.check);

    const handleSubmit = (formData: any) => {
        let date = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const newData = {
            name: formData.nama,
            date: `${month} ${date}, ${year}`,
            addedBy: "Rizky Pratama",
            check: false,
            rating: formData.rating,
        };

        localStorage.setItem("supplier", JSON.stringify([...data, newData]));

        setData([...data, newData]);
    };

    const handleEdit = (formData: any) => {
        let date = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        console.log(formData.rating);
        const form = {
            name: formData.nama,
            date: `${month} ${date}, ${year}`,
            addedBy: "Rizky Pratama",
            check: false,
            rating: formData.rating,
        };

        const newData = data;
        newData[currentSupplier] = form;

        localStorage.setItem("supplier", JSON.stringify([...newData]));

        setData([...newData]);
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
            {addSupplierModal && (
                <AddModal
                    kriteriaData={kriteria}
                    setModal={setAddSupplierModal}
                    handleSubmit={handleSubmit}
                />
            )}
            {editSupplierModal && (
                <EditModal
                    kriteriaData={kriteria}
                    setModal={setEditSupplierModal}
                    supplierData={data[currentSupplier]}
                    handleSubmit={handleEdit}
                />
            )}
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
                    {data.map((item, index) => (
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
                            <p className="text-black text-center">
                                {item.name}
                            </p>
                            <p className="text-black text-center">
                                {item.date}
                            </p>
                            <p className="text-black text-center">
                                {item.rating.join(",")}
                            </p>
                            <div className="mx-auto flex justify-center items-center gap-2.5">
                                <button
                                    onClick={() => {
                                        setCurrentSupplier(index);
                                        setEditSupplierModal(true);
                                    }}
                                    className="w-10 h-10 flex justify-center items-center bg-[#F9AA61] rounded-lg"
                                >
                                    <PencilIcon />
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="w-10 h-10 flex justify-center items-center bg-[#F96A61] rounded-lg"
                                >
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
