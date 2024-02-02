import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

export function SidebarLinks(props) {

  const { routes, isExpanded } = props;

  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const getMenuItemRowSpacing = (route) => {
    return activeRoute(route.path.toLowerCase()) ? "12px" : "16px";
  }

  const getMenuItemColour = (route) => {
    return activeRoute(route.path.toLowerCase()) ? activeIcon : textColor;
  }

  const getMenuItemFontWeight = (route) => {
    return activeRoute(route.path.toLowerCase()) ? "bold" : "normal";
  }

  const getMenuItemSideMarkerColor = (route) => {
    return activeRoute(route.path.toLowerCase()) ? brandColor : "transparent";
  }

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <>
            <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight='bold'
              mx='auto'
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt='18px'
              pb='12px'
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
                spacing={getMenuItemRowSpacing(route)}
                py='5px'
                ps='5px'>
                <Flex w='100%' alignItems='center' justifyContent='start'>
                  <Box
                    color={getMenuItemColour(route)}
                    me='4px'>
                    {route.icon}
                  </Box>
                  { isExpanded === true ?
                    <Text
                      me='auto'
                      ml="10px"
                      color={getMenuItemColour(route)}
                      fontWeight={getMenuItemFontWeight(route)}
                    >
                      {route.name}
                    </Text> : null }
                </Flex>
                <Box
                  h='36px'
                  w='4px'
                  bg={getMenuItemSideMarkerColor(route)}
                  borderRadius='5px'
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
