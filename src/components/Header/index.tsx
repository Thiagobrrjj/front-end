"use client";

import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../SideBar";

const Header = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const toggleMenuOpen = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <header className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="flex flex-col p-4 border-b border-solid border-gray-300 duration-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {sidebarOpen && (
              <Sidebar isOpen={sidebarOpen} onClose={toggleMenuOpen} />
            )}
            <div onClick={toggleMenuOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="cursor-pointer iconify iconify--iconamoon"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6.001h18m-18 6h18m-18 6h18"
                ></path>
              </svg>
            </div>
            <div className="max-w-[48px]">
              <Link href="https://www.olx.com.br/">
                <img className="w-full" src="/logo.png" alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="cursor-pointer iconify iconify--fluent"
              width="24px"
              height="24px"
              viewBox="0 0 28 28"
            >
              <path
                fill="currentColor"
                d="M14 3.5C8.201 3.5 3.5 8.201 3.5 14c0 1.884.496 3.65 1.363 5.178a.75.75 0 0 1 .07.575l-1.318 4.634l4.634-1.318a.75.75 0 0 1 .576.07A10.45 10.45 0 0 0 14 24.5c5.799 0 10.5-4.701 10.5-10.5S19.799 3.5 14 3.5M2 14C2 7.373 7.373 2 14 2s12 5.373 12 12s-5.373 12-12 12a11.95 11.95 0 0 1-5.637-1.404l-4.77 1.357a1.25 1.25 0 0 1-1.544-1.544l1.356-4.77A11.95 11.95 0 0 1 2 14"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="cursor-pointer iconify iconify--iconoir"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M18 8.4c0-1.697-.632-3.325-1.757-4.525S13.59 2 12 2s-3.117.674-4.243 1.875C6.632 5.075 6 6.703 6 8.4C6 15.867 3 18 3 18h18s-3-2.133-3-9.6M13.73 21a2 2 0 0 1-3.46 0"
              ></path>
            </svg>
            <Link
              className="text-white"
              href="https://www2.olx.com.br/desapega"
            >
              <div className="bg-orange-500 hover:bg-orange-600 duration-200 rounded-full py-2 px-4 text-sm text-center font-medium cursor-pointer">
                Anunciar
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full flex gap-2 border-2 border-solid border-gray-300 mt-4 rounded-md py-2 px-4">
          <input
            placeholder="Buscar"
            type="text"
            className="w-full outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="iconify iconify--ion"
            width="24px"
            height="24px"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z"
            ></path>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M338.29 338.29L448 448"
            ></path>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
