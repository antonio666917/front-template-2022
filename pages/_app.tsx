import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import withDarkMode from "next-dark-mode";
import NProgress from "nprogress";
import BasePage from "../layouts/BasePage";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../components/Themes";
import "sanitize.css";
import "sanitize.css/typography.css";
import "sanitize.css/assets.css";
import "sanitize.css/forms.css";
import GlobalStylesheet from "../components/globalstyles";
import { ApolloProvider } from "@apollo/client";
import client from "../libraries/apollo-client";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, darkMode, pageProps }: AppProps & { darkMode }) {
  const { darkModeActive } = darkMode;
  const activeTheme = darkModeActive ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={activeTheme}>
      <ApolloProvider client={client}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
          />
        </Head>
        <GlobalStylesheet />
        <BasePage>
          <Component {...pageProps} />
        </BasePage>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default withDarkMode(App);
