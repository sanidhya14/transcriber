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
    <Box>
      <Grid className="transcript-grid-container">
        <Card className="card">
          <HStack className="hstack-container">
            {viewMode === TRANSCRIPTION_VIEWER_MODE.VIEWER ? (
              <Heading className="heading-container">{transcriptionName}</Heading>
            ) : (
              <Input
                value={transcriptionName}
                onChange={(e) => setTranscriptionName(e.target.value)}
              />
            )}
            <Spacer className="spacer" />
            <Button className="button-container" onClick={handleViewModeToggle}>
              <Icon
                className="icon-container"
                as={getIconForViewerModeButton()}
              />
              <Text className="text-container">{viewMode}</Text>
            </Button>
            <Menu handleExport={handleExportButtonClick} />
            <ExportModal
              isExportModalVisible={isExportModalVisible}
              toggleExportModalVisibility={toggleExportModalVisibility}
            />
          </HStack>
          <HStack className="date-time-section">
            <HStack className="row-stack">
              <Icon
                className="icon-container"
                as={MdCalendarMonth}
              />
              <Text className="text-container">{transcriptionLastUpdatedDate}</Text>
            </HStack>
            <HStack className="row-stack">
              <Icon
                as={MdOutlineAccessTime}
                className="icon-container"
              />
              <Text className="text-container">{transcriptionDuration}</Text>
            </HStack>
          </HStack>
        </Card>

        <Card className="card">
          <VStack className="transcription-vstack-container">
            {Object.entries(transcriptData).map(([key, value]) => {
              return (
                <VStack className="transcript-segment-container">
                  <HStack className="transcript-hstack-container">
                    <Avatar className="avatar" src={speakers[value.speakerIndex].logo} />
                    {viewMode === TRANSCRIPTION_VIEWER_MODE.VIEWER ? (
                      <Text className="speaker-text-container">
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
                      className="timestamp-text-container"
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
                      className="edit-input-box"
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
        </Card>
      </Grid>
      <AudioPlayer audio={audio} />
    </Box>
  );
}
