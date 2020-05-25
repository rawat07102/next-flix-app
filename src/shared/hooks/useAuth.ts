import useSwr from "swr";
import { useRequest } from "../utils/useRequest";

const useAuth = (initialData: any = {}) => {
  const { data, error } = useSwr("/user/profile", useRequest, {
    initialData,
  });

  return { userData: data, error };
};

export default useAuth;
