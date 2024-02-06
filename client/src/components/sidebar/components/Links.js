import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";

export function SidebarLinks(props) {

  const { routes, isExpanded } = props;

  let location = useLocation();

  const activeRoute = (route) => {
    const routeName = route.path.toLowerCase()
    return location.pathname.includes(routeName);
  };

  const getItemContainerCSSClassName = (route) => {
    return activeRoute(route) ? "menu-item-active" : "menu-item";
  }

  const getItemTextCSSClassName = (route) => {
    return activeRoute(route) ? "menu-item-text-active" : "menu-item-text";
  }

  const getItemSideMarkerCSSClassName = (route) => {
    return activeRoute(route) ? "side-marker-active" : "side-marker";
  }

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <>
            <Text
              className="menu-category"
              key={index}>
              {route.name}
            </Text>
            {createLinks(route.items)}
          </>
        );
      } else if (
        route.layout === "/admin" ||
        route.layout === "/auth"
      ) {
        return (
          <NavLink key={index} to={route.layout + route.path}>
            <Box mb="10px">
              <HStack
                className="menu-item"
              >
                <Flex className="menu-item-row">
                  <Box className={getItemContainerCSSClassName(route)}>
                    {route.icon}
                  </Box>
                  {isExpanded === true ?
                    <Text
                      className={getItemTextCSSClassName(route)}
                    >
                      {route.name}
                    </Text> : null}
                </Flex>
                <Spacer />
                <Box
                  className={getItemSideMarkerCSSClassName(route)}
                />
              </HStack>
            </Box>
          </NavLink>
        );
      }
    });
  };
  return createLinks(routes);
}

export default SidebarLinks;
