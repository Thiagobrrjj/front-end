"use client";

import axios from "axios";
import React, { useState } from "react";

export type ProdutoFormProps = {
  onClose: () => void;
};

export interface FormValues {
  nome: string;
  codigo: string;
  preco: string;
  garantia: string;
  parcelas: string;
  descricao: string;
  nomeVendedor: string;
  sobrenomeVendedor: string;
  cpfVendedor: string;
  estrelasVendedor: string;
  avaliacoesVendedor: string;
  dataCadastro: string;
  numeroVendas: string;
  tempoDespacho: string;
  vendasCanceladas: string;
  categoria: string;
  subcategoria: string;
  condicaoProduto: string;
  tipoProduto: string;
  cep: string;
  estado: string;
  municipio: string;
  bairro: string;
  [key: string]: string;
}

const ProdutoForm = ({ onClose }: ProdutoFormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    nome: "",
    codigo: "",
    preco: "",
    garantia: "",
    parcelas: "",
    descricao: "",
    nomeVendedor: "",
    sobrenomeVendedor: "",
    cpfVendedor: "",
    estrelasVendedor: "",
    avaliacoesVendedor: "",
    dataCadastro: "",
    numeroVendas: "",
    tempoDespacho: "",
    vendasCanceladas: "",
    categoria: "",
    subcategoria: "",
    condicaoProduto: "",
    tipoProduto: "",
    cep: "",
    estado: "",
    municipio: "",
    bairro: "",
  });

  const [imagem, setImagem] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagem(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });
    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      const response = await axios.post(
        "https://apx-x.onrender.com/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white px-4 pt-60 md:p-4 relative w-screen h-screen flex flex-col justify-center items-center overflow-auto ">
        <h2 className="text-2xl font-semibold pb-0 md:pb-24">
          Formulário de Cadastro de Produto
        </h2>
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 absolute right-10 top-10"
          onClick={onClose}
        >
          Fechar
        </button>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Nome:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 focus:outline-none"
                type="text"
                name="nome"
                placeholder="Nome"
                value={formValues.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Código:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="codigo"
                placeholder="Código"
                value={formValues.codigo}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Preço:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="preco"
                placeholder="Preço"
                value={formValues.preco}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Garantia:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="garantia"
                placeholder="Garantia"
                value={formValues.garantia}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">
                Parcelas do produto, Ex: 10
              </label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="parcelas"
                placeholder="parcelas"
                value={formValues.parcelas}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Descrição:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="descricao"
                placeholder="Descrição"
                value={formValues.descricao}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Nome do Vendedor:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="nomeVendedor"
                placeholder="Nome do Vendedor"
                value={formValues.nomeVendedor}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">
                Sobrenome do Vendedor:
              </label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="sobrenomeVendedor"
                placeholder="Sobrenome do Vendedor"
                value={formValues.sobrenomeVendedor}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">CPF do Vendedor:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="cpfVendedor"
                placeholder="CPF do Vendedor"
                value={formValues.cpfVendedor}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">
                Estrelas do Vendedor:
              </label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="estrelasVendedor"
                placeholder="Estrelas do Vendedor"
                value={formValues.estrelasVendedor}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">
                Avaliações do Vendedor:
              </label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="avaliacoesVendedor"
                placeholder="Avaliações do Vendedor"
                value={formValues.avaliacoesVendedor}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Data de Cadastro:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="date"
                name="dataCadastro"
                placeholder="Data de Cadastro"
                value={formValues.dataCadastro}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Número de Vendas:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="numeroVendas"
                placeholder="Número de Vendas"
                value={formValues.numeroVendas}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Tempo de Despacho:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="tempoDespacho"
                placeholder="Tempo de Despacho"
                value={formValues.tempoDespacho}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Vendas Canceladas:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="vendasCanceladas"
                placeholder="Vendas Canceladas"
                value={formValues.vendasCanceladas}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Categoria:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="categoria"
                placeholder="Categoria"
                value={formValues.categoria}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Subcategoria:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="subcategoria"
                placeholder="Subcategoria"
                value={formValues.subcategoria}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">
                Condição do Produto:
              </label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="condicaoProduto"
                placeholder="Condição do Produto"
                value={formValues.condicaoProduto}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Tipo do Produto:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="tipoProduto"
                placeholder="Tipo do Produto"
                value={formValues.tipoProduto}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">CEP:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="cep"
                placeholder="CEP"
                value={formValues.cep}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Estado:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="estado"
                placeholder="Estado"
                value={formValues.estado}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Município:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="municipio"
                placeholder="Município"
                value={formValues.municipio}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base">Bairro:</label>
              <input
                className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
                type="text"
                name="bairro"
                placeholder="Bairro"
                value={formValues.bairro}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm md:text-base">Imagem:</label>
            <input
              className="border rounded-md px-1 py-1 md:px-2 md:py-2 text-sm md:text-base focus:outline-none"
              type="file"
              name="imagem"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="bg-[#DF7400] mb-12 text-white rounded-full w-full h-10 text-md my-4 hover:opacity-80 duration-500"
          >
            Criar Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProdutoForm;
