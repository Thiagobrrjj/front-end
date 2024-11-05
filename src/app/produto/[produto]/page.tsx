"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Produto } from "@/components/Produtos";
import Header from "@/components/Header";
import Link from "next/link";

const ProdutoPage: React.FC = () => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [error, setError] = useState<string | null>(null);
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
  }, [chatLink]);

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
          setError("Erro ao buscar produto.");
        }
      }
    };

    fetchProduto();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!produto) {
    return;
  }
  return (
    <section>
      <Header />
      <main>
        <div className="hidden md:flex gap-1 items-center text-xs px-6 py-4">
          <span className="cursor-pointer hover:underline hover:text-purple-500">
            {produto.estado}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--ic"
            width="12px"
            height="12px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
            ></path>
          </svg>
          <span className="cursor-pointer hover:underline hover:text-purple-500">
            {produto.bairro}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--ic"
            width="12px"
            height="12px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
            ></path>
          </svg>
          <span className="cursor-pointer hover:underline hover:text-purple-500">
            {produto.subcategoria}
          </span>
        </div>
        <section className="bg-slate-300">
          <div dir="ltr" aria-roledescription="carousel">
            <div className="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="text-white nav iconify iconify--heroicons"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div className="flex justify-center items-center">
                {produto.imagem && (
                  <img
                    draggable="false"
                    className="h-[280px]"
                    src={`https://apx-x.onrender.com${produto.imagem.replace(/\\/g, "/")}`}
                    alt={produto.nome}
                  />
                )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="text-white nav iconify iconify--heroicons"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12L7.72 5.03a.75.75 0 0 1 1.06-1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-8 pt-8 px-6">
          <div className="flex flex-wrap gap-3">
            <div className="w-fit flex gap-2 bg-[#E1F9FF] text-[#14596B]  py-1 px-3 bg-ciano-80 text-ciano-110 text-xs rounded-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--mingcute text-[#14596B]"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill="currentColor"
                      d="M17 2a3 3 0 0 1 3 3v12a1 1 0 0 1 .351 1.936l-8 3a1 1 0 0 1-.702 0l-8-3A1 1 0 0 1 4 17V5a3 3 0 0 1 3-3zm0 2H7a1 1 0 0 0-.993.883L6 5v12.682l6 2.25l6-2.25V5a1 1 0 0 0-.883-.993zm-5 1a1 1 0 0 1 .993.883L13 6v1h2a1 1 0 0 1 .117 1.993L15 9h-5a.5.5 0 0 0-.09.992L10 10h4a2.5 2.5 0 0 1 .164 4.995L14 15h-1v1a1 1 0 0 1-1.993.117L11 16v-1H9a1 1 0 0 1-.117-1.993L9 13h5a.5.5 0 0 0 .09-.992L14 12h-4a2.5 2.5 0 0 1-.164-4.995L10 7h1V6a1 1 0 0 1 1-1"
                    ></path>
                  </g>
                </svg>
              </div>
              <span className="pt-1">Garantia da OLX</span>
            </div>

            <div className="w-fit flex gap-2 bg-[#E1F9FF] text-[#14596B]  py-1 px-2 bg-ciano-80 text-ciano-110 text-xs rounded-full">
              <div>
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
                    <path d="M19.5 17.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-10 0a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"></path>
                    <path d="M14.5 17.5h-5m10 0h.763c.22 0 .33 0 .422-.012a1.5 1.5 0 0 0 1.303-1.302c.012-.093.012-.203.012-.423V13a6.5 6.5 0 0 0-6.5-6.5M2 4h10c1.414 0 2.121 0 2.56.44C15 4.878 15 5.585 15 7v8.5M2 12.75V15c0 .935 0 1.402.201 1.75a1.5 1.5 0 0 0 .549.549c.348.201.815.201 1.75.201M2 7h6m-6 3h4"></path>
                  </g>
                </svg>
              </div>
              <span className="pt-1">Entrega fácil</span>
            </div>

            <div className="w-fit flex gap-2 py-1 bg-[#E1F9FF] text-[#14596B] px-2 bg-ciano-80 text-ciano-110 text-xs rounded-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--akar-icons"
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
                    <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6zm0 2h20"></path>
                    <path d="M2 12h7c0 1 .6 3 3 3s3-2 3-3h7"></path>
                  </g>
                </svg>
              </div>
              <span className="pt-1">Parcelamento sem juros</span>
            </div>

            <div className="w-fit flex gap-2 py-1 px-2 bg-[#E1F9FF] text-[#14596B] bg-ciano-80 text-ciano-110 text-xs rounded-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--mdi"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 6h-2c0-2.8-2.2-5-5-5S7 3.2 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-7-3c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3m7 17H5V8h14zm-7-8c-1.7 0-3-1.3-3-3H7c0 2.8 2.2 5 5 5s5-2.2 5-5h-2c0 1.7-1.3 3-3 3"
                  ></path>
                </svg>
              </div>
              <span className="pt-1">Pague online</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-2">
              <span className="text-4xl">R$ {produto.preco}</span>
              <div className="flex py-1 items-center bg-[#F0E6FF] px-2 gap-2 bg-roxo-claro rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--iconamoon"
                  width="12px"
                  height="12px"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path
                      d="M13 3H2v14a2 2 0 0 0 2 2a2 2 0 1 1 4 0h5V9z"
                      opacity=".16"
                    ></path>
                    <path d="M2 3V2a1 1 0 0 0-1 1zm11 0h1a1 1 0 0 0-1-1zm0 6V8a1 1 0 0 0-1 1zM2 4h11V2H2zm10-1v16h2V3zM3 17V3H1v14zm10-7h5V8h-5zm8 3v4h2v-4zm-7 6V9h-2v10zm4.707.707a1 1 0 0 1-1.414 0l-1.414 1.414a3 3 0 0 0 4.242 0zm-1.414-1.414a1 1 0 0 1 1.414 0l1.414-1.414a3 3 0 0 0-4.242 0zM6.707 19.707a1 1 0 0 1-1.414 0l-1.414 1.414a3 3 0 0 0 4.242 0zm-1.414-1.414a1 1 0 0 1 1.414 0l1.414-1.414a3 3 0 0 0-4.242 0zm13.414 0c.196.195.293.45.293.707h2c0-.766-.293-1.536-.879-2.121zM19 19a.994.994 0 0 1-.293.707l1.414 1.414A2.994 2.994 0 0 0 21 19zm-3-1h-3v2h3zm1.293 1.707A.994.994 0 0 1 17 19h-2c0 .766.293 1.536.879 2.121zM17 19a.99.99 0 0 1 .293-.707l-1.414-1.414A2.994 2.994 0 0 0 15 19zm-11.707.707A.994.994 0 0 1 5 19H3c0 .766.293 1.536.879 2.121zM5 19a.99.99 0 0 1 .293-.707l-1.414-1.414A2.994 2.994 0 0 0 3 19zm8-1H8v2h5zm-6.293.293c.196.195.293.45.293.707h2c0-.766-.293-1.536-.879-2.121zM7 19a.994.994 0 0 1-.293.707l1.414 1.414A2.994 2.994 0 0 0 9 19zm14-2a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3zm-3-7a3 3 0 0 1 3 3h2a5 5 0 0 0-5-5zM1 17a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1z"></path>
                  </g>
                </svg>
                <span className="text-sm text-[#6E0AD6] font-semibold text-roxo-escuro">
                  Frete grátis
                </span>
              </div>
            </div>

            <div className="flex flex-col text-sm">
              <span>Em até</span>
              <span className="text-sm font-semibold">
                {produto.parcelas}x sem juros no cartão
              </span>
              <span className="cursor-pointer text-purple-500 hover:underline">
                Ver opções de parcelamento
              </span>
            </div>

            <div className="flex flex-col text-sm">
              <div className="flex gap-2 cursor-pointer">
                <div>
                  <img
                    className="w-[25px] h-full rounded-full"
                    src="/R.png"
                    alt="PIX"
                  />
                </div>
                <div>
                  <img
                    className="w-[25px] h-full rounded-full"
                    src="https://static-00.iconduck.com/assets.00/visa-icon-2048x1286-fhy0jwfc.png"
                    alt="Visa"
                  />
                </div>
                <div>
                  <img
                    className="w-[25px] h-full rounded-full"
                    src="https://static-00.iconduck.com/assets.00/mastercard-icon-1024x643-j3zb44jj.png"
                    alt="Mastercard"
                  />
                </div>
                <div>
                  <img
                    className="w-[25px] h-full rounded-full"
                    src="https://logopng.com.br/logos/elo-30.png"
                    alt="elo"
                  />
                </div>
              </div>
              <span className="cursor-pointer text-purple-500 hover:underline">
                Ver mais informações
              </span>
            </div>

            <div className="flex gap-2  items-end cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="text-roxo-escuro text-[#6E0AD6] iconify iconify--hugeicons"
                width="32px"
                height="32px"
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
                  <path d="M20.943 16.835a15.76 15.76 0 0 0-4.476-8.616c-.517-.503-.775-.754-1.346-.986C14.55 7 14.059 7 13.078 7h-2.156c-.981 0-1.472 0-2.043.233c-.57.232-.83.483-1.346.986a15.76 15.76 0 0 0-4.476 8.616C2.57 19.773 5.28 22 8.308 22h7.384c3.029 0 5.74-2.227 5.25-5.165"></path>
                  <path d="M7.257 4.443c-.207-.3-.506-.708.112-.8c.635-.096 1.294.338 1.94.33c.583-.009.88-.268 1.2-.638C10.845 2.946 11.365 2 12 2s1.155.946 1.491 1.335c.32.37.617.63 1.2.637c.646.01 1.305-.425 1.94-.33c.618.093.319.5.112.8l-.932 1.359c-.4.58-.599.87-1.017 1.035S13.837 7 12.758 7h-1.516c-1.08 0-1.619 0-2.036-.164S8.589 6.38 8.189 5.8zm6.37 8.476c-.216-.799-1.317-1.519-2.638-.98s-1.53 2.272.467 2.457c.904.083 1.492-.097 2.031.412c.54.508.64 1.923-.739 2.304c-1.377.381-2.742-.214-2.89-1.06m1.984-5.06v.761m0 5.476v.764"></path>
                </g>
              </svg>
              <span className="text-purple-500 hover:underline">
                Ver mais informações
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-xl">{produto.nome}</h1>
          </div>
          <div className="flex flex-col gap-2 pb-2 border-b  border-solid border-gray-300">
            <span className="text-lg text-slate-500">
              Publicado em {new Date(produto.created_at).toLocaleDateString()}
            </span>
            <div className="flex flex-col bg-[#F0E6FF] gap-6 p-4 bg-roxo-claro rounded-md">
              <div>
                <span className="text-lg font-medium">
                  Este anúncio oferece
                </span>
                <div className="flex flex-col mt-6 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--mingcute"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none">
                          <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                          <path
                            fill="currentColor"
                            d="M17 2a3 3 0 0 1 3 3v12a1 1 0 0 1 .351 1.936l-8 3a1 1 0 0 1-.702 0l-8-3A1 1 0 0 1 4 17V5a3 3 0 0 1 3-3zm0 2H7a1 1 0 0 0-.993.883L6 5v12.682l6 2.25l6-2.25V5a1 1 0 0 0-.883-.993zm-5 1a1 1 0 0 1 .993.883L13 6v1h2a1 1 0 0 1 .117 1.993L15 9h-5a.5.5 0 0 0-.09.992L10 10h4a2.5 2.5 0 0 1 .164 4.995L14 15h-1v1a1 1 0 0 1-1.993.117L11 16v-1H9a1 1 0 0 1-.117-1.993L9 13h5a.5.5 0 0 0 .09-.992L14 12h-4a2.5 2.5 0 0 1-.164-4.995L10 7h1V6a1 1 0 0 1 1-1"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="font-medium mr-2">
                          Garantia da OLX.
                        </span>
                        <span>
                          Pague online e receba o que comprou ou a OLX devolve
                          seu dinheiro
                        </span>
                      </div>
                      <span className="cursor-pointer text-purple-700 text-sm text-roxo-escuro hover:underline">
                        Saiba mais sobre a garantia da OLX
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--akar-icons"
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
                          <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6zm0 2h20"></path>
                          <path d="M2 12h7c0 1 .6 3 3 3s3-2 3-3h7"></path>
                        </g>
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium mr-2">
                        Parcelamento sem juros.
                      </span>
                      <span>
                        Parcele suas compras sem juros no cartão de crédito.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-fit">
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
                          <path d="M19.5 17.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-10 0a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"></path>
                          <path d="M14.5 17.5h-5m10 0h.763c.22 0 .33 0 .422-.012a1.5 1.5 0 0 0 1.303-1.302c.012-.093.012-.203.012-.423V13a6.5 6.5 0 0 0-6.5-6.5M2 4h10c1.414 0 2.121 0 2.56.44C15 4.878 15 5.585 15 7v8.5M2 12.75V15c0 .935 0 1.402.201 1.75a1.5 1.5 0 0 0 .549.549c.348.201.815.201 1.75.201M2 7h6m-6 3h4"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="font-medium mr-2">Entrega fácil.</span>
                        <span>
                          Receba ou retire seu produto onde quiser com
                          segurança.
                        </span>
                      </div>
                      <span className="cursor-pointer text-purple-700 text-sm text-roxo-escuro hover:underline">
                        Saiba mais sobre a entrega
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between p-2 text-sm text-roxo-escuro">
              <div className="flex items-center gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify text-purple-700 iconify--ph"
                  width="24px"
                  height="24px"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M178 40c-20.65 0-38.73 8.88-50 23.89C116.73 48.88 98.65 40 78 40a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 228.66 240 172 240 102a62.07 62.07 0 0 0-62-62m-50 174.8c-18.26-10.64-96-59.11-96-112.8a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8"
                  ></path>
                </svg>
                <span className="hover:underline text-purple-700">
                  Adicionar aos favoritos
                </span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify text-purple-700 iconify--bi"
                  width="24px"
                  height="24px"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M13.5 1a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"
                  ></path>
                </svg>
                <span className="hover:underline text-purple-700">
                  Compartilhar
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4 border-b border-solid border-gray-300 pb-4">
              <span className="text-lg font-semibold">Descrição</span>
              <span className="">{produto.descricao}</span>
            </div>
            <div className="flex flex-col gap-8 border-b border-solid border-gray-300 pb-4">
              <span className="text-lg font-semibold">Detalhes</span>
              <div className="flex gap-6">
                <div className="flex-1 max-w-[170px] flex flex-col">
                  <span className="text-sm text-slate-500">Categoria</span>
                  <span className="cursor-pointer text-purple-700 text-roxo-escuro hover:underline">
                    {produto.subcategoria}
                  </span>
                </div>
                <div className="flex-1 max-w-[170px] flex flex-col">
                  <span className="text-sm text-slate-500">Condição</span>
                  <span className="text-black">{produto.condicaoProduto}</span>
                </div>
                <div className="flex-1 max-w-[170px] flex flex-col">
                  <span className="text-sm text-slate-500">Tipo</span>
                  <span className="text-black">{produto.tipoProduto}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 border-b border-solid border-gray-300 pb-4">
              <span className="text-lg font-semibold">Localização</span>
              <div className="flex gap-6">
                <div className="flex-1 max-w-[170px] flex flex-col">
                  <span className="text-sm text-slate-500">CEP</span>
                  <span className="text-black">{produto.cep}</span>
                </div>
                <div className="flex-1 max-w-[170px] flex flex-col">
                  <span className="text-sm text-slate-500">Município</span>
                  <span className="text-black">{produto.municipio}</span>
                </div>
                <div className="flex-1 max-w-[170px] flex flex-col">
                  <span className="text-sm text-slate-500">Bairro</span>
                  <span className="text-black">{produto.bairro}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="cursor-pointer font-bold hover:underline">
              Anunciante
            </span>
          </div>
          <div className="flex flex-col gap-4 rounded-md">
            <div className="flex flex-col gap-4 items-center text-slate-500 bg-zinc-100 p-4 rounded-md">
              <span className="text-black text-xl font-semibold">
                {produto.nomeVendedor}
              </span>
              <div className="flex gap-4 items-center text-slate-500">
                <div className="flex gap-2 text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--material-symbols"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--material-symbols"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--material-symbols"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--material-symbols"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--material-symbols"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
                    ></path>
                  </svg>
                </div>
                <span className="">
                  {produto.avaliacoesVendedor} avaliações
                </span>
              </div>
              <span className="">Na OLX desde junho de 2021</span>
              <div className="flex gap-2">
                <span className="font-semibold">Verificado com:</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="text-green-500 cursor-pointer iconify iconify--f7"
                  width="24px"
                  height="24px"
                  viewBox="0 0 56 56"
                >
                  <path
                    fill="currentColor"
                    d="M28 51.906c13.055 0 23.906-10.851 23.906-23.906c0-13.078-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.922 4.095 28c0 13.055 10.828 23.906 23.906 23.906m-6.117-18.07c-5.813-5.79-9.516-13.172-5.133-17.555c.258-.258.539-.515.797-.773c1.336-1.266 2.625-1.195 3.773.422l3.047 4.336c1.031 1.5.773 2.343-.328 3.515l-.961 1.055c-.351.328-.21.773-.047 1.055c.446.843 1.711 2.343 3.07 3.703c1.407 1.406 2.836 2.601 3.727 3.093c.328.188.797.235 1.102-.046l1.007-.961c1.125-1.102 2.04-1.383 3.493-.352a318.803 318.803 0 0 0 4.43 3.094c1.476 1.078 1.827 2.414.327 3.773c-.257.258-.492.54-.75.797c-4.382 4.36-11.742.656-17.554-5.156"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="text-green-500 cursor-pointer iconify iconify--pepicons-pop"
                  width="24px"
                  height="24px"
                  viewBox="0 0 26 26"
                >
                  <g fill="none">
                    <defs>
                      <mask id="iconifyReact138">
                        <path fill="#fff" d="M0 0h26v26H0z"></path>
                        <g fill="#000" fillRule="evenodd" clipRule="evenodd">
                          <path d="M20 6.5H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1m-13 11v-9h12v9z"></path>
                          <path d="m20.648 8.261l-7.045 6a1 1 0 0 1-1.301-.004l-6.955-6C4.645 7.652 5.073 6.5 6 6.5h14c.93 0 1.356 1.158.648 1.761M8.69 8.5l4.27 3.683L17.282 8.5z"></path>
                        </g>
                      </mask>
                    </defs>
                    <circle
                      cx="13"
                      cy="13"
                      r="13"
                      fill="currentColor"
                      mask="url(#iconifyReact138)"
                    ></circle>
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="text-green-500 cursor-pointer iconify iconify--entypo-social"
                  width="24px"
                  height="24px"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m2.274 6.634h-1.443c-.171 0-.361.225-.361.524V8.6h1.805l-.273 1.486H10.47v4.461H8.767v-4.461H7.222V8.6h1.545v-.874c0-1.254.87-2.273 2.064-2.273h1.443z"
                  ></path>
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--fe"
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m6 8l6 3l6-3l-6-3zm6.489-4.884l7.993 4.076c.486.248.661.81.391 1.257a.97.97 0 0 1-.39.359l-7.994 4.076a1.086 1.086 0 0 1-.978 0L3.518 8.808c-.486-.248-.661-.81-.391-1.257a.97.97 0 0 1 .39-.359l7.994-4.076c.304-.155.674-.155.978 0m0 13.766a1.07 1.07 0 0 1-.978 0l-7.993-4.147c-.486-.252-.661-.824-.391-1.278a.976.976 0 0 1 .39-.365a.818.818 0 0 1 .755 0l7.24 3.755c.303.158.673.158.977 0l7.239-3.755a.818.818 0 0 1 .754 0c.486.252.661.824.391 1.278a.976.976 0 0 1-.39.365zm0 4a1.07 1.07 0 0 1-.978 0l-7.993-4.147c-.486-.252-.661-.824-.391-1.278a.976.976 0 0 1 .39-.365a.818.818 0 0 1 .755 0l7.24 3.755c.303.158.673.158.977 0l7.239-3.755a.818.818 0 0 1 .754 0c.486.252.661.824.391 1.278a.976.976 0 0 1-.39.365z"
                  ></path>
                </svg>
                <span
                  className="cursor-pointer text-purple-700
                  hover:underline"
                >
                  Ver todos os anúncios
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center text-slate-500 bg-zinc-100 p-4 rounded-md">
              <span className="text-sm font-semibold">
                Histórico do vendedor
              </span>
              <div className="max-w-[270px] flex">
                <div className="flex flex-col gap-2 p-2">
                  <svg
                    width="65"
                    height="64"
                    viewBox="0 0 65 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.3334 58.3637C46.8936 58.3637 58.697 46.5603 58.697 32.0001C58.697 17.4399 46.8936 5.63647 32.3334 5.63647C17.7731 5.63647 5.96973 17.4399 5.96973 32.0001C5.96973 46.5603 17.7731 58.3637 32.3334 58.3637Z"
                      fill="#F0E6FF"
                    ></path>
                    <path
                      d="M26.4369 13.6538L16.4879 23.7107C16.051 24.1764 15.8367 24.8083 15.8944 25.4402L18.3922 52.2643C18.5076 53.4866 19.5792 54.3763 20.791 54.2682L30.9886 52.8119"
                      fill="#6E0AD6"
                    ></path>
                    <path
                      d="M26.4369 13.6538L16.4879 23.7107C16.051 24.1764 15.8367 24.8083 15.8944 25.4402L18.3922 52.2643C18.5076 53.4866 19.5792 54.3763 20.791 54.2682L30.9886 52.8119"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.552 25.806L27.0808 12.5187C27.6084 11.4378 28.8532 10.9139 29.9908 11.3047L43.9059 16.0609C44.5571 16.2854 45.0847 16.7843 45.3485 17.4245L56.4361 44.4897C56.9389 45.7203 56.3619 47.1339 55.1418 47.6411L44.9198 51.9066L34.6979 56.1722C33.4778 56.6794 32.0764 56.0974 31.5736 54.8668L20.486 27.8016C20.2222 27.153 20.2469 26.4296 20.552 25.806ZM30.6833 17.1585C32.1094 16.5598 33.7499 17.2416 34.3434 18.6884C34.9369 20.1352 34.2527 21.7899 32.8266 22.3803C31.4004 22.9789 29.76 22.2971 29.1664 20.8503C28.5729 19.4118 29.2489 17.7572 30.6833 17.1585Z"
                      fill="white"
                    ></path>
                    <path
                      d="M27.0808 12.5187L27.5296 12.7392L27.5302 12.738L27.0808 12.5187ZM20.552 25.806L20.1032 25.5855L20.1028 25.5863L20.552 25.806ZM29.9908 11.3047L29.8284 11.7776L29.8291 11.7779L29.9908 11.3047ZM43.9059 16.0609L44.0688 15.5882L44.0676 15.5878L43.9059 16.0609ZM45.3485 17.4245L45.8112 17.235L45.8108 17.2341L45.3485 17.4245ZM56.4361 44.4897L56.8989 44.3006L56.8987 44.3002L56.4361 44.4897ZM55.1418 47.6411L54.9499 47.1794L54.9493 47.1796L55.1418 47.6411ZM44.9198 51.9066L45.1124 52.3681L44.9198 51.9066ZM34.6979 56.1722L34.8898 56.6339L34.8904 56.6336L34.6979 56.1722ZM31.5736 54.8668L32.0364 54.6776L32.0362 54.6772L31.5736 54.8668ZM20.486 27.8016L20.0228 27.99L20.0233 27.9911L20.486 27.8016ZM34.3434 18.6884L34.806 18.4987V18.4987L34.3434 18.6884ZM30.6833 17.1585L30.8758 17.6199L30.8768 17.6195L30.6833 17.1585ZM32.8266 22.3803L32.6353 21.9183L32.633 21.9192L32.8266 22.3803ZM29.1664 20.8503L29.629 20.6605L29.6286 20.6596L29.1664 20.8503ZM26.6321 12.2982L20.1032 25.5855L21.0007 26.0265L27.5296 12.7392L26.6321 12.2982ZM30.1532 10.8319C28.7742 10.3581 27.2685 10.9943 26.6315 12.2994L27.5302 12.738C27.9483 11.8813 28.9322 11.4697 29.8284 11.7776L30.1532 10.8319ZM44.0676 15.5878L30.1525 10.8316L29.8291 11.7779L43.7442 16.534L44.0676 15.5878ZM45.8108 17.2341C45.4927 16.4621 44.8567 15.8598 44.0688 15.5882L43.7429 16.5336C44.2576 16.711 44.6767 17.1065 44.8862 17.615L45.8108 17.2341ZM56.8987 44.3002L45.8112 17.235L44.8858 17.6141L55.9734 44.6792L56.8987 44.3002ZM55.3338 48.1028C56.8124 47.4881 57.5038 45.781 56.8989 44.3006L55.9732 44.6788C56.374 45.6596 55.9114 46.7797 54.9499 47.1794L55.3338 48.1028ZM45.1124 52.3681L55.3344 48.1025L54.9493 47.1796L44.7273 51.4452L45.1124 52.3681ZM34.8904 56.6336L45.1124 52.3681L44.7273 51.4452L34.5053 55.7108L34.8904 56.6336ZM31.1107 55.0559C31.7182 56.5426 33.4131 57.2478 34.8898 56.6339L34.5059 55.7105C33.5426 56.111 32.4346 55.6521 32.0364 54.6776L31.1107 55.0559ZM20.0233 27.9911L31.1109 55.0563L32.0362 54.6772L20.9487 27.6121L20.0233 27.9911ZM20.1028 25.5863C19.735 26.3384 19.7057 27.2102 20.0228 27.99L20.9492 27.6132C20.7387 27.0958 20.7589 26.5209 21.0011 26.0257L20.1028 25.5863ZM34.806 18.4987C34.1082 16.7978 32.1748 15.9901 30.4897 16.6975L30.8768 17.6195C32.044 17.1295 33.3915 17.6855 33.8808 18.8782L34.806 18.4987ZM33.0178 22.8423C34.702 22.1451 35.5027 20.1969 34.806 18.4987L33.8808 18.8782C34.3712 20.0736 33.8034 21.4347 32.6353 21.9183L33.0178 22.8423ZM28.7039 21.0401C29.4016 22.741 31.335 23.5487 33.0201 22.8413L32.633 21.9192C31.4659 22.4092 30.1183 21.8533 29.629 20.6605L28.7039 21.0401ZM30.4907 16.6971C28.7997 17.4028 28.0067 19.3505 28.7042 21.041L29.6286 20.6596C29.1391 19.4732 29.698 18.1115 30.8758 17.6199L30.4907 16.6971Z"
                      fill="#4A4A4A"
                    ></path>
                    <path
                      d="M52.3725 46.7078C53.5926 46.2006 54.1696 44.7871 53.6668 43.5565L50.5712 36"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M49.1796 33.2L49.7531 34.6"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M34.3434 18.6886C33.7499 17.2418 32.1094 16.56 30.6833 17.1587C29.2489 17.7574 28.5729 19.412 29.1665 20.8505C29.76 22.2973 31.4005 22.9791 32.8266 22.3805C34.2527 21.7901 34.9369 20.1354 34.3434 18.6886Z"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M31.3262 18.4059C28.375 13.4834 20.7909 6.56538 18.5569 9.56708C16.9247 11.7622 20.8898 15.0383 24.8385 17.0838"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M37.9298 36.8692L40.0347 35.9159C40.8966 35.5255 41.8969 35.8983 42.2735 36.7501C42.6502 37.602 42.2582 38.6053 41.3964 38.9956L37.6091 40.7109C37.1947 40.8986 37.0034 41.3883 37.1845 41.7978C37.3656 42.2074 37.8538 42.3893 38.2682 42.2016L40.2488 41.3046L40.8971 42.7708C41.0782 43.1803 41.5664 43.3623 41.9808 43.1746C42.3951 42.9869 42.5864 42.4972 42.4054 42.0877L41.7571 40.6215L42.0638 40.4826C43.7543 39.717 44.5289 37.7342 43.7901 36.0633C43.0513 34.3923 41.0745 33.6557 39.3839 34.4214L37.2789 35.3747C36.4171 35.765 35.4167 35.3923 35.0401 34.5404C34.6635 33.6885 35.0554 32.6852 35.9173 32.2949L39.6383 30.6097C40.0526 30.422 40.2439 29.9323 40.0629 29.5228C39.8818 29.1132 39.3935 28.9313 38.9792 29.1189L37.0648 29.9859L36.4311 28.5525C36.25 28.143 35.7617 27.961 35.3474 28.1487C34.933 28.3364 34.7417 28.8261 34.9228 29.2356L35.5602 30.6772L35.2535 30.8161C33.5629 31.5818 32.7884 33.5645 33.5272 35.2354C34.2706 36.8944 36.2475 37.6311 37.9298 36.8692Z"
                      fill="#6E0AD6"
                    ></path>
                  </svg>
                  <div className="flex flex-col text-center">
                    <span className="font-semibold">
                      {produto.numeroVendas}
                    </span>
                    <span className="text-xs">Anúncios vendidos</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-2 border-gray-400 border-l border-r">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.9447 5.02519L58.3213 45.0326C60.2187 46.5929 60.5637 49.5888 59.0688 51.5861C58.3788 52.5223 57.4014 53.1464 56.309 53.3337L14.7395 59.9495C12.3821 60.324 10.1973 58.5764 9.85231 55.955C9.85231 55.955 9.85231 55.955 9.85231 55.8926L4.04522 9.33176C3.70025 6.77279 5.36763 4.40105 7.72496 4.02657C8.87488 3.90174 10.0248 4.21381 10.9447 5.02519Z"
                      fill="#DEF9CC"
                    ></path>
                    <path
                      d="M60.5298 38.716C60.5797 37.6484 60.5298 32.8928 57.0134 32.8928C56.7637 32.456 55.7648 30.2723 54.8658 28.4283C54.0667 26.6813 52.2688 25.5652 50.321 25.5652H42.8794V43.4231H60.1302C60.1302 43.4231 61.4787 42.5497 61.4787 41.5306C61.4787 40.5601 61.7284 39.0072 60.5298 38.716Z"
                      fill="white"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M57.0374 32.8928C60.5537 32.8928 60.4972 37.542 60.4472 38.6096H42.7969L42.9033 25.5652H50.3449C52.2927 25.5652 54.0907 26.6813 54.8898 28.4283C55.7888 30.2723 56.7876 32.456 57.0374 32.8928Z"
                      fill="#8CE563"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M52.9657 32.9879L51.4344 29.688C51.3387 29.4454 51.0994 29.2998 50.8123 29.2998H47.3667V34.0069H52.2958C52.8222 34.0069 53.205 33.4731 52.9657 32.9879Z"
                      fill="white"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M14.069 17H38.6576C41.4191 17 43.6576 19.2386 43.6576 22V40.3595H22.8288H14.069V17Z"
                      fill="white"
                    ></path>
                    <path
                      d="M15.2371 40.3594H43.6578V43.474H18.3517C16.6315 43.474 15.2371 42.0795 15.2371 40.3594Z"
                      fill="white"
                    ></path>
                    <path
                      d="M43.6576 40.5151L14.069 40.5151"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M14.069 24.571V17H39.8814C41.9846 17 43.6576 18.7096 43.6576 20.8588V43.4741H18.0503C16.2816 43.4741 15.6263 42.3614 15.6263 40.5541H14.069V34.975"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M26.6735 43.8876C26.6735 46.1841 24.8282 47.9999 22.5612 47.9999C20.2942 47.9999 18.449 46.1307 18.449 43.8876C18.449 41.6446 20.2942 39.7754 22.5612 39.7754C24.8809 39.7754 26.6735 41.5912 26.6735 43.8876Z"
                      fill="white"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M24.7755 43.8876C24.7755 45.1242 23.7819 46.1019 22.5612 46.1019C21.3405 46.1019 20.3469 45.0954 20.3469 43.8876C20.3469 42.6798 21.3405 41.6733 22.5612 41.6733C23.8103 41.6733 24.7755 42.6511 24.7755 43.8876Z"
                      fill="#8CE563"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M54.5101 43.8876C54.5101 46.1841 52.6649 47.9999 50.3979 47.9999C48.1309 47.9999 46.2856 46.1307 46.2856 43.8876C46.2856 41.6446 48.1309 39.7754 50.3979 39.7754C52.7176 39.7754 54.5101 41.5912 54.5101 43.8876Z"
                      fill="white"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M52.6124 43.8876C52.6124 45.1242 51.6188 46.1019 50.3981 46.1019C49.1774 46.1019 48.1838 45.0954 48.1838 43.8876C48.1838 42.6798 49.1774 41.6733 50.3981 41.6733C51.6472 41.6733 52.6124 42.6511 52.6124 43.8876Z"
                      fill="#8CE563"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M23.2957 32.6851H6.49792"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M14.069 27.1223V32.3782"
                      stroke="#4A4A4A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M33.4886 24.6411H11.1396"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M39.0398 17H11.1396"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.05415 17.1194H7.04858"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.96272 17.1194H2.9093"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.05342 32.6851H2"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.05415 24.6411H7.04858"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex flex-col text-center">
                    <span className="font-semibold">
                      {produto.tempoDespacho}
                    </span>
                    <span className="text-xs">Tempo médio de despacho</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <svg
                    width="65"
                    height="64"
                    viewBox="0 0 65 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49.722 59.9523L7.63441 53.0859C5.68891 52.762 4.39191 50.9482 4.71616 49.0049L11.5254 6.96457C11.8497 5.02126 13.6655 3.72572 15.611 4.0496L57.6986 10.916C59.6441 11.2399 60.9411 13.0536 60.6168 14.9969L53.8076 56.9725C53.5482 58.9158 51.6675 60.2761 49.722 59.9523Z"
                      fill="#FFF3E6"
                    ></path>
                    <g clipPath="url(#clip0_17870_136343)">
                      <rect
                        x="14.1665"
                        y="7.5"
                        width="36.3333"
                        height="48.3333"
                        rx="3.5"
                        fill="white"
                        stroke="#4A4A4A"
                      ></rect>
                      <rect
                        x="38.3333"
                        y="41.8"
                        width="5.33333"
                        height="1"
                        rx="0.5"
                        fill="#4A4A4A"
                      ></rect>
                      <rect
                        x="19.6665"
                        y="37.4666"
                        width="5.66667"
                        height="1"
                        rx="0.5"
                        fill="#4A4A4A"
                      ></rect>
                      <rect
                        x="19.6665"
                        y="33.1333"
                        width="16"
                        height="1"
                        rx="0.5"
                        fill="#4A4A4A"
                      ></rect>
                      <rect
                        x="38.3333"
                        y="33.1333"
                        width="5.33333"
                        height="1"
                        rx="0.5"
                        fill="#4A4A4A"
                      ></rect>
                      <rect
                        x="27.6665"
                        y="37.4666"
                        width="16"
                        height="1"
                        rx="0.5"
                        fill="#4A4A4A"
                      ></rect>
                      <rect
                        x="19.6665"
                        y="41.8"
                        width="16"
                        height="1"
                        rx="0.5"
                        fill="#4A4A4A"
                      ></rect>
                      <path
                        d="M19.6665 48.6334C19.6665 47.6209 20.4873 46.8 21.4998 46.8H31.1665C32.179 46.8 32.9998 47.6209 32.9998 48.6334C32.9998 49.6459 32.179 50.4667 31.1665 50.4667H21.4998C20.4873 50.4667 19.6665 49.6459 19.6665 48.6334Z"
                        fill="#F28000"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M28.3922 23.4511C28.3922 21.1317 26.512 19.2515 24.1926 19.2515C21.8732 19.2515 19.9929 21.1317 19.9929 23.4511C19.9929 25.7706 21.8732 27.6508 24.1926 27.6508C26.512 27.6508 28.3922 25.7706 28.3922 23.4511Z"
                        stroke="#F28000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M31.2078 23.2375L37.4418 17.7827"
                        stroke="#F28000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M37.6336 16.4343L29.2342 16.4343L24.1946 23.453L30.5048 23.5524"
                        stroke="#F28000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M30.8171 23.627L28.8599 14.6245"
                        stroke="#F28000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M43.9303 23.4524C43.9303 21.1329 42.0501 19.2527 39.7306 19.2527C37.4112 19.2527 35.531 21.1329 35.531 23.4524C35.531 25.7718 37.4112 27.652 39.7306 27.652C42.0501 27.652 43.9303 25.7718 43.9303 23.4524Z"
                        stroke="#F28000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M39.7318 23.4514C35.8419 16.8684 39.5927 12.0939 35.1042 13.2908"
                        stroke="#F28000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M27.625 14.5945L30.318 14.5945"
                        stroke="#F28000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                    <path
                      d="M48.6665 59C53.6371 59 57.6665 54.9706 57.6665 50C57.6665 45.0294 53.6371 41 48.6665 41C43.6959 41 39.6665 45.0294 39.6665 50C39.6665 54.9706 43.6959 59 48.6665 59Z"
                      fill="#F28000"
                      stroke="#4A4A4A"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M45.9507 47.2746C46.2447 46.9729 46.7214 46.9729 47.0154 47.2746L51.6995 52.0803C51.9935 52.382 51.9935 52.871 51.6995 53.1726C51.4055 53.4742 50.9288 53.4742 50.6349 53.1726L45.9507 48.3668C45.6567 48.0652 45.6567 47.5762 45.9507 47.2746Z"
                      fill="white"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M46.1641 53.1729C45.8701 52.8713 45.8701 52.3823 46.1641 52.0806L50.8483 47.2749C51.1422 46.9732 51.6189 46.9732 51.9129 47.2749C52.2069 47.5765 52.2069 48.0655 51.9129 48.3672L47.2288 53.1729C46.9348 53.4746 46.4581 53.4746 46.1641 53.1729Z"
                      fill="white"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M45.9507 47.2746C46.2447 46.9729 46.7214 46.9729 47.0154 47.2746L51.6995 52.0803C51.9935 52.382 51.9935 52.871 51.6995 53.1726C51.4055 53.4742 50.9288 53.4742 50.6349 53.1726L45.9507 48.3668C45.6567 48.0652 45.6567 47.5762 45.9507 47.2746Z"
                      stroke="white"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M46.1641 53.1729C45.8701 52.8713 45.8701 52.3823 46.1641 52.0806L50.8483 47.2749C51.1422 46.9732 51.6189 46.9732 51.9129 47.2749C52.2069 47.5765 52.2069 48.0655 51.9129 48.3672L47.2288 53.1729C46.9348 53.4746 46.4581 53.4746 46.1641 53.1729Z"
                      stroke="white"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                    ></path>
                    <defs>
                      <clipPath id="clip0_17870_136343">
                        <rect
                          width="37.3333"
                          height="49.3333"
                          fill="white"
                          transform="translate(13.6665 7)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="flex flex-col text-center">
                    <span className="font-semibold">
                      {produto.vendasCanceladas}
                    </span>
                    <span className="text-xs">Vendas canceladas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-zinc-100 rounded-md p-4  text-sm mb-4">
              <span className="text-black font-semibold mb-4">
                Formas de pagamento
              </span>
              <div className="flex gap-2 cursor-pointer">
                <div>
                  <img
                    className="w-[32px] h-full rounded-full"
                    src="/R.png"
                    alt="PIX"
                  />
                </div>
                <div>
                  <img
                    className="w-[32px] h-full rounded-full"
                    src="https://static-00.iconduck.com/assets.00/visa-icon-2048x1286-fhy0jwfc.png"
                    alt="Visa"
                  />
                </div>
                <div>
                  <img
                    className="w-[32px] h-full rounded-full"
                    src="https://static-00.iconduck.com/assets.00/mastercard-icon-1024x643-j3zb44jj.png"
                    alt="Mastercard"
                  />
                </div>
                <div>
                  <img
                    className="w-[32px] h-full rounded-full"
                    src="https://logopng.com.br/logos/elo-30.png"
                    alt="elo"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <span className="cursor-pointer text-purple-500 hover:underline">
                  Ver mais informações
                </span>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full fixed left-0 bottom-0">
          <div className="flex justify-center gap-2">
            <Link href={`/produto/compra/${produto._id}`}>
              <div className="flex gap-2 py-3 px-4 text-white cursor-pointer bg-orange-500 hover:bg-orange-600 duration-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--ph"
                  width="24px"
                  height="24px"
                  viewBox="0 0 256 256"
                >
                  <g fill="currentColor">
                    <path
                      d="m224 64l-12.16 66.86A16 16 0 0 1 196.1 144H70.55L56 64Z"
                      opacity=".2"
                    ></path>
                    <path d="M230.14 58.87A8 8 0 0 0 224 56H62.68L56.6 22.57A8 8 0 0 0 48.73 16H24a8 8 0 0 0 0 16h18l25.56 140.29a24 24 0 0 0 5.33 11.27a28 28 0 1 0 44.4 8.44h45.42a27.75 27.75 0 0 0-2.71 12a28 28 0 1 0 28-28H91.17a8 8 0 0 1-7.87-6.57L80.13 152h116a24 24 0 0 0 23.61-19.71l12.16-66.86a8 8 0 0 0-1.76-6.56M104 204a12 12 0 1 1-12-12a12 12 0 0 1 12 12m96 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12m4-74.57a8 8 0 0 1-7.9 6.57H77.22L65.59 72h148.82Z"></path>
                  </g>
                </svg>
                <span className="">Comprar</span>
              </div>
            </Link>
            {chatLink ? (
              <Link href={chatLink} target="_blank" rel="noopener noreferrer">
                <div className="flex gap-2 py-3 px-4 text-orange-500 cursor-pointer border border-orange-500 bg-orange-100 hover:bg-orange-200 duration-200 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
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
                  <span className="">Chat</span>
                </div>
              </Link>
            ) : null}
          </div>
          <div className="flex justify-center items-center bg-white h-10 mt-4">
            <span>{produto.nomeVendedor} (anunciante) </span>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProdutoPage;
