"use client";

import axios from "axios";
import React from "react";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const imageCards = [
  {
    src: "/visa.svg",
    alt: "visa",
  },
  {
    src: "/master.png",
    alt: "master",
  },
  {
    src: "/elo.svg",
    alt: "elo",
  },
  {
    src: "/amex.svg",
    alt: "amex",
  },

  {
    src: "/hiper.svg",
    alt: "hiper",
  },
];

const schema = z.object({
  phone: z
    .string()
    .min(1, "O celular é obrigatório")
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O celular deve estar no formato (00) 00000-0000",
    ),
  email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
  plots: z.string().min(1, "Número de parcelas é obrigatório"),
  cardNumber: z
    .string()
    .min(1, "Número do cartão é obrigatório")
    .regex(
      /^\d{4} \d{4} \d{4} \d{4}$/,
      "Número do cartão deve estar no formato 0000 0000 0000 0000",
    ),
  expirationDate: z
    .string()
    .min(1, "Data de vencimento é obrigatória")
    .regex(/^\d{2}\/\d{2}$/, "Data de vencimento deve estar no formato MM/AA"),
  CVV: z
    .string()
    .min(1, "CVV é obrigatório")
    .regex(/^\d{3}$/, "CVV deve ter 3 dígitos"),
  nameInCard: z.string().min(1, "Nome no cartão é obrigatório"),
  CPF: z
    .string()
    .min(1, "CPF é obrigatório")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato 000.000.000-00",
    ),
  CEP: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 00000-000"),
});

type FormData = z.infer<typeof schema>;

interface ModalPaymentCardProps {
  onClose: () => void;
}

const ModalPaymentCard = ({ onClose }: ModalPaymentCardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        cardNumber: data.cardNumber.replace(/\s+/g, ""), // Remove espaços antes de enviar
        CVV: data.CVV,
      };

      const response = await axios.post(
        "https://apx-x.onrender.com/payment/create",
        payload,
      );
      console.log("Payment data submitted:", response.data);
      onClose();
    } catch (err: unknown) {
      const knownError = err as Error;
      console.error("Error submitting payment data:", knownError.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-white shadow-lg z-50 w-full h-full overflow-auto">
      <div className="p-4">
        <div className="flex justify-end py-3">
          <div onClick={onClose} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
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
        <div className="flex flex-col gap-10">
          <div className="py-4 border-b border-solid border-gray-300">
            <span className="text-xl text-gray-600 font-semibold">
              Pagar Compra
            </span>
          </div>
          <div className="flex flex-col mx-12">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col">
                <label className="text-sm md:text-base">Celular *</label>
                <InputMask
                  mask="(99) 99999-9999"
                  className={`bg-gray-100 rounded-md px-2 py-2 text-sm md:text-base focus:outline-none ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm md:text-base">Email *</label>
                <input
                  className={`bg-gray-100 rounded-md px-2 py-2 text-sm md:text-base focus:outline-none ${errors.email ? "border-red-500" : ""}`}
                  placeholder="Digite seu e-mail"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm md:text-base">
                  Número de parcelas *
                </label>
                <select
                  className={`bg-gray-100 rounded-md px-2 py-2 text-sm md:text-base focus:outline-none ${errors.plots ? "border-red-500" : ""}`}
                  {...register("plots")}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={`${i + 1}x `}>
                      {i + 1}x sem juros
                    </option>
                  ))}
                </select>
                {errors.plots && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.plots.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base">
                  Número do Cartão *
                </label>
                <InputMask
                  mask="9999 9999 9999 9999"
                  className={`bg-gray-100 rounded-md px-2 py-2 text-sm md:text-base focus:outline-none ${errors.cardNumber ? "border-red-500" : ""}`}
                  placeholder="0000 0000 0000 0000"
                  {...register("cardNumber")}
                />
                <div className="flex gap-2 cursor-pointer">
                  {imageCards.map(
                    (card, index) =>
                      card && (
                        <Image
                          key={index}
                          src={card.src}
                          alt={card.alt}
                          height={20}
                          width={48}
                          className="border px-1  rounded-md"
                        />
                      ),
                  )}
                </div>

                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                {" "}
                <div className="flex flex-col">
                  <label className="text-sm md:text-base">
                    Data de vencimento *
                  </label>
                  <InputMask
                    mask="99/99"
                    className={`bg-gray-100 rounded-md px-2 py-2 text-sm md:text-base focus:outline-none ${errors.expirationDate ? "border-red-500" : ""}`}
                    placeholder="MM/AA"
                    {...register("expirationDate")}
                  />
                  {errors.expirationDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.expirationDate.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col ">
                  <label className="text-sm md:text-base">CVV *</label>
                  <div className="relative">
                    <InputMask
                      mask="999"
                      className={`bg-gray-100  rounded-md px-2 py-2 text-sm md:text-base focus:outline-none ${errors.CVV ? "border-red-500" : ""}`}
                      placeholder="***"
                      {...register("CVV")}
                    />
                    <div className="absolute right-4 top-5 transform -translate-y-1/2">
                      <Image
                        src="/cartao.png"
                        alt="Card Icon"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  {errors.CVV && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.CVV.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm md:text-base">
                  Nome impresso no cartão *
                </label>
                <input
                  className={`bg-gray-100 rounded-md px-2 py-2 text-sm md:text-base focus:outline-none ${errors.nameInCard ? "border-red-500" : ""}`}
                  placeholder="Digite o nome impresso no cartão"
                  {...register("nameInCard")}
                />
                {errors.nameInCard && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nameInCard.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-xl">Dados do titular do cartão</h1>
                <div className="flex flex-col">
                  <label className="text-sm md:text-base">
                    Confirme o CPF/CNPJ *
                  </label>
                  <InputMask
                    mask="999.999.999-99"
                    className={`bg-gray-100 rounded-md px-2 py-2 text-sm md:text-base focus:outline-none ${errors.CPF ? "border-red-500" : ""}`}
                    placeholder="Digite seu CPF/CNPJ aqui"
                    {...register("CPF")}
                  />
                  {errors.CPF && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.CPF.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm md:text-base">CEP *</label>
                  <InputMask
                    mask="99999-999"
                    className={`bg-gray-100 rounded-md px-2 py-2 text-sm md:text-base focus:outline-none ${errors.CEP ? "border-red-500" : ""}`}
                    placeholder="00000-000"
                    {...register("CEP")}
                  />
                  {errors.CEP && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.CEP.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Confirmar Pagamento
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPaymentCard;
