import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import Links from "components/sidebar/components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";

function SidebarContent(props) {

  const { routes, isExpanded } = props;

  return (
    <Flex direction='column' height='100vh' pt='25px' px="16px" borderRadius='30px'>

      <Stack direction='column' mb='auto' mt='8px'>
        <Box>
          <Links routes={routes} isExpanded={isExpanded} />
        </Box>
      </Stack>

      <Box
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        <SidebarCard
          isExpanded={isExpanded}
        />
      </Box>
    </Flex>
  );
}

export default SidebarContent;
