import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AddressProps {
  cep?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  referencia?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}

interface AddresState {
  address: AddressProps;
  saveAddress: (address: AddressProps) => void;
  resetAddress: () => void;
}

export const useAddress = create<AddresState>()(
  persist(
    (set) => ({
      address: {},
      saveAddress: (address) => set({ address: address }),
      resetAddress: () => set({ address: {} }),
    }),
    {
      name: "address",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
