import React from "react";
import {
  Box,
  Flex,
  Heading,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Spacer,
} from "@chakra-ui/react";
import {
  INPUT_LANGUAGE,
  TRANSCRIPTION_MODES,
  EXPORT_FORMATS,
} from "constants/JobConstants";

export default function RunOptions(props) {
  const {
    audioLanguage,
    handleAudioLanguageChange,
    transcriptionMode,
    handleTranscriptionModeChange,
    outputLocation,
    handleOutputLocationChange,
    outputFormats,
    handleOutputFormatsChange,
    enableSpeakerIdentification,
    toggleSpeakerIdentification,
    enableWordLevelTimestamps,
    toggleWordLevelTimestamps,
  } = props;

  /** PUT ACTUAL HIGHLIGHT COLOR */
  const highlightColor = "pink";

  return (
    <Box className="run-options-container">
      <Heading className="heading">
        Primary Options
      </Heading>
      <FormControl className="form-control">
        <Flex className="justifly-flex">
          <FormLabel className="form-label" >Audio Language</FormLabel>
          <Select
            className="select"
            // Hack for now
            w="20%"
            variant="outline"
            colorScheme={highlightColor}
            value={audioLanguage}
            onChange={(e) => handleAudioLanguageChange(e.target.value)}
          >
            {Object.entries(INPUT_LANGUAGE).map(([key, value]) => {
              return (
                <option key={key} value={key}>
                  {value}
                </option>
              );
            })}
          </Select>
        </Flex>
      </FormControl>
      <FormControl className="form-control">
        <FormLabel className="form-label">Transcription Mode</FormLabel>
        <RadioGroup
          className="radio-group"
          value={transcriptionMode}
          onChange={(e) => handleTranscriptionModeChange(e.value)}
        >
          <Stack spacing={2}>
            {Object.entries(TRANSCRIPTION_MODES).map(([key, value]) => {
              return (
                <Radio key={key} value={key} className="radio" colorScheme={highlightColor}>
                  {value}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
      </FormControl>

      <Heading className="heading">
        Export Options
      </Heading>
      <FormControl className="form-control">
        <Flex className="flex-container">
          <FormLabel className="form-label">Output Location</FormLabel>
          <Spacer className="spacer" />
          <Flex>
            {/* <Button
              w="200px"
              mr="20px"
              onClick={() => handleOutputLocationChange()}
            >
              Select Location
            </Button> */}
            <Input className="input"
              isDisabled={false}
              value={outputLocation}
              onChange={(event) =>
                handleOutputLocationChange(event.target.value)
              }
            />
          </Flex>
        </Flex>
      </FormControl>
      <FormControl className="form-control">
        <FormLabel className="form-label">Output formats</FormLabel>
        <Stack spacing={2}>
          {Object.entries(EXPORT_FORMATS).map(([key, value]) => {
            return (
              <Checkbox className="checkbox"
                colorScheme={highlightColor}
                key={key}
                isChecked={outputFormats.includes(key)}
                onChange={() => handleOutputFormatsChange(key)}
              >
                {value}
              </Checkbox>
            );
          })}
        </Stack>
      </FormControl>

      <Heading className="heading">
        Advanced Options
      </Heading>
      <FormControl className="form-control">
        <Flex className="justifly-flex">
          <FormLabel className="form-label">Speaker Identification</FormLabel>
          <Switch className="switch"
            colorScheme={highlightColor}
            isChecked={enableSpeakerIdentification}
            onChange={() =>
              toggleSpeakerIdentification(!enableSpeakerIdentification)
            }
          />
        </Flex>

      </FormControl>
      <FormControl className="form-control">
        <Flex className="justifly-flex">
          <FormLabel className="form-label">Word Level Timestamps</FormLabel>
          <Switch className="switch"
            colorScheme={highlightColor}
            isChecked={enableWordLevelTimestamps}
            onChange={() => toggleWordLevelTimestamps(!enableWordLevelTimestamps)}
          />
        </Flex>
      </FormControl>
    </Box>
  );
}
