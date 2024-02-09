import React, { useState, useEffect } from "react";
import { Box, Grid, Flex, Text, Button } from "@chakra-ui/react";
import Card from "components/card/Card";
import FileSelector from "./components/FileSelector";
import TaskTimeline from "./components/TaskTimeline";
import { TRANSCRIPTION_JOB_STATUS } from "constants/JobConstants";
import RunOptions from "./components/RunOptions";
import TranscribeStatus from "./components/TranscribeStatus";
import { INPUT_LANGUAGE } from "constants/JobConstants";

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

  const handleOutputLocationChange = (location) => {
    setOutputLocation(location);
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
    // Once complete then reset, show loading state till then.
    setTranscriptionStatus(TRANSCRIPTION_JOB_STATUS.INACTIVE);
  };

  const runJobPreChecks = () => {
    console.log("Running pre-checks ");
  };

  const startTranscription = () => {
    console.log(
      "Initiating transcription with payload: " +
      JSON.stringify({
        files: selectedFiles,
        options: [
          audioLanguage,
          transcriptionMode,
          outputLocation,
          outputFormats,
          enableSpeakerIdentification,
          enableWordLevelTimestamps,
        ],
      })
    );
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
          <FileSelector
            selectedFiles={selectedFiles}
            handleFileSelection={(newSelectedFiles) =>
              handleFileSelection(newSelectedFiles)
            }
            handleFileRemoveButtonClick={(fileIdentifier) =>
              handleFileRemoveButtonClick(fileIdentifier)
            }
          ></FileSelector>
        );

      case 1:
        return (
          <RunOptions
            audioLanguage={audioLanguage}
            handleAudioLanguageChange={(language) =>
              handleAudioLanguageChange(language)
            }
            transcriptionMode={transcriptionMode}
            handleTranscriptionModeChange={(mode) =>
              handleTranscriptionModeChange(mode)
            }
            outputLocation={outputLocation}
            handleOutputLocationChange={(location) =>
              handleOutputLocationChange(location)
            }
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
        );

      case 2:
        return (
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
        );

      default:
        return null;
    }
  };

  return (
    <Box className="page-container">
      <Grid className="grid-container">
        <TaskTimeline
          currentStepIndex={currentStepIndex}
          completedSteps={completedSteps}
          disabledSteps={disabledSteps}
          handleCurrentStepChange={(step) => handleCurrentStepChange(step)}
        />
        <Card className="transcribe-main-container">
          <Flex className="transcribe-step-header">
            <Text className="transcribe-step-text">
              Step {currentStepIndex + 1}
            </Text>
          </Flex>
          {getPage(currentStepIndex)}
          {currentStepIndex < totalSteps - 1 && (
            <Flex className="transcribe-step-footer">
              <Button
                onClick={() => handleNextButtonClick()}
                disabled={isNextButtonDisabled()}
                variant="action"
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
