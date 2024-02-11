import { Box, Text } from "@chakra-ui/react";

import React from "react";
import Card from "components/card/Card";

export default function Information(props) {
  const { title, value, ...rest } = props;
  return (
    <Box className="info-card">
      <Text className="information-card-heading">
        {title}
      </Text>
      <Text className="information-card-text">
        {value}
      </Text>
    </Box>
  );
}
