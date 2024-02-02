import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import { MdAudioFile } from "react-icons/md";
import Dropzone from "components/files/Dropzone";
import {TEXT_COLOR_LIGHT,  TEXT_COLOR_DARK, BRAND_COLOR_LIGHT, BRAND_COLOR_DARK } from "../../constants/ThemeConstants";

export default function FileSelector(props) {
  const { description, ...rest } = props;
  const textColorPrimary = useColorModeValue(TEXT_COLOR_LIGHT, TEXT_COLOR_DARK);
  const brandColor = useColorModeValue(BRAND_COLOR_LIGHT, BRAND_COLOR_DARK);
  return (
    <Card {...rest} mb="20px" align="center" p="20px">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          content={
            <Box>
              <Icon as={MdAudioFile} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Select Files
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                {description}
              </Text>
            </Box>
          }
        />
        <Flex direction="column" pe="44px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            textAlign="start"
            fontSize="2xl"
            mt={{ base: "20px", "2xl": "50px" }}
          >
            quarter_meet.m4a
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
