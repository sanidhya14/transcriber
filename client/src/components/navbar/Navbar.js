import React from "react";
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Spacer,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  IoMenuOutline,
  IoNotificationsSharp,
  IoPersonCircle,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { HorizonLogo } from "components/icons/Icons";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Navbar(props) {
  const { handleSidebarToggle } = { ...props };

  const [notifications, setNotifications] = React.useState([
    ["New version upgrade available", false],
    ["Upgrade to pro, flat 50% off", true],
  ]);

  /**
   * TODO: find a better way to initialize and consolidate all initialization props for the app.
   */
  const backgroundColor = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("black.700", "white");
  const highlightColor = useColorModeValue("pink.700");
  const iconDefaultColor = useColorModeValue("gray.400", "white");

  const handleMenuButtonClick = () => {
    handleSidebarToggle();
  };

  const getNotificationIconColor = (notification) => {
    return notification[1] === true ? iconDefaultColor : highlightColor;
  };

  // TODO; add logic
  const handleThemeButtonClick = () => {};

  /**
   * TODO: export to a common utility if possible and use everywhere required.
   */
  const isDarkModeEnabled = () => {
    return false;
  };

  return (
    <Flex
      display={{ sm: "none", xl: "block" }}
      position="fixed"
      minW="100%"
      h="8vh"
      minH="8vh"
    >
      <Flex
        direction="row"
        bg={backgroundColor}
        w="100vh"
        h="8vh"
        m="0px"
        minW="100%"
      >
        {/** Menu Button */}
        <Box
          w="max-content"
          h="max-content"
          onClick={handleMenuButtonClick}
          p="5"
        >
          <Icon
            as={IoMenuOutline}
            color={iconDefaultColor}
            w="30px"
            h="30px"
            _hover={{ cursor: "pointer" }}
          />
        </Box>

        {/** TODO: Brand Logo update to final app logo*/}
        <Box align="center" direction="column" p="5">
          <HorizonLogo h="26px" w="175px" color={textColor} />
        </Box>
        <Spacer />

        <Box p="5">
          <IconButton
            aria-label="Search database"
            borderRadius="10px"
            onClick={() => handleThemeButtonClick()}
            icon={
              isDarkModeEnabled() === true ? (
                <SunIcon w="30px" h="30px" color={iconDefaultColor} />
              ) : (
                <MoonIcon w="30px" h="30px" color={iconDefaultColor} />
              )
            }
          />
        </Box>

        {/** TODO: Notifications Menu button, add items */}
        <Box p="5">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Notifications"
              icon={
                <Icon
                  as={IoNotificationsSharp}
                  color={iconDefaultColor}
                  w="30px"
                  h="30px"
                  _hover={{ cursor: "pointer" }}
                />
              }
            />

            <MenuList>
              <Scrollbars
                style={{ width: 300, height: 300 }}
                autoHide={true}
                renderTrackVertical={renderTrack}
                renderThumbVertical={renderThumb}
                renderView={renderView}
              >
                {notifications.map((notification) => (
                  <MenuItem
                    key={notification}
                    icon={
                      <Box
                        w="8px"
                        h="8px"
                        bg={getNotificationIconColor(notification)}
                        borderRadius="50%"
                      />
                    }
                  >
                    <Text fontSize="md" color={textColor}>
                      {notification[0]}
                    </Text>
                  </MenuItem>
                ))}
              </Scrollbars>
            </MenuList>
          </Menu>
        </Box>

        {/** Profile Menu button. TODO: chnage this to avatar + add items */}
        <Box p="5" mr="5">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Notifications"
              icon={
                <Icon
                  as={IoPersonCircle}
                  color={iconDefaultColor}
                  w="30px"
                  h="30px"
                  _hover={{ cursor: "pointer" }}
                />
              }
            />
            <MenuList>
              <MenuItem>
                <HStack>
                  <Icon
                    as={IoPersonCircle}
                    color={iconDefaultColor}
                    w="30px"
                    h="30px"
                  />
                  <Text me="auto" color={iconDefaultColor} fontWeight="normal">
                    Profile
                  </Text>
                </HStack>
              </MenuItem>
              <MenuItem>
                <HStack>
                  <Icon
                    as={IoSettingsOutline}
                    color={iconDefaultColor}
                    w="30px"
                    h="30px"
                  />
                  <Text me="auto" color={iconDefaultColor} fontWeight="normal">
                    Settings
                  </Text>
                </HStack>
              </MenuItem>
              <MenuItem>
                <HStack>
                  <Icon
                    as={IoLogOutOutline}
                    color={iconDefaultColor}
                    w="30px"
                    h="30px"
                  />
                  <Text me="auto" color={iconDefaultColor} fontWeight="normal">
                    Log out
                  </Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Navbar;
