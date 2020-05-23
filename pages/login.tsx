import { FormEvent, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

import axios from "../src/shared/utils/axios";

import Layout from "../src/shared/components/Layout";

const loginUser = async (userData: { email: string; password: string }) => {
  const res = await axios.post("/auth/login", userData);
  return res.data;
};

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate("/auth/login", loginUser({ email, password }));
    router.push("/");
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleEmailInput}
          id="email"
          type="email"
          name="email"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          onChange={handlePasswordInput}
          id="password"
          type="password"
          name="password"
        ></input>
        <button type="submit">submit</button>
      </form>
    </Layout>
  );
};

export default LoginPage;
