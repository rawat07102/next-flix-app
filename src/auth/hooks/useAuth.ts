import axios from "axios"

import {UserDTO} from "../../user/dto/user.dto"
import {LoginDTO} from "../dto/auth.dto"
import {useContext} from "react"
import {AuthContext} from "../context/auth.context"

//TODO: Error Handling
function useAuth() {
	const {user, setUser, loggedIn} = useContext(AuthContext)

	async function loginUser(loginData: LoginDTO) {
		await axios.post("/api/auth/login", loginData)
		try {
			const res = await axios.get<{profile: UserDTO}>("/api/profile")
			setUser(res.data.profile)
		} catch (err) {
			console.log(err, "[loginUser]")
		}
	}

	async function logoutUser() {
		try {
			await axios.post("/api/auth/logout")
			setUser(null)
		} catch (err) {
			console.log(err, "[logoutUser]")
		}
	}

	return {user, loginUser, logoutUser, loggedIn}
}

export {useAuth}
