import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import "styles/main.scss";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "theme/theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <CSSReset />
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Redirect from="/" to="/admin/home" />
          </Switch>
        </HashRouter>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root"),
);
