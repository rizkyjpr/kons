"use client";
import { useEffect, useState } from "react";
import AddModal from "./modal/addModal";
import EditModal from "./modal/editModal";
import { PencilIcon } from "@/assets/PencilIcon";
import { TrashIcon } from "@/assets/TrashIcon";
import { FiCheck } from "react-icons/fi";
import { useGlobalContext } from "../Context/store";
import Axios from "@/lib/postgres";

export const Table = () => {
    const { user, kriteria, supplier, setSupplier } = useGlobalContext();

    const [normalisasi, setNormalisasi] = useState<any[]>([]);

    const [currentSupplier, setCurrentSupplier] = useState(-1);
    const [addSupplierModal, setAddSupplierModal] = useState(false);
    const [editSupplierModal, setEditSupplierModal] = useState(false);
    const [tab, setTab] = useState("list");

    const selectedKriteria = kriteria.filter((item: any) => item.check);
    const selectedSupplier = supplier.filter((item: any) => item.check);

    const handleAdd = async (formData: any) => {
        if (formData.nama === "") return alert("Please input name");

        const form = {
            name: formData.nama,
            added_by: user.id,
            rating: formData.rating,
        };

        const res = await Axios.post(`/supplier`, form).then((res) => res.data);

        if (res.status !== 201) return;

        const supplier = await Axios.get(`/supplier`).then((res) =>
            res.data.map((item: any) => {
                return {
                    ...item,
                    check: false,
                };
            })
        );

        setSupplier(supplier);

        setAddSupplierModal(false);
    };

    const handleEdit = async (formData: any) => {
        if (formData.name === "") return alert("Please input name");

        const form = { ...formData, added_by: user.id };

        const res = await Axios.patch(`/supplier`, form).then(
            (res) => res.data
        );

        if (res.status !== 202) return;

        const supplier = await Axios.get(`/supplier`).then((res) =>
            res.data.map((item: any) => {
                return {
                    ...item,
                    check: false,
                };
            })
        );

        setSupplier(supplier);
        setEditSupplierModal(false);
    };

    const handleDelete = async (id: string) => {
        const res = await Axios.delete(`/supplier/${id}`).then(
            (res) => res.data
        );

        if (res.status !== 202) return;

        const supplier = await Axios.get(`/supplier`).then((res) =>
            res.data.map((item: any) => {
                return {
                    ...item,
                    check: false,
                };
            })
        );

        setSupplier(supplier);
    };

    useEffect(() => {
        const fetchData = async () => {
            const supplier = await Axios.get(`/supplier`).then((res) =>
                res.data.map((item: any) => {
                    return {
                        ...item,
                        check: false,
                    };
                })
            );

            setSupplier(supplier);
        };

        fetchData();
    }, []);

    const handleChangeTab = async (tab: string) => {
        setTab(tab);
    };

    const handleCheckbox = (id: string) => {
        const newData = supplier.map((item: any) => {
            if (item.id === id) {
                return {
                    ...item,
                    check: !item.check,
                };
            } else {
                return item;
            }
        });

        setSupplier([...newData]);
        localStorage.setItem("supplier", JSON.stringify(newData));
    };

    const hitungNormalisasi = async () => {
        const selectedSupplier = supplier
            .filter((item: any) => item.check)
            .map((item: any) => `'` + item.id + `'`)
            .join(",");

        const normalisasi = await Axios.post(`/supplier/normalisasi`, {
            id_supplier: selectedSupplier,
        }).then((res) => res.data);

        setNormalisasi([...normalisasi]);
    };

    return (
        <>
            {addSupplierModal && (
                <AddModal
                    kriteriaData={selectedKriteria}
                    setModal={setAddSupplierModal}
                    handleSubmit={handleAdd}
                />
            )}
            {editSupplierModal && (
                <EditModal
                    kriteriaData={kriteria}
                    setModal={setEditSupplierModal}
                    supplierData={
                        supplier[
                            supplier.findIndex(
                                (item: any) => item.id === currentSupplier
                            )
                        ]
                    }
                    handleSubmit={handleEdit}
                />
            )}
            <div className="w-full p-4 bg-white flex flex-col justify-between items-center rounded-[20px]">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex justify-center items-center">
                            {tab === "list" ? (
                                <p className="font-bold text-black text-xl">
                                    List Supplier
                                </p>
                            ) : (
                                <p className="font-bold text-black text-xl">
                                    Norm Rating
                                </p>
                            )}
                            {tab === "normalisasi" ? (
                                <button
                                    onClick={() => handleChangeTab("list")}
                                    className="ml-4 font-bold text-[#56AAB1] text-xs"
                                >
                                    List Supplier
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        handleChangeTab("normalisasi")
                                    }
                                    className="ml-4 font-bold text-[#56AAB1] text-xs"
                                >
                                    Normalisasi Rating
                                </button>
                            )}
                        </div>
                        {tab === "list" ? (
                            <button
                                onClick={() => setAddSupplierModal(true)}
                                className="py-2.5 px-3 flex justify-center items-center bg-[#56AAB1] rounded-lg"
                            >
                                <p className="text-white">+ Tambah Supplier</p>
                            </button>
                        ) : (
                            <button
                                onClick={() => hitungNormalisasi()}
                                className="py-2.5 px-3 flex justify-center items-center bg-[#56AAB1] rounded-lg"
                            >
                                <p className="text-white">Hitung Normalisasi</p>
                            </button>
                        )}
                    </div>
                    {tab === "list" ? (
                        <div className="w-full flex-col justify-center items-center">
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
                                    Rating
                                </p>
                                <p className="font-bold text-xs text-[#AEAEAE] text-center">
                                    Action
                                </p>
                            </div>
                            {supplier &&
                                supplier.map((item: any) => (
                                    <div
                                        className="w-full py-4 grid grid-cols-5 border-b border-[#E4E4E4]"
                                        key={item.id}
                                    >
                                        <button
                                            onClick={() =>
                                                handleCheckbox(item.id)
                                            }
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
                                            {item.added_by}
                                        </p>
                                        <p className="text-black text-center">
                                            {item.kriteria
                                                .map((k: any) => k.nilai)
                                                .join(",")}
                                        </p>
                                        <div className="mx-auto flex justify-center items-center gap-2.5">
                                            <button
                                                onClick={() => {
                                                    setCurrentSupplier(item.id);
                                                    setEditSupplierModal(true);
                                                }}
                                                className="w-10 h-10 flex justify-center items-center bg-[#F9AA61] rounded-lg"
                                            >
                                                <PencilIcon />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="w-10 h-10 flex justify-center items-center bg-[#F96A61] rounded-lg"
                                            >
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="w-full flex-col justify-center items-center">
                            <div
                                className={`w-full mt-2 py-3 flex justify-around border-y border-[#E4E4E4]`}
                            >
                                <p className="w-[60px] font-bold text-xs text-[#AEAEAE] text-center">
                                    Nama Supplier
                                </p>
                                {selectedKriteria.map((k: any) => (
                                    <p
                                        className="w-[60px] font-bold text-xs text-[#AEAEAE] text-center"
                                        key={k.id}
                                    >
                                        {k.name}
                                    </p>
                                ))}
                            </div>
                            {selectedSupplier.map((s: any) => (
                                <div
                                    className={`w-full py-4 flex justify-around border-b border-[#E4E4E4]`}
                                    key={s.id}
                                >
                                    <p className="w-[60px] text-black text-center">
                                        {s.name}
                                    </p>
                                    {selectedKriteria.map((k: any) => {
                                        const current = normalisasi.filter(
                                            (val: any) =>
                                                val.id_supplier === s.id &&
                                                val.id_kriteria === k.id
                                        )[0];

                                        return (
                                            <p
                                                className="w-[60px] font-bold text-xs text-[#AEAEAE] text-center"
                                                key={k.id}
                                            >
                                                {current
                                                    ? current.nilai_normalisasi
                                                    : ""}
                                            </p>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="w-20 h-10 mx-auto mt-5 bg-[#D9D9D9]"></div>
            </div>
        </>
    );
};
