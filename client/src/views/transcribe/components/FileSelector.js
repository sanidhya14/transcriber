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
  GridItem,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import React, { useState, useEffect } from "react";
import { CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { IoAddCircle, IoMicCircleSharp } from "react-icons/io5";
import { ReactMediaRecorder } from "react-media-recorder";
import { FaPauseCircle, FaPlayCircle, FaStopCircle } from "react-icons/fa";
import AudioRecorder from "components/audio/AudioRecorder";


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
      <Flex flexDirection="row">
        <Flex
          {...getRootProps({ className: "dropzone" })}
          className="file-selector-area"
          {...rest}
        >
          <Input variant="main" {...getInputProps()} />
          <Button variant="no-effects">
            {
              <VStack className="file-selector-icon-container">
                <IoAddCircle className="file-selector-icon" />
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
        <Flex className="file-selector-area">
          <AudioRecorder className="audio-recorder-container" />
        </Flex>
      </Flex>
      {selectedFiles !== undefined && selectedFiles.length > 0
        ? <VStack className="file-selector-file-display-container">
          {selectedFiles.map((file) => {
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
                  icon={<CloseIcon boxSize={2} />}
                  onClick={() => handleFileRemoveButtonClick(file.name)}
                />
              </Flex>
            );
          })}
        </VStack>
        : null}
    </Grid>
  );
}
