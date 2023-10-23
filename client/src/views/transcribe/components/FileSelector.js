import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  VStack,
  Spacer,
  IconButton,
  Input,
  Button,
  Grid,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import Card from "components/card/Card";
import React from "react";
import { MdAudioFile } from "react-icons/md";
import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  BRAND_COLOR_LIGHT,
  BRAND_COLOR_DARK,
} from "../../../constants/ThemeConstants";
import { CloseIcon } from "@chakra-ui/icons";

export default function FileSelector(props) {
  const {
    selectedFiles,
    handleFileSelection,
    handleFileRemoveButtonClick,
    ...rest
  } = props;

  const textColorPrimary = useColorModeValue(TEXT_COLOR_LIGHT, TEXT_COLOR_DARK);
  const brandColor = useColorModeValue(BRAND_COLOR_LIGHT, BRAND_COLOR_DARK);

  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileSelection(acceptedFiles);
    },
  });

  return (
    <Card {...rest} mb="20px" align="center" p="20px">
      <Grid height="100%" rows={2} templateRows="4fr 1fr" gap={8} mb="20px">
        <Flex
          align="center"
          justify="center"
          bg={bg}
          border="1px dashed"
          borderColor={borderColor}
          borderRadius="16px"
          w="100%"
          h="70%"
          minH="70%"
          cursor="pointer"
          {...getRootProps({ className: "dropzone" })}
          {...rest}
        >
          <Input variant="main" {...getInputProps()} />
          <Button variant="no-effects">
            {
              <Box>
                <Icon as={MdAudioFile} w="80px" h="80px" color={brandColor} />
                <Flex justify="center" mx="auto" mb="12px">
                  <Text fontSize="xl" fontWeight="700" color={brandColor}>
                    Select or Drop Files
                  </Text>
                </Flex>
                <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                  Files in MP3, M4a, MP4, AAC formats are allowed
                </Text>
              </Box>
            }
          </Button>
        </Flex>
        <Box
          overflowY="auto"
          h="120px"
          boxShadow="inset 0 0 10px rgba(255, 255, 255, 0.9)"
        >
          <VStack align="start" w="100%">
            {selectedFiles !== undefined && selectedFiles.length > 0
              ? selectedFiles.map((file) => {
                  return (
                    <Flex key={file.name} w="100%" px={4}>
                      <Text
                        color={textColorPrimary}
                        fontWeight="bold"
                        textAlign="start"
                        fontSize="xl"
                      >
                        {file.name}
                      </Text>
                      <Spacer />
                      <IconButton
                        borderRadius="10px"
                        icon={<CloseIcon />}
                        onClick={() => handleFileRemoveButtonClick(file.name)}
                      />
                    </Flex>
                  );
                })
              : null}
          </VStack>
        </Box>
      </Grid>
    </Card>
  );
}
