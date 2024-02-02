import React, { useState } from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Spacer,
  Icon,
  Avatar,
  Button,
  Input,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Menu from "./MainMenu.js";
import {
  MdCalendarMonth,
  MdEdit,
  MdOutlineAccessTime,
  MdRemoveRedEye,
} from "react-icons/md";
import { TRANSCRIPTION_VIEWER_MODE } from "constants/TranscriptionHistoryConstants.js";
import AudioPlayer from "./AudioPlayer.js";
import track from "assets/av.mp3";
import ExportModal from "./ExportModal";

const INITIAL_STATE = {
  viewMode: TRANSCRIPTION_VIEWER_MODE.VIEWER,
  transcriptionName: "Untitled",
  transcriptionDuration: "00:00",
  transcriptionLastUpdatedDate: "Fri, Aug 18, 2023 8:00 PM",
  speakers: [
    {
      label: "Speaker 1",
      logo: "logo.png",
    },
    {
      label: "Speaker 2",
      logo: "logo.png",
    },
  ],
  transcriptData: {
    "00:02": {
      speakerIndex: 0,
      timestamp: "00:02",
      text: "Okay, we are starting the meeting now. Lets get started with it.",
    },
    "02:14": {
      speakerIndex: 1,
      timestamp: "01:09",
      text: "Yeah, so last week we were discussing on the weekly progress of the tasks. We want to track all of those now.",
    },
    "02:11": {
      speakerIndex: 0,
      timestamp: "01:44",
      text: "Yeah, so last week we were discussing on the weekly progress of the tasks. We want to track all of those now.",
    },
    "02:12": {
      speakerIndex: 1,
      timestamp: "02:14",
      text: "Yeah, so last week we were discussing on the weekly progress of the tasks. We want to track all of those now.",
    },
  },
  audio: new Audio(track),
  currentAudioTimestamp: 0,
  isFocused: false,
  isExportModalVisible: false,
};

function initializeState(initialState) {
  return Object.keys(initialState).reduce((state, key) => {
    const [value, setValue] = useState(initialState[key]);
    state[key] = value;
    state[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = setValue;
    return state;
  }, {});
}

export default function Transcript() {
  const state = initializeState(INITIAL_STATE);

  const {
    viewMode,
    setViewMode,
    transcriptionName,
    setTranscriptionName,
    transcriptionDuration,
    transcriptionLastUpdatedDate,
    speakers,
    setSpeakers,
    transcriptData,
    setTranscriptData,
    audio,
    isExportModalVisible,
    setIsExportModalVisible,
  } = state;

  const getIconForViewerModeButton = () => {
    if (viewMode === TRANSCRIPTION_VIEWER_MODE.VIEWER) {
      return MdRemoveRedEye;
    } else {
      return MdEdit;
    }
  };

  const handleAudioTranscriptTimestampClick = (timestamp) => {
    const timestampInSeconds =
      parseInt(timestamp.split(":")[0] * 60) +
      parseInt(timestamp.split(":")[1]);
    console.log("seeked to: " + timestampInSeconds);
    audio.currentTime = timestampInSeconds;
  };

  const handleViewModeToggle = () => {
    if (viewMode === TRANSCRIPTION_VIEWER_MODE.VIEWER) {
      setViewMode(TRANSCRIPTION_VIEWER_MODE.EDITOR);
    } else {
      setViewMode(TRANSCRIPTION_VIEWER_MODE.VIEWER);
    }
  };

  const handleSpeakerLabelEdit = (speakerIndex, value) => {
    setSpeakers((previousSpeakers) => {
      const speakerList = [...previousSpeakers];
      const currentSpeaker = speakerList[speakerIndex];
      speakerList[speakerIndex] = { label: value, logo: currentSpeaker.logo };
      return speakerList;
    });
  };

  // See optimisation mechanism here, to reduce data being processed on each change.
  const handleTranscriptTextChange = (key, value) => {
    setTranscriptData((previousData) => {
      const data = { ...previousData };
      const transcriptSegment = data[key];
      data[key] = { ...transcriptSegment, text: value };
      return data;
    });
  };

  const handleExportButtonClick = () => {
    toggleExportModalVisibility(true);
  };

  const toggleExportModalVisibility = (flag) => {
    setIsExportModalVisible(flag);
  };

  return (
    <Box p={4}>
      <Grid
        templateRows="1fr 4fr"
        gap={2}
        height="100vh"
        templateAreas="'header' 'transcription'"
      >
        {/* Header Section */}
        <Card p="1rem" height="100%" width="100%">
          <HStack direction="row" spacing={4}>
            {viewMode === TRANSCRIPTION_VIEWER_MODE.VIEWER ? (
              <Heading fontSize="2xl">{transcriptionName}</Heading>
            ) : (
              <Input
                value={transcriptionName}
                onChange={(e) => setTranscriptionName(e.target.value)}
              />
            )}
            <Spacer />
            <Button onClick={handleViewModeToggle}>
              <Icon
                as={getIconForViewerModeButton()}
                width="20px"
                height="20px"
                color="inherit"
                mr={2}
              />
              <Text fontSize="sm">{viewMode}</Text>
            </Button>
            <Menu handleExport={handleExportButtonClick} />
            <ExportModal
              isExportModalVisible={isExportModalVisible}
              toggleExportModalVisibility={toggleExportModalVisibility}
            />
          </HStack>
          <HStack direction="row" mt="2rem" spacing={4}>
            <HStack direction="row">
              <Icon
                as={MdCalendarMonth}
                width="20px"
                height="20px"
                color="inherit"
              />
              <Text fontSize="sm">{transcriptionLastUpdatedDate}</Text>
            </HStack>
            <HStack direction="row">
              <Icon
                as={MdOutlineAccessTime}
                width="20px"
                height="20px"
                color="inherit"
              />
              <Text fontSize="sm">{transcriptionDuration}</Text>
            </HStack>
          </HStack>
        </Card>

        <Card p="1rem" height="100%" width="100%" overflowY="auto">
          <VStack spacing={8} alignItems="start" mt={4}>
            {Object.entries(transcriptData).map(([key, value]) => {
              return (
                <VStack alignItems="start">
                  <HStack alignItems="center">
                    <Avatar size="sm" src={speakers[value.speakerIndex].logo} />
                    {viewMode === TRANSCRIPTION_VIEWER_MODE.VIEWER ? (
                      <Text fontWeight="bold">
                        {speakers[value.speakerIndex].label}
                      </Text>
                    ) : (
                      <Input
                        value={speakers[value.speakerIndex].label}
                        onChange={(e) =>
                          handleSpeakerLabelEdit(
                            value.speakerIndex,
                            e.target.value
                          )
                        }
                      />
                    )}
                    <Spacer />
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      fontWeight="bold"
                      _hover={{ color: "blue.500" }}
                      cursor="pointer"
                      onClick={() =>
                        handleAudioTranscriptTimestampClick(value.timestamp)
                      }
                    >
                      {value.timestamp}
                    </Text>
                  </HStack>
                  {viewMode === TRANSCRIPTION_VIEWER_MODE.VIEWER ? (
                    <Text>{value.text}</Text>
                  ) : (
                    <Input
                      width="100vh"
                      value={value.text}
                      onChange={(e) =>
                        handleTranscriptTextChange(key, e.target.value)
                      }
                    />
                  )}
                </VStack>
              );
            })}
          </VStack>
          <Box mb="30px" />
        </Card>
        <AudioPlayer audio={audio} />
      </Grid>
    </Box>
  );
}
