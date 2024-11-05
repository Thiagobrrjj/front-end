"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Produto } from "../Produtos";
import { validate } from "cpf-check";
import InputMask from "react-input-mask";
import FinalPix from "../FinalPix";

interface FinalizarCompraProps {
  onClose: () => void;
}

const FinalizarCompra = ({ onClose }: FinalizarCompraProps) => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [cpfValido, setCpfValido] = useState(true);
  const [finalPix, setFinalPix] = useState(false);

  const handleOpenCompra = () => {
    setFinalPix(true);
  };

  const handleCloseCompra = () => {
    setFinalPix(false);
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

  const handleFinalizar = () => {
    const cpfInput = document.getElementById(
      "cpf-pagamento",
    ) as HTMLInputElement;
    if (!cpfInput) {
      return;
    }
    const cpf = cpfInput.value.replace(/[^\d]/g, "");

    if (validate(cpf)) {
      setCpfValido(true);
      handleOpenCompra();
    } else {
      setCpfValido(false);
      cpfInput.focus();
    }
  };

  const handleCpfBlur = () => {
    const cpfInput = document.getElementById(
      "cpf-pagamento",
    ) as HTMLInputElement;
    const cpf = cpfInput.value.replace(/[^\d]/g, "");

    if (cpf && !validate(cpf)) {
      setCpfValido(false);
    }
  };

  if (!produto) {
    return;
  }

  return (
    <div className="fixed top-0 left-0 text-black bg-white shadow-lg z-50 w-full h-full">
      <div className=" max-h-[100vh] overflow-y-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-end py-3">
          <div onClick={onClose}>
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
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1  pb-4 border-b border-solid border-gray-300">
              <h3 className="text-lg font-semibold self-start">
                Finalize a compra
              </h3>
              <span className="text-lg text-gray-500 self-start">
                Revise e preencha seus dados a seguir para finalizar a compra
                com segurança.
              </span>
            </div>
            <div className="flex flex-col gap-2 pb-4 border-b border-solid border-gray-300">
              <div className="flex gap-4">
                <div className="max-w-[96px] max-h-[72px]">
                  {produto.imagem && (
                    <img
                      src={`https://apx-x.onrender.com${produto.imagem.replace(/\\/g, "/")}`}
                      className="w-full h-full rounded-lg"
                      draggable="false"
                      alt="Imagem do produto"
                    />
                  )}
                </div>
                <span className="font-medium ">{produto.nome}</span>
              </div>
              <div className="flex flex-col text-sm text-gray-500 ">
                <span className="self-start">
                  Vendido por: {produto.nomeVendedor}
                </span>
                <span className="self-start">{produto.cpfVendedor}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-4 border-b border-solid border-gray-300">
            <div className="flex flex-col pb-5 border-b border-solid border-gray-300">
              <div className="flex justify-between font-medium">
                <span className="text-gray-500">Produto</span>
                <span className="">R$ {produto.preco}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-gray-500">Entrega</span>
                <span className="">Frete grátis</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-gray-500">Garantia da OLX</span>
                <span className="">R$ {produto.garantia}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span className="">Total a pagar</span>
              <span className="">R$ {produto.preco}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-semibold self-start">
                Nome Completo *
              </label>
              <input
                id="nomeCompleto-pagamento"
                placeholder="Preencha o nome conforme seu RG"
                className="text py-3 px-4 outline-purple-700 border border-solid border-gray-300 rounded-md"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-semibold self-start">
                CPF *
              </label>
              <InputMask
                required
                type="text"
                id="cpf-pagamento"
                name="cpf-pagamento"
                className={`text py-3 px-4 outline-purple-700 border border-solid rounded-md ${
                  !cpfValido ? "border-red-500" : "border-gray-300"
                }`}
                onChange={() => setCpfValido(true)}
                onBlur={handleCpfBlur}
                mask={"999.999.999-99"}
                placeholder="999.999.999-99"
              />
              {!cpfValido && (
                <p className="text-red-500 text-sm self-start">
                  CPF inválido. Por favor, verifique o número digitado.
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-4">
            <span
              className="text-purple-700 hover:underline py-2 px-6 cursor-pointer"
              onClick={onClose}
            >
              Voltar
            </span>
            <button
              className="bg-orange-500 hover:bg-orange-600 duration-200 rounded-full py-2 px-6 text-white text-lg text-center font-medium cursor-pointer"
              onClick={handleFinalizar}
            >
              Finalizar
            </button>
            {finalPix && <FinalPix onClose={handleCloseCompra} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizarCompra;
