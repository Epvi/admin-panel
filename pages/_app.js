import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Head from "next/head";
import "../styles/globals.css";
import { AuthProvider } from "../auth/AuthContext";
import { StateProvider } from "../auth/reducer";
import { UserProvider } from "../auth/userReducer";
import Layout from "../components/Layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const userRole = "admin";

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Head>
          <title>EPVI - Managing Electricity wisely</title>
        </Head>
        <AuthProvider>
          <StateProvider>
            <UserProvider>
              <Layout userRole={userRole}>
              <Component {...pageProps} />
            </Layout>
            </UserProvider>
          </StateProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
