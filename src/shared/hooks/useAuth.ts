import useSwr from "swr";
import { useRequest } from "../utils/useRequest";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const { data, error } = useSwr("/user/profile", useRequest);

  if (error) router.push("/login");

  return { userData: data, error };
};

export default useAuth;
