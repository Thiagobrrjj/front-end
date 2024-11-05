"use client";
import FinalizarCompra from "@/components/FinalizarCompra";
import FormEndereco from "@/components/FormEndereço";
import { Produto } from "@/components/Produtos";
import { useAddress } from "@/hooks/useAddress";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import ModalPaymentCard from "@/components/ModalPaymentCard";
import FinalCard from "@/components/ModalCardPaymentFinish";

type PaymentOption = "pix" | "cartao";

const ModalProduto = () => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [finalizarCompra, setFinalizarCompra] = useState(false);
  const [checkedDelivery, setCheckedDelivery] = useState(true);
  const [openCardPaymentFinish, setOpenCardPaymentFinish] = useState(false);
  const [checkedPickup, setCheckedPickup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption | null>(
    null,
  );
  const { address, resetAddress } = useAddress();

  const handleSelectOption = (option: PaymentOption) => {
    setSelectedPayment(option);
    if (option === "cartao") {
      setShowPaymentModal(true);
    }
  };

  const handleOpenCardFinish = () => {
    setOpenCardPaymentFinish(true);
  };

  const handleCloseCardFinish = () => {
    setOpenCardPaymentFinish(false);
  };

  const handleOpenCompra = () => {
    setFinalizarCompra(true);
  };

  const handleCloseCompra = () => {
    setFinalizarCompra(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowPaymentModal(false);
  };

  const handleDeliveryChange = () => {
    setCheckedDelivery(!checkedDelivery);
    if (!checkedDelivery) {
      setCheckedPickup(false);
    }
  };

  const handlePickupChange = () => {
    setCheckedPickup(!checkedPickup);
    if (!checkedPickup) {
      setCheckedDelivery(false);
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

  if (!produto) {
    return;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 overflow-y-auto text-black">
      <div className="w-full bg-white flex justify-between p-6 border-b border-solid border-gray-300">
        <div className="flex items-center gap-4">
          <Link href={`/produto/${produto._id}`}>
            <div>
              <Image
                src="/arrowleft.svg"
                alt="arrow back"
                height={30}
                width={30}
              />
            </div>
          </Link>
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
                <div className="flex items-center cursor-pointer">
                  <div className="flex items-center justify-center">
                    <label
                      className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor="customStyle"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-black bg-transparent transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#6E0AD6] checked:bg-transparent checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                        id="customStyle"
                        checked={checkedDelivery}
                        onChange={handleDeliveryChange}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          role="img"
                          className="text-[#6E0AD6] iconify iconify--fluent"
                          width="24px"
                          height="24px"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="M10 15a5 5 0 1 0 0-10a5 5 0 0 0 0 10m0-13a8 8 0 1 0 0 16a8 8 0 0 0 0-16m-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                  <span className="text-lg text-gray-900">
                    Quero entrega pela OLX
                  </span>
                </div>
                <div className="flex items-start cursor-pointer">
                  <div className="flex items-center justify-center">
                    <label
                      className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor="customStyle"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-black bg-transparent transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#6E0AD6] checked:bg-transparent checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                        id="customStyle"
                        checked={checkedPickup}
                        onChange={handlePickupChange}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          role="img"
                          className="text-[#6E0AD6] iconify iconify--fluent"
                          width="24px"
                          height="24px"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="M10 15a5 5 0 1 0 0-10a5 5 0 0 0 0 10m0-13a8 8 0 1 0 0 16a8 8 0 0 0 0-16m-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                  <span className="text-lg text-gray-900">
                    Quero retirar com o vendedor (a combinar no chat com
                    vendedor)
                  </span>
                </div>
              </div>
            </div>
          </div>
          {checkedDelivery && (
            <>
              {Object.keys(address).length ? (
                <div className="flex justify-between items-center p-4 border border-solid border-gray-300 rounded-md cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-[#F0E6FF] flex justify-center items-center bg-roxo-claro rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="text-purple-700 "
                        width="16px"
                        height="16px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 17v-5.548c0-.534 0-.801-.065-1.05a1.998 1.998 0 0 0-.28-.617c-.145-.213-.345-.39-.748-.741l-4.8-4.2c-.746-.653-1.12-.98-1.54-1.104c-.37-.11-.764-.11-1.135 0c-.42.124-.792.45-1.538 1.102L5.093 9.044c-.402.352-.603.528-.747.74a2 2 0 0 0-.281.618C4 10.65 4 10.918 4 11.452V17c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.082 1.083C5.602 20 6.068 20 7 20s1.398 0 1.766-.152a2 2 0 0 0 1.082-1.083C10 18.398 10 17.932 10 17v-1a2 2 0 1 1 4 0v1c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.082 1.083C15.602 20 16.068 20 17 20s1.398 0 1.766-.152a2 2 0 0 0 1.082-1.083C20 18.398 20 17.932 20 17"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {address.bairro} {address.numero}
                      </span>
                      <span className="text-sm text-gray-500">
                        {address.cidade}, {address.estado}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleOpenModal}
                    className="py-2 p-4 rounded-full hover:bg-[#F0E6FF] text-purple-700"
                  >
                    Trocar
                  </button>
                  {showModal && <FormEndereco onClose={handleCloseModal} />}
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold">
                      Endereço de entrega
                    </h3>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-solid border-gray-300 rounded-md cursor-pointer">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-[31px] p-2 bg-[#F0E6FF] rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="text-orange-500 iconify iconify--solar"
                            width="16px"
                            height="16px"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path
                                stroke="currentColor"
                                strokeWidth="1.5"
                                d="M5.312 10.762C8.23 5.587 9.689 3 12 3c2.31 0 3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022z"
                              ></path>
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="M12 8v5"
                              ></path>
                              <circle
                                cx="12"
                                cy="16"
                                r="1"
                                fill="currentColor"
                              ></circle>
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          Cadastre seu endereço
                        </span>
                        <span className="text-sm text-gray-500">
                          Você não possui endereços
                        </span>
                      </div>
                    </div>
                    <div className="py-2 p-4 rounded-full text-purple-700 hover:bg-[#F0E6FF]">
                      <button onClick={handleOpenModal}>Cadastrar</button>
                    </div>
                    {showModal && <FormEndereco onClose={handleCloseModal} />}
                  </div>
                </div>
              )}

              <div className="flex flex-col">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">Opções de entrega</h3>
                </div>
                <div className="flex justify-between items-start p-4 border border-solid border-[#6E0AD6] rounded-md cursor-pointer ">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          role="img"
                          className="text-[#6E0AD6] iconify iconify--fluent"
                          width="24px"
                          height="24px"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="M10 15a5 5 0 1 0 0-10a5 5 0 0 0 0 10m0-13a8 8 0 1 0 0 16a8 8 0 0 0 0-16m-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-[#6E0AD6]">
                        Expressa
                      </span>
                      <span className="text-sm text-[#6E0AD6]">
                        Até 5 Horas após o pagamento
                      </span>
                    </div>
                  </div>
                  <div className="text-[#6E0AD6]">Frete grátis</div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-4">
            <div
              className={`flex justify-between items-start p-4 border border-solid rounded-md cursor-pointer ${
                selectedPayment === "pix"
                  ? "border-[#6E0AD6]"
                  : "border-gray-300"
              }`}
              onClick={() => handleSelectOption("pix")}
            >
              <div className="flex gap-4">
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-[31px] p-2 border border-solid border-gray-400 rounded-full">
                    <Image
                      className="w-full h-full rounded-full"
                      src="/R.png"
                      alt="PIX"
                      height={100}
                      width={100}
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

            <div
              className={`flex justify-between items-start p-4 border border-solid rounded-md cursor-pointer ${
                selectedPayment === "cartao"
                  ? "border-[#6E0AD6]"
                  : "border-gray-300"
              }`}
              onClick={() => handleSelectOption("cartao")}
            >
              <div className="flex gap-4">
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-[31px] p-2 border border-solid border-gray-400 rounded-full">
                    <Image
                      className="w-full h-full rounded-full"
                      src="/cartao.png"
                      alt="Cartão"
                      height={100}
                      width={100}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Cartão</span>
                  <span className="text-sm">Pague usando o seu cartão</span>
                </div>
              </div>
            </div>
            {showPaymentModal && (
              <ModalPaymentCard onClose={handleCloseModal} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex items-end gap-6">
            <div className="flex flex-col w-52">
              <label className="mb-2 font-medium">Cupom de desconto</label>
              <input
                id="cupom-1"
                placeholder="Digite o código"
                className="text py-3 px-4 outline-[#6E0AD6] border border-solid border-gray-300 rounded-md"
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
                    {produto.imagem && (
                      <img
                        src={`https://apx-x.onrender.com${produto.imagem.replace(/\\/g, "/")}`}
                        alt={produto.nome}
                        className="w-full h-full rounded-lg"
                        draggable="false"
                      />
                    )}
                  </div>
                  <span className="font-medium">{produto.nome}</span>
                </div>
                <div className="flex flex-col text-sm text-gray-500">
                  <span>Vendido por: {produto.nomeVendedor}</span>
                  <span>CPF {produto.cpfVendedor}</span>
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
        </div>
        {selectedPayment === "cartao" ? (
          <button
            onClick={handleOpenCardFinish}
            className="mt-2 py-4 px-5 text-center text-white font-medium cursor-pointer bg-orange-500 hover:bg-orange-600 duration-200 rounded-full"
          >
            Confirmar pagamento
          </button>
        ) : (
          <button
            onClick={handleOpenCompra}
            className="mt-2 py-4 px-5 text-center text-white font-medium cursor-pointer bg-orange-500 hover:bg-orange-600 duration-200 rounded-full"
          >
            Confirmar pagamento
          </button>
        )}

        {openCardPaymentFinish && <FinalCard onClose={handleCloseCardFinish} />}

        {finalizarCompra && <FinalizarCompra onClose={handleCloseCompra} />}
        <div className="text-center text-sm">
          <span className="text-gray-500">
            Ao confirmar o pagamento você declara que está concordando com os{" "}
          </span>
          <span className="text-[#6E0AD6] hover:underline">
            Termos e Condições de uso
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModalProduto;
