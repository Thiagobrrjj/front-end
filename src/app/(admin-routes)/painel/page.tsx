"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Pix from "@/components/Pix";
import ProdutoForm from "@/components/FormProduto";
import Products from "@/components/Produtos";
import axios from "axios";
import PaymentsCards from "@/components/PaymentsCards";
import LinkInput from "@/components/InputLink";

interface Key {
  _id: string;
  key: string;
}

const Painel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenPix, setModalOpenPix] = useState(false);
  const [chavePixCadastrada, setChavePixCadastrada] = useState<Key | null>(
    null,
  );
  const [chaves, setChaves] = useState<Key[]>([]);
  const [copiado, setCopiado] = useState(false);
  const [existingLink, setExistingLink] = useState<string | null>(null); // Estado para link existente

  // Função para salvar o link inserido
  const handleSaveLink = (link: string) => {
    console.log("Link salvo:", link);
    setExistingLink(null); // Limpa o link existente após salvar
  };

  const abrirModal = () => {
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
  };

  const abrirModalPix = () => {
    setModalOpenPix(true);
  };

  const fecharModalPix = () => {
    setModalOpenPix(false);
  };

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
    fetchKeys();
  }, []);

  const handleSavePix = async (key: string) => {
    try {
      const response = await axios.post(
        "https://apx-x.onrender.com/key/create",
        { key },
      );
      console.log("Resposta do servidor:", response.data);
      fetchKeys();
    } catch (error) {
      console.error("Erro ao salvar chave Pix:", error);
    }
  };

  const handleEditPix = async (newKey: string) => {
    if (chavePixCadastrada) {
      try {
        const response = await axios.put(
          `https://apx-x.onrender.com/key/${chavePixCadastrada._id}`,
          { key: newKey },
        );
        console.log("Resposta do servidor:", response.data);
        fetchKeys();
      } catch (error) {
        console.error("Erro ao editar chave Pix:", error);
      }
    }
  };

  const handleDeletePix = async () => {
    if (chavePixCadastrada) {
      try {
        await axios.delete(
          `https://apx-x.onrender.com/key/${chavePixCadastrada._id}`,
        );
        console.log("Chave Pix excluída com sucesso");
        setChavePixCadastrada(null);
        fetchKeys();
      } catch (error) {
        console.error("Erro ao excluir chave Pix:", error);
      }
    }
  };

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

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col items-center">
        <div className="self-start m-4">
          <h2 className="text-xl mb-4">Inserir Link:</h2>
          <LinkInput onSave={handleSaveLink} />{" "}
          <div className="mt-4">
            {!chavePixCadastrada ? (
              <button
                className="bg-[#DF7400] my-4 text-white px-6 py-2.5 rounded-full text-xs hover:bg-[rgba(223,115,0,0.85)] duration-300"
                onClick={abrirModalPix}
              >
                Cadastrar chave pix
              </button>
            ) : (
              <div className="flex flex-col gap-4 justify-star">
                <h1 className="text-xl pb-2">Chaves Pix:</h1>
                <div className="flex gap-4">
                  <p className="bg-[#D1D5DB] rounded-md px-2 py-2">
                    {chavePixCadastrada.key.length > 20
                      ? `${chavePixCadastrada.key.slice(0, 20)}...`
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
                  <div className="flex items-end gap-2">
                    <button
                      className="w-fit h-fit text-lg bg-orange-500 text-white rounded-md p-2 cursor-pointer"
                      onClick={() => {
                        const newKey =
                          prompt("Nova chave Pix:") || chavePixCadastrada.key;
                        handleEditPix(newKey);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="w-fit h-fit text-lg bg-red-500 text-white rounded-md p-2 cursor-pointer"
                      onClick={handleDeletePix}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            )}
            {modalOpenPix && (
              <Pix onClose={fecharModalPix} onSave={handleSavePix} />
            )}
            <div className="flex flex-col gap-4 justify-star">
              <h2 className="text-xl mt-4">Produtos:</h2>
              <button
                className="w-fit bg-blue-500 text-white rounded-md p-2 cursor-pointer"
                onClick={abrirModal}
              >
                Criar produto
              </button>
              {modalOpen && <ProdutoForm onClose={fecharModal} />}
            </div>
            <div className="flex justify-center items-center self-start">
              <Products />
            </div>
            <div>
              <PaymentsCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Painel;
