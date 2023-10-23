import React, { useState, useEffect } from "react";
import { Box, Grid, Center, Flex, Text, Button } from "@chakra-ui/react";

import Card from "components/card/Card";
import FileSelector from "./components/FileSelector";
import ProgressLabel from "components/progress/ProgressLabel";
import TaskTimeline from "./components/TaskTimeline";
import { TRANSCRIPTION_JOB_STATUS } from "constants/JobConstants";
import RunOptions from "./components/RunOptions";

export default function Transcribe() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const [disabledSteps, setDisabledSteps] = useState([false, false, false]);

  const [transcriptionStatus, setTranscriptionStatus] = useState(
    TRANSCRIPTION_JOB_STATUS.INACTIVE
  );

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [audioLanguage, setAudioLanguage] = useState("Auto-detect");
  const [transcriptionMode, setTranscriptionMode] = useState("Fast");
  const [outputLocation, setOutputLocation] = useState("");
  const [outputFormats, setOutputFormats] = useState([]);
  const [enableSpeakerIdentification, setEnableSpeakerIdentification] =
    useState(true);
  const [enableWordLevelTimestamps, setEnableWordLevelTimestamps] =
    useState(true);

  const textColorSecondary = "gray.400";

  const handleCurrentStepChange = (step) => {
    setCurrentStepIndex(step);
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

  // STEPS

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

  // USE EFFECTS

  const runJobPreChecks = () => {
    console.log("Running pre-checks ");
  };

  const startTranscription = () => {
    console.log("Initiating transcription");
  };

  useEffect(() => {
    /**
     * 1. Lock relevant UI controls.
     * 2. Run any pre-checks (such as config fetching, validations etc.)
     * 3. Initiate the job.
     */
    if (transcriptionStatus === TRANSCRIPTION_JOB_STATUS.REQUESTED) {
      runJobPreChecks();
      startTranscription();
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
          </Card>
        );

      case 2:
        return (
          <Card p="1rem" height="80vh" width="100%" align="center">
            <Card p="1rem" height="100%" width="100%" align="center">
              <Center>
                <ProgressLabel
                  startDegree={270}
                  progress={80 / 2}
                  //fillColor="rgb(248,247,243)"
                  trackColor="#fff"
                  progressColor="#ac884c"
                  progressWidth={10}
                  trackWidth={16}
                  // trackBorderWidth={1}
                  // trackBorderColor="rgb(232,223,209)"
                  cornersWidth={5}
                  size={240}
                  text="70%"
                  textProps={{
                    x: "50%",
                    y: "50%",
                    dx: 8,
                    dy: 8,
                    textAnchor: "middle",
                    style: {
                      fontSize: 28,
                      fontWeight: "500",
                      fill: "#ac884c",
                    },
                  }}
                />
              </Center>
              <Text color="gray.400" fontWeight="500" fontSize="md">
                Transcribing Audio to text
              </Text>
              <Center>
                <Flex direction="row" justify="space-between" mt={4}>
                  <Button colorScheme="blue" ml={2} mr={2}>
                    See Transcript
                  </Button>
                </Flex>
              </Center>
            </Card>
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
          {/* header small step counter */}
          <Text
            color={textColorSecondary}
            fontSize="md"
            my={{ base: "auto", "2xl": "10px" }}
            ml="1rem"
            textAlign="start"
          >
            Step {currentStepIndex + 1}
          </Text>

          {/* Main Box */}
          {getPage(currentStepIndex)}
          {/* Small Layout */}
          <Flex direction="row" justify="space-between" mt={4}>
            <Button
              colorScheme="blue"
              ml={2}
              mr={2}
              onClick={() => handleNextButtonClick()}
            >
              Next
            </Button>
          </Flex>
        </Card>
      </Grid>
    </Box>
  );
}
