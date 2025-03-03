"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../context/UserContext";

const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { state } = useUser();

    return (
        <div className="navbar bg-base-100 px-4">
            <div className="flex items-center space-x-4">
                <a className="btn btn-ghost text-xl">
                    perfEvals
                </a>

                {state.userInfo.individualContributor === false && (
                    <ul className="menu menu-horizontal space-x-2">
                        <li>
                            <a
                                onClick={() => router.push(`/dashboard?userId=${state.userInfo.userId}`)}
                                className={`cursor-pointer px-3 py-2 rounded-md transition ${
                                    pathname === "/dashboard" ? "bg-gray-200 text-black font-semibold" : "hover:bg-gray-100"
                                }`}
                            >
                                Evaluations
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => router.push("/employees")}
                                className={`cursor-pointer px-3 py-2 rounded-md transition ${
                                    pathname === "/employees" ? "bg-gray-200 text-black font-semibold" : "hover:bg-gray-100"
                                }`}
                            >
                                Employees
                            </a>
                        </li>
                    </ul>
                )}
            </div>

            <div className="flex-1"></div>
        </div>
    );
};

export default NavBar;