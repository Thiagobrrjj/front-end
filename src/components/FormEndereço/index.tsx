"use client";

import { useAddress } from "@/hooks/useAddress";
import axios from "axios";
import React, { FormEvent, useState } from "react";

interface FormEnderecoProps {
  onClose: () => void;
}

export interface FormAddress {
  cep?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  referencia?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}

const FormEndereco = ({ onClose }: FormEnderecoProps) => {
  const { address } = useAddress();
  const [formData, setFormData] = useState<FormAddress>({
    cep: address.cep,
    rua: address.rua,
    numero: address.numero,
    complemento: address.complemento,
    referencia: address.referencia,
    bairro: address.bairro,
    cidade: address.cidade,
    estado: address.estado,
  });
  const { saveAddress } = useAddress();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "cep" && value.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${value}/json/`,
        );
        setFormData((prevFormData) => ({
          ...prevFormData,
          rua: response.data.logradouro,
          bairro: response.data.bairro,
          cidade: response.data.localidade,
          estado: response.data.uf,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://apx-x.onrender.com/create/address",
        formData,
      );
      saveAddress(formData);
      console.log(response);
      onClose();
    } catch (err: unknown) {
      const knowError = err as Error;
      console.log(knowError.message);
    }
  };

  return (
    <div className=" fixed top-0 left-0 bg-white shadow-lg z-50 w-full h-full overflow-auto">
      <div className="p-4">
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
        <div className="flex flex-col gap-10">
          <div className="py-4 border-b border-solid border-gray-300">
            <span className="text-xl text-gray-600 font-semibold">
              Novo Endereço
            </span>
          </div>
          <div className="flex flex-col">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-600 font-semibold">
                  CEP *
                </label>
                <input
                  name="cep"
                  value={formData.cep}
                  onChange={handleInputChange}
                  className="text py-3 px-4 outline-roxo-escuro border border-solid border-gray-300 rounded-md"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-600 font-semibold">
                  Rua *
                </label>
                <input
                  name="rua"
                  value={formData.rua}
                  onChange={handleInputChange}
                  className="text py-3 px-4 outline-roxo-escuro border border-solid border-gray-300 rounded-md"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-600 font-semibold">
                  Bairro *
                </label>
                <input
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleInputChange}
                  className="text py-3 px-4 outline-roxo-escuro border border-solid border-gray-300 rounded-md"
                  type="text"
                />
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-600 font-semibold">
                    Cidade *
                  </label>
                  <input
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    className="text py-3 px-4 outline-roxo-escuro border border-solid border-gray-300 rounded-md"
                    type="text"
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label className="mb-2 text-gray-600 font-semibold">
                    Estado *
                  </label>
                  <input
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="text py-3 px-4 outline-roxo-escuro border border-solid border-gray-300 rounded-md"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-600 font-semibold">
                    Número *
                  </label>
                  <input
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    className="text py-3 px-4 outline-roxo-escuro border border-solid border-gray-300 rounded-md"
                    type="text"
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label className="mb-2 text-gray-600 font-semibold">
                    Complemento
                  </label>
                  <input
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleInputChange}
                    className="text py-3 px-4 outline-roxo-escuro border border-solid border-gray-300 rounded-md"
                    type="text"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label className="mb-2 text-gray-600 font-semibold">
                  Ponto de referência
                </label>
                <input
                  name="referencia"
                  value={formData.referencia}
                  onChange={handleInputChange}
                  className="text py-3 px-4 outline-roxo-escuro border border-solid border-gray-300 rounded-md"
                  type="text"
                />
              </div>
              <button
                type="submit"
                className="mt-4 py-2 px-6 text-center text-white font-medium cursor-pointer bg-orange-500 hover:bg-orange-600 duration-200 rounded-full"
              >
                Salvar endereço
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEndereco;
