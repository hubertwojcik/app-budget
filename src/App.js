import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useTranslation } from "react-i18next";

import theme from "utils/theme";
import GlobalStyles from "./index.css";
import { fetchBudget } from "data/actions/budget.actions";

import { Navigation, Wrapper, LoadingIndicator, Button } from "components";

function App({ budget, fetchBudget }) {
	useEffect(() => {
		fetchBudget(1);
	}, [fetchBudget]);

	const { t, i18n } = useTranslation();
	return (
		<>
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
							<Button
								variant="regular"
								onClick={() => i18n.changeLanguage("pl")}
							>
								pl
							</Button>
							<Button
								variant="regular"
								onClick={() => i18n.changeLanguage("en")}
							>
								en
							</Button>
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
		</>
	);
}

const ConnectedApp = connect(
	(state) => {
		return {
			budget: state.budget.budget,
		};
	},
	{
		fetchBudget,
	}
)(App);

function RootApp() {
	return (
		<ThemeProvider theme={theme}>
			<React.Suspense fallback={<LoadingIndicator />}>
				<ConnectedApp />
			</React.Suspense>
		</ThemeProvider>
	);
}

export default RootApp;
