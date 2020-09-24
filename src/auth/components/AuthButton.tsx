import {Button, makeStyles} from "@material-ui/core"
import Link from "next/link"
import React from "react"
import {useAuth} from "../hooks/useAuth"

const useStyles = makeStyles((theme) => ({
	loginButton: {
		marginLeft: "auto",
		fontSize: "1.2rem",
		paddingRight: 0,
		fontWeight: theme.typography.fontWeightMedium,
	},
}))

const AuthButton = () => {
	const {loggedIn, logoutUser} = useAuth()
	const classes = useStyles()

	if (!loggedIn) {
		return (
			<Link href="/login">
				<Button className={classes.loginButton} size="large">
					Login
				</Button>
			</Link>
		)
	}

	return (
		<Button className={classes.loginButton} onClick={logoutUser}>
			Logout
		</Button>
	)
}
export default AuthButton
