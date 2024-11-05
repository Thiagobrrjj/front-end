"use client";

import Header from "@/components/Header";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      email: email,
      password: password,
    });
    if (result) {
      router.replace("/painel");
    }
  };

  return (
    <div className="h-screen w-screen bg-[#F9F9F9] ">
      <Header />
      <div className="h-screen flex flex-col items-center justify-center m-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center bg-white w-[420px] h-[550px] px-12 border border-gray-300 rounded-lg"
        >
          <div>
            <h1 className="text-xl mb-40">Acesse a sua conta</h1>
          </div>

          <div className="flex flex-col w-full -mt-20">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              required
              autoComplete="email"
              className="mb-6 mt-2 h-12 bg-transparent border rounded-md px-4 border-gray-300 focus:outline-none focus:border-purple-700 focus:border-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              required
              autoComplete="password"
              className="mb-6 mt-2 h-12 bg-transparent border rounded-md px-4 border-gray-300 focus:outline-none focus:border-purple-700 focus:border-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-[#DF7400] text-white rounded-full w-full h-10 text-md my-4 hover:scale-105 duration-500"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
