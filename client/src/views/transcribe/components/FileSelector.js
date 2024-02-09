import {
  Box,
  Flex,
  Text,
  VStack,
  Spacer,
  IconButton,
  Input,
  Button,
  Grid,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import React from "react";
import { MdAudioFile } from "react-icons/md";
import { CloseIcon } from "@chakra-ui/icons";

export default function FileSelector(props) {
  const {
    selectedFiles,
    handleFileSelection,
    handleFileRemoveButtonClick,
    ...rest
  } = props;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileSelection(acceptedFiles);
    },
  });

  return (
    <Grid className="file-selector-main-grid">
      <Flex
        {...getRootProps({ className: "dropzone" })}
        className="file-selector-area"
        {...rest}
      >
        <Input variant="main" {...getInputProps()} />
        <Button variant="no-effects">
          {
            <VStack className="file-selector-icon-container">
              <MdAudioFile className="file-selector-icon" />
              <Text className="file-selector-main-text">
                Select or Drop Files
              </Text>
              <Text className="file-selector-secondary-text">
                Files in MP3, M4a, MP4, AAC formats are allowed
              </Text>
            </VStack>
          }
        </Button>
      </Flex>
      <VStack className="file-selector-file-display-container">
        {selectedFiles !== undefined && selectedFiles.length > 0
          ? selectedFiles.map((file) => {
            return (
              <Flex key={file.name} className="file-selector-file-item">
                <Text
                  className="file-selector-file-text"
                >
                  {file.name}
                </Text>
                <Spacer />
                <IconButton
                  size="sm"
                  className="file-selector-file-remove-button"
                  icon={<CloseIcon boxSize={3} />}
                  onClick={() => handleFileRemoveButtonClick(file.name)}
                />
              </Flex>
            );
          })
          : null}
      </VStack>
    </Grid>
  );
}
