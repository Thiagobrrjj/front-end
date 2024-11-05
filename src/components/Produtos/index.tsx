"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export interface Produto {
  _id: string;
  nome: string;
  codigo: string;
  preco: number;
  garantia: string;
  parcelas: string;
  descricao: string;
  nomeVendedor: string;
  sobrenomeVendedor: string;
  cpfVendedor: string;
  estrelasVendedor: number;
  avaliacoesVendedor: number;
  dataCadastro: string;
  numeroVendas: number;
  tempoDespacho: string;
  vendasCanceladas: number;
  categoria: string;
  subcategoria: string;
  condicaoProduto: string;
  tipoProduto: string;
  cep: string;
  estado: string;
  municipio: string;
  bairro: string;
  imagem?: string;
  created_at: string;
  updated_at: string;
}

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null,
  );

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get<Produto[]>(
          "https://apx-x.onrender.com/products",
        );
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const handleEditar = (produto: Produto) => {
    setProdutoSelecionado(produto);
  };

  const handleExcluir = async (produto: Produto) => {
    try {
      await axios.delete(`https://apx-x.onrender.com/product/${produto._id}`);
      const updatedProdutos = produtos.filter((p) => p._id !== produto._id);
      setProdutos(updatedProdutos);
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const handleSubmit = async (produtoEditado: Produto, image: File | null) => {
    try {
      const formData = new FormData();
      Object.entries(produtoEditado).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (image) {
        produtoEditado.imagem = undefined;
        formData.append("imagem", image);
      }

      const response = await axios.put(
        `https://apx-x.onrender.com/product/${produtoEditado._id}`,
        formData,
      );
      console.log("Produto atualizado:", response.data);
      const updatedProdutos = produtos.map((p) =>
        p._id === produtoEditado._id ? response.data : p,
      );
      setProdutos(updatedProdutos);
      setProdutoSelecionado(null);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {produtos.map((produto) => (
          <div
            key={produto._id}
            className="flex flex-col gap-2 bg-zinc-200  dark:bg-opacity-50 rounded-md p-4 text-center transform hover:scale-105 transition-all duration-500"
          >
            <Link target="_blank" href={`/produto/${produto._id}`}>
              <div>
                <div className="cursor-pointer flex items-center justify-center max-h-52">
                  {produto.imagem && (
                    <img
                      className="w-full h-full  max-w-32 rounded-md"
                      draggable="false"
                      src={`https://apx-x.onrender.com${produto.imagem.replace(/\\/g, "/")}`}
                      alt="Imagem do produto"
                    />
                  )}
                </div>
                <div>
                  <span className="block text-left text-base text-black font-bold truncate">
                    {produto.nome}
                  </span>
                </div>
                <div>
                  <span className="block text-left text-base text-black font-medium truncate">
                    Preço: {produto.preco}
                  </span>
                </div>
                <div>
                  <span className="text-black text-base block text-left font-medium truncate">
                    Criado em:
                    {new Date(produto.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="block text-left text-base text-black font-medium truncate">
                    Parcelamento em até {produto.parcelas}x
                  </span>
                </div>
              </div>
            </Link>
            <div className="grid grid-cols-2 text-white gap-5">
              <button
                className="block col-span-1 text-base font-medium bg-yellow-500 cursor-pointer rounded-md p-1"
                onClick={() => handleEditar(produto)}
              >
                Editar
              </button>
              <button
                className="block col-span-1 text-base font-medium bg-red-500 cursor-pointer rounded-md p-1"
                onClick={() => handleExcluir(produto)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
      {produtoSelecionado && (
        <FormularioEdicaoProduto
          produto={produtoSelecionado}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

interface FormularioEdicaoProdutoProps {
  produto: Produto;
  onSubmit: (produto: Produto, image: File | null) => void;
}

const FormularioEdicaoProduto: React.FC<FormularioEdicaoProdutoProps> = ({
  produto,
  onSubmit,
}) => {
  const [produtoEditado, setProdutoEditado] = useState(produto);
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    setProdutoEditado(produto);
  }, [produto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProdutoEditado({
      ...produtoEditado,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagem(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(produtoEditado, imagem);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 relative w-screen h-screen flex flex-col justify-center items-center">
        <h2 className="py-12 text-2xl font-bold">Editar produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label>Nome:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="nome"
                placeholder="Nome"
                value={produtoEditado.nome}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Código:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="codigo"
                placeholder="Código"
                value={produtoEditado.codigo}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Preço:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="preco"
                placeholder="Preço"
                value={produtoEditado.preco}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Garantia:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="garantia"
                placeholder="Garantia"
                value={produtoEditado.garantia}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Parcelas do produto, Ex: 10</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="parcelas"
                placeholder="parcelas"
                value={produtoEditado.parcelas}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Descrição:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="descricao"
                placeholder="Descrição"
                value={produtoEditado.descricao}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Nome do Vendedor:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="nomeVendedor"
                placeholder="Nome do Vendedor"
                value={produtoEditado.nomeVendedor}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Sobrenome do Vendedor:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="sobrenomeVendedor"
                placeholder="Sobrenome do Vendedor"
                value={produtoEditado.sobrenomeVendedor}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>CPF do Vendedor:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="cpfVendedor"
                placeholder="CPF do Vendedor"
                value={produtoEditado.cpfVendedor}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Estrelas do Vendedor:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="estrelasVendedor"
                placeholder="Estrelas do Vendedor"
                value={produtoEditado.estrelasVendedor}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Avaliações do Vendedor:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="avaliacoesVendedor"
                placeholder="Avaliações do Vendedor"
                value={produtoEditado.avaliacoesVendedor}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Data de Cadastro:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="date"
                name="dataCadastro"
                placeholder="Data de Cadastro"
                value={produtoEditado.dataCadastro}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Número de Vendas:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="numeroVendas"
                placeholder="Número de Vendas"
                value={produtoEditado.numeroVendas}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Tempo de Despacho:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="tempoDespacho"
                placeholder="Tempo de Despacho"
                value={produtoEditado.tempoDespacho}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Vendas Canceladas:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="vendasCanceladas"
                placeholder="Vendas Canceladas"
                value={produtoEditado.vendasCanceladas}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Categoria:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="categoria"
                placeholder="Categoria"
                value={produtoEditado.categoria}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Subcategoria:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="subcategoria"
                placeholder="Subcategoria"
                value={produtoEditado.subcategoria}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Condição do Produto:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="condicaoProduto"
                placeholder="Condição do Produto"
                value={produtoEditado.condicaoProduto}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Tipo do Produto:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="tipoProduto"
                placeholder="Tipo do Produto"
                value={produtoEditado.tipoProduto}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>CEP:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="cep"
                placeholder="CEP"
                value={produtoEditado.cep}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Estado:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="estado"
                placeholder="Estado"
                value={produtoEditado.estado}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Município:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="municipio"
                placeholder="Município"
                value={produtoEditado.municipio}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Bairro:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="text"
                name="bairro"
                placeholder="Bairro"
                value={produtoEditado.bairro}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Imagem:</label>
              <input
                className="border rounded-md px-2 py-2 focus:outline-none"
                type="file"
                name="imagem"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#DF7400] text-white rounded-full w-full h-10 text-md my-4 hover:opacity-80 duration-500"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListaProdutos;
