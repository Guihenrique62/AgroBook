import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../screens/Login";
import Register from "../screens/Register";

function Web() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/web" component={Register} />
            </Switch>
        </BrowserRouter>
    );
}

export default Web;
