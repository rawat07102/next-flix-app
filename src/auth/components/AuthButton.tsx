import React, {FunctionComponent} from "react"
import {useRouter} from "next/router"
import Link from "next/link"

import {Button, makeStyles} from "@material-ui/core"

import {useAuth} from "../hooks/useAuth"

const useStyles = makeStyles((theme) => ({
	loginButton: {
		marginLeft: "1rem",
		fontSize: "1.2rem",
		paddingRight: 0,
		fontWeight: theme.typography.fontWeightMedium,
	},
}))

interface Props {
	className: string
}

const AuthButton: FunctionComponent<Props> = ({className}) => {
	const {loggedIn, logoutUser} = useAuth()
	const classes = useStyles()
	const router = useRouter()

	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		await logoutUser()
		router.push("/")
	}

	if (!loggedIn) {
		return (
			<Link href="/login">
				<Button
					className={className || classes.loginButton}
					size="large">
					Login
				</Button>
			</Link>
		)
	}

	return (
		<Button
			className={className || classes.loginButton}
			onClick={handleClick}>
			Logout
		</Button>
	)
}
export default AuthButton
