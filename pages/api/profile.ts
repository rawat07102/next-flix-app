import {NextApiHandler} from "next"
import {api} from "../../src/shared/utils/api"

const profileRoute: NextApiHandler = async (req, res) => {
	if (req.method !== "GET") {
		return res.status(405).json({
			ok: false,
			message: `method: ${req.method} not allowed`,
			route: "/api/profile",
		})
	}
	const jwt = req.cookies["jwt"]

	try {
		const axiosRes = await api.get("/user/profile", {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})

		return res.json({profile: axiosRes.data})
	} catch (err) {
		res.status(401).json({
			ok: false,
			message: "Not Authorized",
			route: "/api/profile",
		})
	}
}

export default profileRoute
