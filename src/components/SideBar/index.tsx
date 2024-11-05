import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SidebarProps) => {
  const [chatLink, setChatLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatLink = async () => {
      try {
        const response = await axios.get("https://apx-x.onrender.com/url");
        console.log("Chat link fetched:", response.data);
        const url = response.data.url;
        setChatLink(url);
      } catch (error) {
        console.error("Erro ao buscar o link do chat:", error);
      }
    };

    fetchChatLink();
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      >
        <div
          className="w-full max-w-[280px] h-full bg-white ease-in-out translate-x-0 duration-300"
          style={{ opacity: 1, transform: "translateX(0%)" }}
        >
          {chatLink ? (
            <Link
              href={chatLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col border-b border-solid border-gray-600 text-sm font-medium"
            >
              <p className="flex w-full gap-2 p-4 cursor-pointer hover:bg-zinc-300 hover:opacity-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--fluent"
                  width="16px"
                  height="16px"
                  viewBox="0 0 28 28"
                >
                  <path
                    fill="currentColor"
                    d="M14 3.5C8.201 3.5 3.5 8.201 3.5 14c0 1.884.496 3.65 1.363 5.178a.75.75 0 0 1 .07.575l-1.318 4.634l4.634-1.318a.75.75 0 0 1 .576.07A10.45 10.45 0 0 0 14 24.5c5.799 0 10.5-4.701 10.5-10.5S19.799 3.5 14 3.5M2 14C2 7.373 7.373 2 14 2s12 5.373 12 12s-5.373 12-12 12a11.95 11.95 0 0 1-5.637-1.404l-4.77 1.357a1.25 1.25 0 0 1-1.544-1.544l1.356-4.77A11.95 11.95 0 0 1 2 14"
                  ></path>
                </svg>
                <span>Chat</span>
              </p>
            </Link>
          ) : (
            <div className="flex flex-col border-b border-solid border-gray-600 text-sm font-medium">
              <p className="flex w-full gap-2 p-4 cursor-pointer hover:bg-zinc-300 hover:opacity-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--fluent"
                  width="16px"
                  height="16px"
                  viewBox="0 0 28 28"
                >
                  <path
                    fill="currentColor"
                    d="M14 3.5C8.201 3.5 3.5 8.201 3.5 14c0 1.884.496 3.65 1.363 5.178a.75.75 0 0 1 .07.575l-1.318 4.634l4.634-1.318a.75.75 0 0 1 .576.07A10.45 10.45 0 0 0 14 24.5c5.799 0 10.5-4.701 10.5-10.5S19.799 3.5 14 3.5M2 14C2 7.373 7.373 2 14 2s12 5.373 12 12s-5.373 12-12 12a11.95 11.95 0 0 1-5.637-1.404l-4.77 1.357a1.25 1.25 0 0 1-1.544-1.544l1.356-4.77A11.95 11.95 0 0 1 2 14"
                  ></path>
                </svg>
                <span>Carregando chat...</span>
              </p>
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex w-full gap-2 p-4 cursor-pointer hover:bg-zinc-300 hover:opacity-75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--solar"
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3.5 11v3c0 3.771 0 5.657 1.172 6.828C5.843 22 7.729 22 11.5 22h1c3.771 0 5.657 0 6.828-1.172C20.5 19.657 20.5 17.771 20.5 14v-3"></path>
                  <path d="M9.5 2h5l.652 6.517a3.167 3.167 0 1 1-6.304 0z"></path>
                  <path d="M3.33 5.351c.178-.89.267-1.335.448-1.696a3 3 0 0 1 1.888-1.548C6.056 2 6.51 2 7.418 2H9.5l-.725 7.245a3.06 3.06 0 1 1-6.043-.904zm17.34 0c-.178-.89-.267-1.335-.448-1.696a3 3 0 0 0-1.888-1.548C17.944 2 17.49 2 16.582 2H14.5l.725 7.245a3.06 3.06 0 1 0 6.043-.904z"></path>
                  <path
                    strokeLinecap="round"
                    d="M9.5 21.5v-3c0-.935 0-1.402.373-1.777C10.557 16 11.07 16 12 16c.931 0 1.443 0 1.793.723.373.374.373.842.373 1.777v3"
                  ></path>
                </g>
              </svg>
              <span>Minhas compras</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
