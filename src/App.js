import React from "react";
import "./App.css";
import { Container } from "./MainView/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Home/Home";


function App() {
    return (
        <>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/:space/:room?">
                        <Container />
                    </Route>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
