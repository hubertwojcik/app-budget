import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useTranslation } from "react-i18next";

import theme from "utils/theme";
import GlobalStyles from "./index.css";

import { Navigation, Wrapper } from "components";

function App() {
	const { t, i18n } = useTranslation();
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />

			<Router>
				<Navigation
					items={[
						{
							content: "Homepage",
							to: "/",
						},
						{
							content: "Budget",
							to: "/budget",
						},
					]}
					RightElement={
						<div>
							<button onClick={() => i18n.changeLanguage("pl")}>pl</button>
							<button onClick={() => i18n.changeLanguage("en")}>en</button>
						</div>
					}
				/>
				<Wrapper>
					<Switch>
						<Route exact path="/">
							HomePage
						</Route>
						<Route path="/budget">Budget</Route>
					</Switch>
				</Wrapper>
			</Router>
		</ThemeProvider>
	);
}

function RootApp() {
	return (
		<React.Suspense fallback="Loading...">
			<App />
		</React.Suspense>
	);
}

export default RootApp;
