import axios from "./axios";

export const useRequest = async (path: string) => {
  const res = await axios.get(path);
  return res.data;
};
