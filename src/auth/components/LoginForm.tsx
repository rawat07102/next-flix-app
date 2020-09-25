import {useRouter} from "next/router"
import {useState, FormEvent, ChangeEvent, SyntheticEvent} from "react"
import {TextField, Snackbar, SnackbarCloseReason} from "@material-ui/core"

import FormLayout from "../../shared/components/FormLayout"
import {useAuth} from "../hooks/useAuth"
import {LoginDTO} from "../dto/auth.dto"
import {Alert} from "@material-ui/lab"

const LoginForm = () => {
	const router = useRouter()
	const {loginUser} = useAuth()
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState("")

	const [userData, setUserData] = useState<LoginDTO>({
		email: "",
		password: "",
	})

	const handleClose = (
		_event: SyntheticEvent<any, Event>,
		reason?: SnackbarCloseReason
	) => {
		if (reason === "clickaway") {
			return
		}
		setErrors("")
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (userData.email === "" || userData.password === "") {
			setErrors("Empty input.")
			return
		}
		setLoading(true)
		try {
			await loginUser(userData)
		} catch (err) {
			setErrors("Invalid credentials.")
			setLoading(false)
			return
		}
		router.replace("/profile")
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {id: target, value} = e.target
		setUserData((prevData) => ({
			...prevData,
			[target]: value,
		}))
	}

	return (
		<FormLayout loading={loading} handleSubmit={handleSubmit}>
			<Snackbar
				open={!!errors}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{horizontal: "center", vertical: "top"}}>
				<Alert severity="error" onClose={handleClose}>
					{errors}
				</Alert>
			</Snackbar>
			<TextField
				error={!!errors}
				autoComplete="email"
				onChange={handleChange}
				id="email"
				label="Email"
				type="email"
			/>
			<TextField
				error={!!errors}
				autoComplete="current-password"
				onChange={handleChange}
				id="password"
				label="Password"
				type="password"
			/>
		</FormLayout>
	)
}

export default LoginForm
