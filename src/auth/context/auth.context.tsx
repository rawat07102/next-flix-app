import {createContext} from "react"
import {UserDTO} from "../../user/dto/user.dto"

export interface IAuthContext {
	loggedIn: boolean
	user: UserDTO | null
	setUser: (user: UserDTO | null) => void
}

export const AuthContext = createContext<IAuthContext>({
	loggedIn: false,
	user: null,
	setUser(user: UserDTO | null) {
		this.user = user
		this.loggedIn = !!user
	},
})
