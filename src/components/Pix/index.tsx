import React, { FormEvent, useState } from "react";

type PixFormProps = {
  onClose: () => void;
  onSave: (key: string) => Promise<void>;
};

const Pix = ({ onClose, onSave }: PixFormProps) => {
  const [valorPix, setValorPix] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValorPix(e.target.value);
  };

  const handlePixSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onSave(valorPix); // Chama a função onSave passada como prop
    } catch (error) {
      console.error("Erro ao salvar chave Pix:", error);
    }
    onClose();
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handlePixSubmit}>
        <input
          type="text"
          value={valorPix}
          onChange={handleInputChange}
          name="pixInput"
          placeholder="Digite os dados do Pix"
          className="border rounded-md px-2 py-2 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cadastrar Pix
        </button>
      </form>
    </div>
  );
};

export default Pix;
