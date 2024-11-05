"use client";

import React, { useState } from "react";
import FinalizarCompra from "../FinalizarCompra";

type ModalProdutoProps = {
  onClose: () => void;
};

const ModalProduto = ({ onClose }: ModalProdutoProps) => {
  const [finalCompra, setFinalCompra] = useState(false);

  const handleFinalizarCompra = () => {
    setFinalCompra(true);
  };

  const handleCloseCompra = () => {
    setFinalCompra(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 overflow-y-auto text-black">
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
      <div className="flex flex-col gap-5 max-w-[576px] mx-auto mt-8 px-4 pb-4">
        <div className="flex flex-col gap-4 pb-5 border-b border-solid border-gray-300">
          <div className="">
            <h1 className="text-2xl">Confirme sua compra</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="mb-2">
                <h3 className="text-lg font-semibold">Entrega</h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2 cursor-pointer">
                  <div className=""></div>
                  <span className="text-lg text-gray-900">
                    Quero entrega pela OLX
                  </span>
                </div>
                <div className="flex items-start gap-2 cursor-pointer">
                  <div className=""></div>
                  <span className="text-lg text-gray-900">
                    Quero retirar com o vendedor (a combinar no chat com
                    vendedor)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Endereço de entrega</h3>
            </div>
            <div className="flex justify-between items-center p-4 border border-solid border-gray-300 rounded-md cursor-pointer">
              <div className="flex gap-4">
                <div className="w-8 h-8 flex justify-center items-center bg-roxo-claro rounded-full"></div>
                <div className="flex flex-col">
                  <span className="font-medium">Cadastre seu endereço</span>
                  <span className="text-sm text-gray-500">
                    Você não possui endereços
                  </span>
                </div>
              </div>
              <div className="py-2 p-4 rounded-full hover:bg-roxo-claro text-roxo-escuro">
                Cadastrar
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Opções de entrega</h3>
            </div>
            <div className="flex justify-between items-start p-4 border border-solid border-roxo-escuro rounded-md cursor-pointer text-roxo-escuro">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 cursor-pointer"></div>
                <div className="flex flex-col">
                  <span className="font-medium">Expressa</span>
                  <span className="text-sm">Até 24 horas</span>
                </div>
              </div>
              <div className="">Frete grátis</div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2">
              <h3 className="text-lg font-semibold">Forma de pagamento</h3>
            </div>
            <div className="flex justify-between items-start p-4 border border-solid border-roxo-escuro rounded-md cursor-pointer">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-[31px] p-2 border border-solid border-gray-400 rounded-full">
                    <img
                      className="w-full h-fullrounded-full"
                      src="https://geradornv.com.br/wp-content/themes/v1.34.1/assets/images/logos/pix/logo-pix-520x520.png"
                      alt="PIX"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Pix</span>
                  <span className="text-sm">
                    A confirmação do seu pagamento é mais rápida
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <span className="cursor-pointer text-roxo-escuro hover:underline">
                Gerenciar cartões
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex items-end gap-6">
            <div className="flex flex-col w-52">
              <label className="mb-2 font-medium">Cupom de desconto</label>
              <input
                id="cupom-1"
                placeholder="Digite o código"
                className="text py-3 px-4 outline-roxo-escuro border border-solid border-gray-300 rounded-md"
                type="text"
              />
            </div>
            <div>
              <div className="flex gap-2 py-2 px-6 text-orange-500 cursor-pointer border border-orange-500  hover:bg-orange-100 duration-200 rounded-full">
                Aplicar
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col pb-5 border-b border-solid border-gray-300">
              <div className="mb-2">
                <h3 className="text-lg font-semibold">Resumo</h3>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <div className="max-w-[96px] max-h-[72px]">
                    <img
                      src="blob:https://garantianacompra.online/1eb1510e-7f7c-4339-b54b-921884d4e87e"
                      className="w-full h-full rounded-lg"
                      draggable="false"
                      alt="Imagem do produto"
                    />
                  </div>
                  <span className="font-medium">Geladeira Brastemp Inox</span>
                </div>
                <div className="flex flex-col text-sm text-gray-500">
                  <span>Vendido por: João S****</span>
                  <span>CPF 012 *** *** 02</span>
                  <span className="p-4">
                    A garantia da OLX é cobrada para assegurar que o seu
                    dinheiro será reembolsado em caso de problemas.
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col  pb-5 border-b border-solid border-gray-300">
              <div className="flex justify-between font-medium">
                <span className="text-gray-500">Produto</span>
                <span className="">R$ 500,00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-gray-500">Entrega</span>
                <span className="">Frete grátis</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-gray-500">Garantia da OLX</span>
                <span className="">R$ 0,00</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span className="">Total a pagar</span>
              <span className="">R$ 500,00</span>
            </div>
          </div>
        </div>
        <button
          className="mt-2 py-4 px-5 text-center text-white font-medium cursor-pointer bg-orange-500 hover:bg-orange-600 duration-200 rounded-full"
          onClick={handleFinalizarCompra}
        >
          Confirmar pagamento
        </button>
        {finalCompra && <FinalizarCompra onClose={handleCloseCompra} />}
        <div className="text-center text-sm">
          <span className="text-gray-500">
            Ao confirmar o pagamento você declara que está concordando com os{" "}
          </span>
          <span className="text-roxo-escuro hover:underline">
            Termos e Condições de uso
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModalProduto;
