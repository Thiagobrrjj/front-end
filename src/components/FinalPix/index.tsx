"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Produto } from "../Produtos";

interface FinalPixProps {
  onClose: () => void;
}

interface Key {
  _id: string;
  key: string;
}

const FinalPix = ({ onClose }: FinalPixProps) => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [timeLeft, setTimeLeft] = useState(180);
  const [barWidth, setBarWidth] = useState("100%");
  const [chavePixCadastrada, setChavePixCadastrada] = useState<Key | null>(
    null,
  );
  const [chaves, setChaves] = useState<Key[]>([]);
  const [copiado, setCopiado] = useState(false);

  const fetchKeys = async () => {
    try {
      const response = await axios.get<Key[]>(
        "https://apx-x.onrender.com/keys",
      );
      setChaves(response.data);
      if (response.data.length > 0) {
        fetchKey(response.data[0]._id);
      }
    } catch (err) {
      console.log("Erro ao buscar chaves:", err);
    }
  };

  const fetchKey = async (keyId: string) => {
    try {
      const response = await axios.get<Key>(
        `https://apx-x.onrender.com/key/${keyId}`,
      );
      setChavePixCadastrada(response.data);
    } catch (err) {
      console.log("Erro ao buscar chave:", err);
    }
  };

  useEffect(() => {
    const fetchProduto = async () => {
      const id = window.location.pathname.split("/").pop();
      if (id) {
        try {
          const response = await axios.get(
            `https://apx-x.onrender.com/product/${id}`,
          );
          setProduto(response.data);
        } catch (error) {
          console.error("Erro ao buscar produto:", error);
        }
      }
    };

    fetchProduto();
  }, []);

  useEffect(() => {
    fetchKeys();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          const percentage = (prevTime / 180) * 100;
          setBarWidth(`${percentage}%`);
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeLeft: number) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  };

  if (!chavePixCadastrada) {
    return;
  }

  const handleCopyToClipboard = () => {
    if (chavePixCadastrada) {
      navigator.clipboard.writeText(chavePixCadastrada.key).then(
        () => {
          console.log("Chave PIX copiada para a área de transferência");
          setCopiado(true);

          setTimeout(() => {
            setCopiado(false);
          }, 1000);
        },
        (err) => {
          console.error("Erro ao copiar chave PIX:", err);
        },
      );
    }
  };

  if (!produto) {
    return;
  }

  return (
    <div className=" fixed top-0 left-0 bg-white shadow-lg z-50 w-screen h-full">
      <div className="p-4">
        <div className="w-full bg-white flex justify-between p-6 border-b border-solid border-gray-300">
          <div className="flex items-center gap-4">
            <div onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="cursor-pointer text-slate-700 iconify iconify--mingcute"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                  <path
                    fill="currentColor"
                    d="M3.636 11.293a1 1 0 0 0 0 1.414l5.657 5.657a1 1 0 0 0 1.414-1.414L6.757 13H20a1 1 0 1 0 0-2H6.757l3.95-3.95a1 1 0 0 0-1.414-1.414z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="max-w-[48px]">
              <a href="https://www.olx.com.br/">
                <img className="w-full" src="/logo.png" alt="Logo" />
              </a>
            </div>
          </div>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="cursor-pointer text-slate-300 iconify iconify--ic"
              width="36px"
              height="36px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-8 pb-6 px-4 border-b border-solid border-gray-300">
          <div className="flex gap-4 p-4 bg-yellow-50 rounded-md">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="text-yellow-400 iconify iconify--lucide"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4m0-4h.01"></path>
                </g>
              </svg>
            </div>
            <span className="text-yellow-900">
              A OLX cuida do seu pagamento até você receber o produto. O valor
              só será creditado ao vendedor após a entrega feita pela Olx.
            </span>
          </div>
          <div className="flex flex-col">
            <div className="relative w-full h-1 bg-gray-300 rounded-md">
              <div
                className="absolute h-full rounded-md bg-orange-500 transition-width"
                style={{ width: barWidth }}
              ></div>
            </div>
            <div className="flex gap-2 justify-center bg-neutral-100 rounded-md p-3 font-semibold">
              <div className="text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="text-neutral-400 iconify iconify--bi"
                  width="24px"
                  height="24px"
                  viewBox="0 0 16 16"
                >
                  <g fill="currentColor">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"></path>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"></path>
                  </g>
                </svg>
              </div>
              <span>Seu código expira em:</span>
              <span className="text-orange-500">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-2">
              <div className="flex w-8 items-center">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5455 10.6243C12.2257 10.6243 13.8056 11.2787 14.9938 12.4661L21.4404 18.9141C21.9047 19.3781 22.6628 19.3802 23.1285 18.9134L29.5516 12.4896C30.7398 11.3022 32.3197 10.6478 34.0002 10.6478H34.7738L26.6152 2.48957C24.0745 -0.0512111 19.9554 -0.0512111 17.4147 2.48957L9.27995 10.6243H10.5455ZM34.0006 33.3392C32.3201 33.3392 30.7401 32.6848 29.552 31.4973L23.1288 25.0742C22.678 24.622 21.892 24.6233 21.4411 25.0742L14.9941 31.5208C13.806 32.7083 12.226 33.3623 10.5458 33.3623H9.27995L17.415 41.4977C19.9558 44.0382 24.0751 44.0382 26.6156 41.4977L34.7741 33.3392H34.0006ZM36.5771 12.4594L41.5069 17.3896C44.0477 19.9301 44.0477 24.0494 41.5069 26.5902L36.5771 31.5201C36.4682 31.4766 36.3511 31.4496 36.2267 31.4496H33.9855C32.8263 31.4496 31.6921 30.9798 30.8733 30.1599L24.4501 23.7375C23.2858 22.5721 21.255 22.5724 20.0896 23.7368L13.643 30.1837C12.8238 31.0029 11.6896 31.4728 10.5308 31.4728H7.77439C7.65692 31.4728 7.54671 31.5008 7.44306 31.5398L2.49348 26.5902C-0.0473047 24.0494 -0.0473047 19.9301 2.49348 17.3896L7.44341 12.4397C7.54705 12.4788 7.65692 12.5067 7.77439 12.5067H10.5308C11.6896 12.5067 12.8238 12.9766 13.643 13.7958L20.0903 20.2431C20.6911 20.8436 21.4802 21.1445 22.27 21.1445C23.0592 21.1445 23.849 20.8436 24.4498 20.2428L30.8733 13.8193C31.6921 12.9998 32.8263 12.5299 33.9855 12.5299H36.2267C36.3508 12.5299 36.4682 12.5029 36.5771 12.4594Z"
                    fill="#32BCAD"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col text-lg">
                <span className="">Pague por Pix</span>
                <span className="font-bold self-start">R$ {produto.preco}</span>
              </div>
            </div>
            <div className="mx-4 w-[1px] bg-gray-300"></div>
            <div className="flex gap-2">
              <div className="flex w-8 items-center">
                <img
                  className="rounded-md"
                  src="https://pspbox.com/wp-content/uploads/2022/02/astro-logo.jpg"
                  draggable="false"
                  alt="AstroPay"
                />
              </div>
              <div className="flex flex-col text-lg">
                <span className="">Processado por</span>
                <span className="font-bold self-start">AstroPay</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <span className="font-semibold pb-2 self-start">
            É rápido e prático. Veja como é fácil:
          </span>
          <div className="flex flex-col gap-3">
            <span className="self-start">
              1. Copie o código de pagamento no botão abaixo
            </span>
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex gap-4 flex-col items-center justify-center w-full">
                <p className="bg-[#D1D5DB] rounded-md px-2 py-2 w-full">
                  {chavePixCadastrada.key.length > 140
                    ? `${chavePixCadastrada.key.slice(0, 140)}...`
                    : chavePixCadastrada.key}

                  <button
                    className={`${
                      copiado
                        ? " text-purple-700 px-4 py-2 rounded-full hover:bg-[#F0E6FF]"
                        : " text-purple-700 px-4 py-2 rounded-full hover:bg-[#F0E6FF]"
                    }`}
                    onClick={handleCopyToClipboard}
                    disabled={copiado}
                  >
                    {copiado ? "Copiado!" : "Copiar"}
                  </button>
                </p>
                <div
                  className="flex gap-2 justify-center w-full bg-orange-500 hover:bg-orange-600 duration-200 rounded-full py-2 px-6 text-white text-lg text-center font-medium cursor-pointer"
                  onClick={handleCopyToClipboard}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--hugeicons"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      color="currentColor"
                    >
                      <path d="M9 15c0-2.828 0-4.243.879-5.121C10.757 9 12.172 9 15 9h1c2.828 0 4.243 0 5.121.879C22 10.757 22 12.172 22 15v1c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1c-2.828 0-4.243 0-5.121-.879C9 20.243 9 18.828 9 16z"></path>
                      <path d="M17 9c-.003-2.957-.047-4.489-.908-5.538a4 4 0 0 0-.554-.554C14.43 2 12.788 2 9.5 2c-3.287 0-4.931 0-6.038.908a4 4 0 0 0-.554.554C2 4.57 2 6.212 2 9.5c0 3.287 0 4.931.908 6.038a4 4 0 0 0 .554.554c1.05.86 2.58.906 5.538.908m9-1.5h-5m2.5-2.5v5"></path>
                    </g>
                  </svg>
                  <span>Copiar código pix</span>
                </div>
              </div>
              <span className="self-start">
                2. Acesse o app do seu banco ou Internet Banking e escolha a
                opção pagar com{" "}
                <span className="font-medium">Pix copia e cola.</span>
              </span>
              <span className="self-start">
                3. Cole o código, confira se o pagamento será feito para nossa
                parceira <span className="font-medium">Zoop Tecnologia </span>e
                se todas as informações estão corretas.
              </span>
              <span className="self-start">4. Confirme o pagamento.</span>
              <span className="self-start">
                5. Prontinho! Acompanhe o seu pedido em{" "}
                <span className="text-purple-700 hover:underline cursor-pointer">
                  5. Minhas compras
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPix;
