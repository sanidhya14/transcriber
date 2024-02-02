import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function TimelineRow(props) {
  const { logo, title, date, color, index, arrLength, textColor, stepConnectorColor, isDisabled, isFinal, handleTimelineRowClick } = props;

  return (
    <Flex alignItems="center" minH="78px" justifyContent="start" mb="5px"
      _hover={isDisabled === true ? null : { cursor: "pointer" }}
      onClick={isDisabled === true ? null : () => handleTimelineRowClick()}
    >
      <Flex direction="column" h="100%">
        <Icon
          as={logo}
          color={color}
          h={"30px"}
          w={"26px"}
          pe="6px"
          zIndex="1"
          position="relative"
          right={document.documentElement.dir === "rtl" ? "-8px" : ""}
          left={document.documentElement.dir === "rtl" ? "" : "-8px"}
        />
        {isFinal === true ? null : <Box
          w="2px"
          bg={stepConnectorColor}
          h={index === arrLength - 1 ? "15px" : "100%"}
        />
        }
      </Flex>
      <Flex direction="column" justifyContent="flex-start" h="100%">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {date}
        </Text>
      </Flex>
    </Flex>
  );
}
