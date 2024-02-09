import React from "react";
import {
  Flex,
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

  const getSideBarWidth = () => {
    return isExpanded === true ? "33vh" : "10vh";
  }

  return (
    <Flex className="sidebar-flex-container">
      <Flex
        className="sidebar-inner-flex"
        w={getSideBarWidth}>
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
