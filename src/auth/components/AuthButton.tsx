import {Button, makeStyles} from "@material-ui/core"
import Link from "next/link"
import React, {FunctionComponent} from "react"
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
			onClick={logoutUser}>
			Logout
		</Button>
	)
}
export default AuthButton
