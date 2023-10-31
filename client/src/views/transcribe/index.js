import React, { useState, useEffect } from "react";
import { Box, Grid, Flex, Text, Button } from "@chakra-ui/react";
import Card from "components/card/Card";
import FileSelector from "./components/FileSelector";
import TaskTimeline from "./components/TaskTimeline";
import { TRANSCRIPTION_JOB_STATUS } from "constants/JobConstants";
import RunOptions from "./components/RunOptions";
import TranscribeStatus from "./components/TranscribeStatus";
import { INPUT_LANGUAGE } from "constants/JobConstants";
import { ICON_COLOR_LIGHT } from "constants/ThemeConstants";

const INITIAL_STATE = {
  currentStepIndex: 0,
  completedSteps: [false, false, false],
  disabledSteps: [false, false, true],
  transcriptionStatus: TRANSCRIPTION_JOB_STATUS.INACTIVE,
  selectedFiles: [],
  audioLanguage: INPUT_LANGUAGE.AUTO_DETECT,
  // Mode will be kept always null at initialization
  // to force user to select required value.
  transcriptionMode: null,
  outputLocation: "./transcription-outputs",
  outputFormats: [],
  enableSpeakerIdentification: true,
  enableWordLevelTimestamps: true,
  statusDescription: "Initializing",
  statusPercentage: 0,
  estimatedTimeRemaining: null,
  isCancelJobModalVisible: false,
};

function initializeState(initialState) {
  return Object.keys(initialState).reduce((state, key) => {
    const [value, setValue] = useState(initialState[key]);
    state[key] = value;
    state[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = setValue;
    return state;
  }, {});
}

export default function Transcribe() {
  const state = initializeState(INITIAL_STATE);
  const totalSteps = 3;
  const {
    currentStepIndex,
    setCurrentStepIndex,
    completedSteps,
    setCompletedSteps,
    disabledSteps,
    setDisabledSteps,
    transcriptionStatus,
    setTranscriptionStatus,
    selectedFiles,
    setSelectedFiles,
    audioLanguage,
    setAudioLanguage,
    transcriptionMode,
    setTranscriptionMode,
    outputLocation,
    setOutputLocation,
    outputFormats,
    setOutputFormats,
    enableSpeakerIdentification,
    setEnableSpeakerIdentification,
    enableWordLevelTimestamps,
    setEnableWordLevelTimestamps,
    statusDescription,
    setStatusDescription,
    statusPercentage,
    setStatusPercentage,
    estimatedTimeRemaining,
    setEstimatedTimeRemaining,
    isCancelJobModalVisible,
    setIsCancelJobModalVisible,
  } = state;

  const handleCurrentStepChange = (step) => {
    setCurrentStepIndex(step);
  };

  const isNextButtonDisabled = () => {
    if (!completedSteps[currentStepIndex]) {
      return true;
    } else {
      if (
        currentStepIndex === totalSteps - 2 &&
        (!completedSteps[currentStepIndex] ||
          !completedSteps[currentStepIndex - 1])
      ) {
        return true;
      }
    }
    return false;
  };

  const handleNextButtonClick = () => {
    switch (currentStepIndex) {
      case 0:
        handleCurrentStepChange(currentStepIndex + 1);
        break;

      case 1:
        handleCurrentStepChange(currentStepIndex + 1);
        setTranscriptionStatus(TRANSCRIPTION_JOB_STATUS.REQUESTED);
        break;

      default:
        return null;
    }
  };

  const returnFilePath = async () => {
    await window.myDialog.showDialog();
  };

  const handleFileSelection = (newSelectedFiles) => {
    setSelectedFiles([...newSelectedFiles, ...selectedFiles]);
  };

  const handleFileRemoveButtonClick = (fileIdentifier) => {
    const updatedFilesList = selectedFiles.filter(
      (file) => file.name !== fileIdentifier
    );
    setSelectedFiles(updatedFilesList);
  };

  const handleOutputFormatsChange = (format) => {
    if (outputFormats.includes(format)) {
      setOutputFormats(outputFormats.filter((item) => item !== format));
    } else {
      setOutputFormats([...outputFormats, format]);
    }
  };

  const handleAudioLanguageChange = (language) => {
    setAudioLanguage(language);
  };

  const handleTranscriptionModeChange = (mode) => {
    setTranscriptionMode(mode);
  };

  const handleOutputLocationChange = () => {
    returnFilePath();
    // setOutputLocation(returnFilePath());
  };

  const toggleSpeakerIdentification = (flag) => {
    setEnableSpeakerIdentification(flag);
  };

  const toggleWordLevelTimestamps = (flag) => {
    setEnableWordLevelTimestamps(flag);
  };

  const toggleCancelJobModalVisibility = (flag) => {
    setIsCancelJobModalVisible(flag);
  };

  const cancelTranscriptionJob = () => {
    setIsCancelJobModalVisible(false);
    console.log("Cancelling Trancsription job");
    // Once complete then reset, show loading state till then.
    setTranscriptionStatus(TRANSCRIPTION_JOB_STATUS.INACTIVE);
  };

  const runJobPreChecks = () => {
    console.log("Running pre-checks ");
  };

  const startTranscription = () => {
    console.log("Initiating transcription");
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setCompletedSteps([true, completedSteps[1], completedSteps[2]]);
    } else {
      setCompletedSteps([false, completedSteps[1], completedSteps[2]]);
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (audioLanguage === undefined || transcriptionMode === undefined) {
      setCompletedSteps([completedSteps[0], true, completedSteps[2]]);
    } else {
      setCompletedSteps([completedSteps[0], false, completedSteps[2]]);
    }
  }, [audioLanguage, transcriptionMode]);

  useEffect(() => {
    if (transcriptionStatus === TRANSCRIPTION_JOB_STATUS.INACTIVE) {
      // Reset to INITIAL_STATE
      const initialStateKeys = Object.keys(INITIAL_STATE);
      initialStateKeys.forEach((key) => {
        if (state[key] !== INITIAL_STATE[key]) {
          state[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](
            INITIAL_STATE[key]
          );
        }
      });
    } else if (transcriptionStatus === TRANSCRIPTION_JOB_STATUS.REQUESTED) {
      setDisabledSteps([true, true, false]);
      runJobPreChecks();
      startTranscription();
    } else if (transcriptionStatus === TRANSCRIPTION_JOB_STATUS.STARTED) {
    } else if (transcriptionStatus === TRANSCRIPTION_JOB_STATUS.COMPLETED) {
    } else if (transcriptionStatus === TRANSCRIPTION_JOB_STATUS.FAILED) {
    }
  }, [transcriptionStatus]);

  const getPage = (currentStepIndex) => {
    switch (currentStepIndex) {
      case 0:
        return (
          <Card p="1rem" height="100%" width="100%">
            <FileSelector
              height="100%"
              width="100%"
              selectedFiles={selectedFiles}
              handleFileSelection={(newSelectedFiles) =>
                handleFileSelection(newSelectedFiles)
              }
              handleFileRemoveButtonClick={(fileIdentifier) =>
                handleFileRemoveButtonClick(fileIdentifier)
              }
            ></FileSelector>
          </Card>
        );

      case 1:
        return (
          <Card p="1rem" height="80vh" width="100%" overflowY="auto">
            <RunOptions
              height="100%"
              width="100%"
              audioLanguage={audioLanguage}
              handleAudioLanguageChange={(language) =>
                handleAudioLanguageChange(language)
              }
              transcriptionMode={transcriptionMode}
              handleTranscriptionModeChange={(mode) =>
                handleTranscriptionModeChange(mode)
              }
              outputLocation={outputLocation}
              handleOutputLocationChange={() => handleOutputLocationChange()}
              outputFormats={outputFormats}
              handleOutputFormatsChange={(formats) =>
                handleOutputFormatsChange(formats)
              }
              enableSpeakerIdentification={enableSpeakerIdentification}
              toggleSpeakerIdentification={(flag) =>
                toggleSpeakerIdentification(flag)
              }
              enableWordLevelTimestamps={enableWordLevelTimestamps}
              toggleWordLevelTimestamps={(flag) =>
                toggleWordLevelTimestamps(flag)
              }
            />
          </Card>
        );

      case 2:
        return (
          <Card p="1rem" height="80vh" width="100%" align="center">
            <TranscribeStatus
              statusDescription={statusDescription}
              statusPercentage={statusPercentage}
              estimatedTimeRemaining={estimatedTimeRemaining}
              toggleCancelJobModalVisibility={(flag) =>
                toggleCancelJobModalVisibility(flag)
              }
              isCancelJobModalVisible={isCancelJobModalVisible}
              cancelTranscriptionJob={() => cancelTranscriptionJob()}
            />
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} height="100vh">
      <Grid
        height="85vh"
        columns={2}
        gap={4}
        mb="20px"
        templateColumns="1fr 4fr"
      >
        <TaskTimeline
          currentStepIndex={currentStepIndex}
          completedSteps={completedSteps}
          disabledSteps={disabledSteps}
          handleCurrentStepChange={(step) => handleCurrentStepChange(step)}
        />
        <Card p="1rem" height="100%" width="100%">
          <Text
            color={ICON_COLOR_LIGHT}
            fontSize="md"
            my={{ base: "auto", "2xl": "10px" }}
            ml="1rem"
            textAlign="start"
          >
            Step {currentStepIndex + 1}
          </Text>

          {getPage(currentStepIndex)}

          {currentStepIndex < totalSteps - 1 && (
            <Flex direction="row" mt={4}>
              <Button
                colorScheme="blue"
                ml={2}
                mr={2}
                onClick={() => handleNextButtonClick()}
                disabled={isNextButtonDisabled()}
              >
                Next
              </Button>
            </Flex>
          )}
        </Card>
      </Grid>
    </Box>
  );
}
