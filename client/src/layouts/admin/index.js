import { Portal, Box, Flex } from "@chakra-ui/react";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";

export default function Dashboard(props) {
  const { ...rest } = props;
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };

  return (
    <Box>
      <Portal>
        <Box className="navbar-container">
          <Navbar handleSidebarToggle={handleSidebarToggle} />
        </Box>
      </Portal>
      <Flex>
        <Box
          className="sidebar-container"
          w={sidebarToggle ? "250px" : "80px"}
        >
          <Sidebar
            isExpanded={sidebarToggle}
            routes={routes}
            display="none"
            {...rest}
          />
        </Box>

        <Box
          className="content-container"
          ml={
            sidebarToggle ? "250px" : "80px"
          }
        // debug borders using below
        // style={{ border: "1px solid blue" }}
        >
          {getRoute() ? (
            <Box
              className="content-container-inner"
            >
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/" to="/admin/default" />
              </Switch>
            </Box>
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
}
