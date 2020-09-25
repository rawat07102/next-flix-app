import {NextApiHandler} from "next"
import {serialize} from "cookie"

const logoutHandler: NextApiHandler = (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).json({
			ok: "false",
			response: {
				message: "Only POST method allowed",
				route: "/api/auth/logout",
			},
		})
	}
	const emptyCookie = serialize("jwt", "deleted", {
		maxAge: -1,
		path: "/",
	})

	res.setHeader("Set-Cookie", emptyCookie)
	res.json({
		success: true,
		route: "/api/auth/logout",
	})
}

export default logoutHandler
