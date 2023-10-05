// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";

// Assets
export default function GeneralInformation(props) {

  const { ...rest } = props;
  const { informationDetails } = { ...props };
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text 
      color={textColorSecondary}
       fontSize='md'
        me='26px'
        mb='10px'
         align="center"
         >
        Total Transcription Duration
      </Text>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        align='center'
        fontSize='3xl'
        mt='10px'
        mb='40px'>
        {props.totalTranscriptionMinutes}
      </Text>
      <SimpleGrid columns='2' gap='20px'>
      {informationDetails !== undefined ? informationDetails.map(element => (
  <Information
    boxShadow={cardShadow}
    title={element.title}
    value={element.value}
  />
)) : null}
      </SimpleGrid>
    </Card>
  );
}
