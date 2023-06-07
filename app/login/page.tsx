"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Axios from "@/lib/postgres";
import { useGlobalContext } from "../Context/store";

export default function Login() {
    const { push } = useRouter();
    const { user, setUser } = useGlobalContext();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async () => {
        const res = await Axios.post(`/login`, form);
        setUser(res.data);
        push("/kriteria");
    };

    useEffect(() => {
        if (user.name) push("/kriteria");
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#D9D9D9]">
            <div className="w-1/2 flex flex-col justify-center items-center bg-white drop-shadow rounded-xl px-[50px] py-10">
                <h3 className="font-bold text-[32px] text-black text-center">
                    Login Page
                </h3>

                <div className="w-full flex-col justify-center items-center mt-16">
                    <div className="flex-col justify-start items-start">
                        <p className="font-bold text-xs text-black">Email</p>
                        <input
                            type="text"
                            className="w-full border border-[#E1E1E1] mt-1 py-2 px-2"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex-col justify-start items-start mt-8">
                        <p className="font-bold text-xs text-black">Password</p>
                        <input
                            type="password"
                            className="w-full border border-[#E1E1E1] mt-1 py-2 px-2"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="w-full flex-col justify-center items-center gap-2 mt-24">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-[#56AAB1] text-white text-sm rounded-lg"
                    >
                        Login
                    </button>
                    <Link href={"/register"}>
                        <button className="w-full py-3 bg-white text-[#56AAB1] text-sm rounded-lg">
                            Make an account
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
