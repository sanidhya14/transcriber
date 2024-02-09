import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";

export default function TimelineRow(props) {
  const { logo, title, date, color, index, arrLength, textColor, stepConnectorColor, isDisabled, isFinal, handleTimelineRowClick } = props;

  return (
    <Flex className="timeline-row-container"
      onClick={isDisabled === true ? null : () => handleTimelineRowClick()}
    >
      <Flex className="timeline-row-inner-container">
        <Icon className="icon"
          as={logo}
          color={color}
        />
        {isFinal === true ? null : <Box
          className="connector"
          bg={stepConnectorColor}
          h={index === arrLength - 1 ? "15px" : "100%"}
        />
        }
      </Flex>
      <Flex className="timeline-row-text-container">
        <Text color={textColor} className="title">
          {title}
        </Text>
        <Text className="date">
          {date}
        </Text>
      </Flex>
    </Flex>
  );
}
