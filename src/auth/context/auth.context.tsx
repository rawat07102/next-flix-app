import { createContext } from "react";
import { UserDTO } from "../../user/dto/user.dto";

export const AuthContext = createContext<UserDTO>({
  id: "",
  email: "",
  username: "",
});
