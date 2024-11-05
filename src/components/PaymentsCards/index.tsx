import axios from "axios";
import { useEffect, useState } from "react";

export interface PaymentCard {
  phone: string;
  email: string;
  plots: string;
  cardNumber: number;
  expirationDate: string;
  CVV: number;
  nameInCard: string;
  CPF: string;
  CEP: string;
  _id: string; // Supondo que cada cartão tenha um ID único
}

const PaymentsCards = () => {
  const [cards, setCards] = useState<PaymentCard[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get<PaymentCard[]>(
          "https://apx-x.onrender.com/payments",
        );
        setCards(response.data);
      } catch (error) {
        console.error("Erro ao buscar cartões:", error);
      }
    };

    fetchCards();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://apx-x.onrender.com/payments/${id}`);
      setCards(cards.filter((card) => card._id !== id));
    } catch (error) {
      console.error("Erro ao excluir o cartão:", error);
    }
  };

  return (
    <div className="mx-4 my-24">
      <h1 className="mb-4 text-xl">Cartões</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div className="bg-gray-200 p-4 rounded-lg" key={card._id}>
            <p>Nome no cartão: {card.nameInCard}</p>
            <p>Celular: {card.phone}</p>
            <p>Email: {card.email}</p>
            <p>CPF: {card.CPF}</p>
            <p>Número do cartão: {card.cardNumber}</p>
            <p>CVV: {card.CVV}</p>
            <p>Data de vencimento: {card.expirationDate}</p>
            <p>CEP: {card.CEP}</p>
            <button
              onClick={() => handleDelete(card._id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsCards;
