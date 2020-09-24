import React, {useState, useContext} from "react"
import {NextComponentType} from "next"

import Drawer from "./Drawer"

import {
	AppBar,
	IconButton,
	makeStyles,
	Container,
	Button,
	SvgIcon,
} from "@material-ui/core"
import Link from "next/link"
import {useAuth} from "../../auth/hooks/useAuth"
import AuthButton from "../../auth/components/AuthButton"

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "space-between",
		padding: `0, ${theme.spacing(1)}`,
	},
	iconButton: {
		marginRight: "auto",
		paddingLeft: theme.spacing(1),
		fontSize: "1.5rem",
	},
}))

const NavBar: NextComponentType = () => {
	const {loggedIn} = useAuth()
	const classes = useStyles()
	const [open, setOpen] = useState(false)

	const toggleDrawer = () => {
		setOpen((prevState) => !prevState)
	}

	return (
		<AppBar position="sticky">
			<Drawer open={open} handleClose={toggleDrawer}></Drawer>
			<Container className={classes.container} maxWidth="lg">
				<IconButton
					onClick={toggleDrawer}
					edge="start"
					className={classes.iconButton}>
					<SvgIcon fontSize="inherit">
						<path
							fill="currentColor"
							d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
						/>
					</SvgIcon>
				</IconButton>
				{loggedIn && (
					<Link href="/profile">
						<Button>Profile</Button>
					</Link>
				)}
				<AuthButton />
			</Container>
		</AppBar>
	)
}

export default NavBar
