import {api} from "./api"
import axios from "axios"

export const useApi = async (path: string) => {
	const res = await api.get(path)
	return res.data
}

export const useRequest = async (path: string) => {
	const res = await axios.get(path)
	return res.data
}
