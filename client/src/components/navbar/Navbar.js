import React from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Spacer,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  IoMenuOutline,
  IoNotificationsSharp,
  IoPersonCircle,
  IoSettingsOutline,
  IoLogOutOutline,
  IoSunny, IoMoon,
} from "react-icons/io5";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import BrandLogo from "styles/assets/icons/bbc.svg";

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
  const handleThemeButtonClick = () => {
    console.log("Theme button clicked");
  };

  /**
   * TODO: export to a common utility if possible and use everywhere required.
   */
  const isDarkModeEnabled = () => {
    return false;
  };

  return (
    <Flex className="navbar-container">
      <Flex className="navbar-inner">
        <Box className="menu-button-container" onClick={handleMenuButtonClick} >
          <IoMenuOutline className="menu-button-icon" />
        </Box>

        <Box className="brand-container">
          <img src={BrandLogo} alt="brand logo" className="brand-logo" />
        </Box>
        <Spacer />

        {/* DARK MODE WILL BE PART OF NEXT MAJOR RELEASE */}
        {/* <Box
          onClick={handleThemeButtonClick}
          className="theme-button-container"
        >
          {isDarkModeEnabled() === true ? (

            <IoSunny className="theme-button-sun" />
          ) : (
            <IoMoon className="theme-button-moon" />
          )}
        </Box> */}

        <Menu>
          <MenuButton className="notifications-container">
            <IoNotificationsSharp className="notifications-button" />
          </MenuButton>

          <MenuList borderRadius="20px">
            <Scrollbars
              style={{ width: 300, height: 300 }}
              autoHide={true}
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              {notifications.map((notification) => (
                <MenuItem
                  key={notification}>
                  <Box
                    className="notification-item-icon"
                    bg={getNotificationIconColor(notification)}
                  />
                  <Text className="notification-text" color={textColor}>
                    {notification[0]}
                  </Text>
                </MenuItem>
              ))}
            </Scrollbars>
          </MenuList>
        </Menu>

        <Menu >
          <MenuButton
            className="profile-button-container"
          >
            <IoPersonCircle className="profile-menu-button" />
          </MenuButton>
          <MenuList borderRadius="20px">
            <MenuItem>
              <HStack>
                <IoPersonCircle className="profile-list-icon" />
                <Text className="profile-list-text" color={iconDefaultColor} >
                  Profile
                </Text>
              </HStack>
            </MenuItem>
            <MenuItem>
              <HStack>
                <IoSettingsOutline className="profile-list-icon" />
                <Text className="profile-list-text" color={iconDefaultColor} >
                  Settings
                </Text>
              </HStack>
            </MenuItem>
            <MenuItem>
              <HStack>
                <IoLogOutOutline className="profile-list-icon" />
                <Text className="profile-list-text" color={iconDefaultColor} >
                  Log out
                </Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>

      </Flex>
    </Flex>
  );
}

export default Navbar;
