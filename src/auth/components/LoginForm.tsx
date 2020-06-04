import { useRouter } from "next/router";
import { useState, FormEvent, ChangeEvent } from "react";
import { mutate } from "swr";
import { TextField } from "@material-ui/core";

import FormLayout from "../../shared/components/FormLayout";
import axios from "../../shared/utils/axios";
import { LoginDTO } from "../dto/auth.dto";
import { UserDTO } from "../../user/dto/user.dto";

const loginUser = async (loginData: LoginDTO) => {
  const res = await axios.post<{ id: UserDTO["id"] }>("/auth/login", loginData);
  return res.data;
};

const LoginForm = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<LoginDTO>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userId } = await mutate("/auth/login", loginUser(userData));
    localStorage.setItem("userId", userId);
    router.replace("/profile");
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
        autoComplete="email"
        onChange={handleChange}
        id="email"
        label="Email"
        type="email"
      />
      <TextField
        autoComplete="current-password"
        onChange={handleChange}
        id="password"
        label="Password"
        type="password"
      />
    </FormLayout>
  );
};

export default LoginForm;
