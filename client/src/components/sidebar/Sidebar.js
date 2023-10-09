import React from "react";
import {
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Content from "components/sidebar/components/Content";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";

function Sidebar(props) {

  const { routes, isExpanded } = props;
  
  let variantChange = "0.15s ease-out";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  let sidebarBg = useColorModeValue("white", "navy.800");

  const getSideBarWidth = () => {
    return isExpanded === true ? "30vh" : "10vh";
  }

  return (
    <Flex display={{ sm: "none", xl: "block" }} position='relative' minH='100vh' mt="8vh">
      <Flex
        bg={sidebarBg}
        transition={variantChange}
        w={getSideBarWidth()}
        h='100vh'
        m="0px"
        minH='100%'
        overflowX='hidden'
        boxShadow={shadow}>
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}>
          <Content routes={routes} isExpanded={isExpanded} />
        </Scrollbars>
      </Flex>
    </Flex>
  );
}

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
  isExpanded: PropTypes.bool,
};

export default Sidebar;
