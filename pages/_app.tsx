import React, {useState} from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import {ThemeProvider} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import {theme} from "../src/shared/styles/theme"
import useSWR from "swr"
import {useRequest} from "../src/shared/utils/useRequest"
import {AuthContext} from "../src/auth/context/auth.context"
import {UserDTO} from "../src/user/dto/user.dto"

export default function MyApp(props: any) {
	const {Component, pageProps} = props

	const {data} = useSWR("/api/profile", useRequest, {
		shouldRetryOnError: false,
	})

	const initialAuthContext = {
		loggedIn: !!data,
		user: data,
	}
	const [context, setContext] = useState(initialAuthContext)

	const setUser = (user: UserDTO | null) => {
		setContext({
			user: user,
			loggedIn: !!user,
		})
	}

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side")
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles)
		}
	}, [])

	return (
		<React.Fragment>
			<Head>
				<title>My page</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<AuthContext.Provider value={{...context, setUser}}>
					<Component {...pageProps} />
				</AuthContext.Provider>
			</ThemeProvider>
		</React.Fragment>
	)
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
}
