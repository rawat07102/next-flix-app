import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../src/shared/styles/theme";
import useSWR, { SWRConfig } from "swr";
import { useRequest } from "../src/shared/utils/useRequest";
import { AuthContext } from "../src/auth/context/auth.context";

export default function MyApp(props: any) {
  const { Component, pageProps } = props;

  const { data } = useSWR("/user/profile", useRequest, {
    shouldRetryOnError: false,
  });

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

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
        <SWRConfig value={{ fetcher: useRequest }}>
          <AuthContext.Provider value={data}>
            <Component {...pageProps} />
          </AuthContext.Provider>
        </SWRConfig>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
