import { useRouter } from "next/router";
import { useState, FormEvent, ChangeEvent } from "react";
import { mutate } from "swr";
import { TextField } from "@material-ui/core";

import FormLayout from "../../shared/components/FormLayout";
import axios from "../../shared/utils/axios";

const loginUser = async (userData: { email: string; password: string }) => {
  const res = await axios.post("/auth/login", userData);
  return res.data;
};

const LoginForm = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userId } = await mutate("/auth/login", loginUser(userData));
    localStorage.setItem("userId", userId);
    router.push("/");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id: target, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [target]: value,
    }));
  };

  return (
    <FormLayout handleSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        id="email"
        label="Email"
        type="email"
      />
      <TextField
        onChange={handleChange}
        id="password"
        label="Password"
        type="password"
      />
    </FormLayout>
  );
};

export default LoginForm;
