import FormLayout from "../../shared/components/FormLayout";
import { FormEvent, useState, ChangeEvent } from "react";
import { TextField } from "@material-ui/core";
import axios from "../../shared/utils/axios";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("/user/register", userData);
    console.log(res.data);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <FormLayout buttonLabel="SignUp" handleSubmit={handleSubmit}>
      <TextField onChange={handleChange} id="username" label="Username" />
      <TextField
        onChange={handleChange}
        id="email"
        type="email"
        label="Email"
      />
      <TextField
        onChange={handleChange}
        id="password"
        type="password"
        label="Password"
      />
    </FormLayout>
  );
};

export default RegisterForm;
