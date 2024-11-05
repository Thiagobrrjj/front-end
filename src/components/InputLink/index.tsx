"use client";

import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface LinkInputProps {
  onSave: (link: string) => void;
}

const LinkInput = ({ onSave }: LinkInputProps) => {
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [existingLinkData, setExistingLinkData] = useState<string | null>(null);

  useEffect(() => {
    fetchLink();
  }, []);

  const fetchLink = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://apx-x.onrender.com/url");
      const linkData = response.data;
      setExistingLinkData(linkData.url || null);
      setLink(linkData.url || "");
    } catch (error) {
      console.error("Erro ao buscar o link:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (link.trim()) {
      setLoading(true);
      try {
        if (existingLinkData) {
          // Atualiza a URL existente
          await axios.put("https://apx-x.onrender.com/url", {
            newUrl: link,
          });
          console.log("Link atualizado com sucesso");
        } else {
          // Cria um novo link
          await axios.post("https://apx-x.onrender.com/url", {
            url: link,
          });
          console.log("Link criado com sucesso");
        }
        onSave(link);
        fetchLink(); // Recarrega o link atualizado
        setLink(""); // Limpa o campo de entrada
      } catch (error) {
        console.error("Erro ao salvar o link:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (existingLinkData) {
      setLoading(true);
      try {
        await axios.delete("https://apx-x.onrender.com/url");
        console.log("Link excluído com sucesso");
        setExistingLinkData(null);
        setLink("");
        onSave("");
        fetchLink(); // Recarrega após a exclusão
      } catch (error) {
        console.error("Erro ao excluir o link:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-start gap-2">
      <form onSubmit={handleSubmit} className="flex  items-start gap-2">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border w-full py-2 px-3 rounded bg-gray-300"
          placeholder="Insira a URL"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-2 py-2 rounded"
          disabled={loading}
        >
          {existingLinkData ? "Editar" : "Salvar"}
        </button>
      </form>
      {existingLinkData && (
        <button
          className="bg-red-500 text-white px-2 py-2 rounded "
          onClick={handleDelete}
          disabled={loading}
        >
          Excluir
        </button>
      )}
    </div>
  );
};

export default LinkInput;
