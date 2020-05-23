import useSwr from "swr";
import { useRequest } from "../utils/useRequest";

const useAuth = () => {
  const { data, error } = useSwr("/user/profile", useRequest);

  return { userData: data, error };
};

export default useAuth;
