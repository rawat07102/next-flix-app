import {Drawer as MuiDrawer, makeStyles, Typography} from "@material-ui/core"
import {FunctionComponent} from "react"
import Link from "next/link"
import {TreeView, TreeItem} from "@material-ui/lab"
import {ExpandMore, ChevronRight} from "@material-ui/icons"
import {useAuth} from "../../auth/hooks/useAuth"

interface DrawerProps {
	open: boolean
	handleClose(): void
}

const useStyles = makeStyles((_theme) => ({
	drawerPaper: {
		minWidth: "250px",
		width: "12%",
	},
}))

const Drawer: FunctionComponent<DrawerProps> = ({open, handleClose}) => {
	const classes = useStyles()
	const {loggedIn} = useAuth()

	return (
		<MuiDrawer
			anchor="left"
			classes={{paper: classes.drawerPaper}}
			open={open}
			onClose={handleClose}>
			<TreeView
				defaultCollapseIcon={<ExpandMore />}
				defaultExpandIcon={<ChevronRight />}>
				<TreeItem
					nodeId="1"
					label={
						<Link href="/">
							<Typography variant="h6">Home</Typography>
						</Link>
					}></TreeItem>
				<TreeItem
					hidden={!!loggedIn}
					nodeId="2"
					label={
						<Link href="/register">
							<Typography variant="h6">Sign Up</Typography>
						</Link>
					}></TreeItem>
			</TreeView>
		</MuiDrawer>
	)
}

export default Drawer
