import axios from "axios"

import {UserDTO} from "../../user/dto/user.dto"
import {LoginDTO} from "../dto/auth.dto"
import {useContext} from "react"
import {AuthContext} from "../context/auth.context"

function useAuth() {
	const {user, setUser, loggedIn} = useContext(AuthContext)

	async function loginUser(loginData: LoginDTO) {
		await axios.post("/api/auth/login", loginData)
		const res = await axios.get<{profile: UserDTO}>("/api/profile")
		console.log(res, "useAuth")
		setUser(res.data.profile)
	}

	async function logoutUser() {
		await axios.post("/api/auth/logout")
		setUser(null)
	}

	return {user, loginUser, logoutUser, loggedIn}
}

export {useAuth}
