import {NextApiHandler} from "next"
import {api} from "../../../src/shared/utils/api"
import {serialize} from "cookie"

/*
 * input: User Data (email and password)
 * method: POST
 * return: Error | Response
 * function: calls api for JWT and stores it in a http-only cookie
 */

const login: NextApiHandler = async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).json({
			ok: "false",
			response: {
				message: "Only POST method allowed",
				route: "/login",
			},
		})
	}

	const userData = req.body

	const axiosRes = await api({
		url: "/auth/login",
		data: userData,
		method: "POST",
	})

	const cookie = serialize("jwt", axiosRes.data.access_token, {
		httpOnly: true,
		sameSite: "strict",
		path: "/",
	})

	res.setHeader("Set-Cookie", cookie)
	res.json({
		ok: "true",
		message: "sucessfully logged in",
		route: "/login",
	})
}

export default login
