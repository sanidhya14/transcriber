import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import Links from "components/sidebar/components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";

function SidebarContent(props) {

  const { routes, isExpanded } = props;

  return (
    <Flex className="sidebar-content">

      <Stack className="stack-container">
        <Box>
          <Links routes={routes} isExpanded={isExpanded} />
        </Box>
      </Stack>

      <Box className="sidebar-card-box">
        <SidebarCard
          isExpanded={isExpanded}
        />
      </Box>
    </Flex>
  );
}

export default SidebarContent;
