import React from "react";
import {
  Box,
  Button,
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

  return (
    <Box>
      <Heading as="h2" size="md" mb={4}>
        Primary Options
      </Heading>
      <FormControl>
        <Flex>
          <FormLabel>Audio Language</FormLabel>
          <Spacer />
          <Select
            w="150px"
            value={audioLanguage}
            onChange={(e) => handleAudioLanguageChange(e.target.value)}
          >
            {Object.entries(INPUT_LANGUAGE).map(([key, value]) => {
              return <option value={key}>{value}</option>;
            })}
          </Select>
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel>Transcription Mode</FormLabel>
        <RadioGroup
          value={transcriptionMode}
          onChange={(e) => handleTranscriptionModeChange(e.value)}
        >
          <Stack spacing={2}>
            {Object.entries(TRANSCRIPTION_MODES).map(([key, value]) => {
              return <Radio value={key}>{value}</Radio>;
            })}
          </Stack>
        </RadioGroup>
      </FormControl>

      <Heading as="h2" size="md" mt={8} mb={4}>
        Export Options
      </Heading>
      <FormControl>
        <Flex>
          <FormLabel>Output Location</FormLabel>
          <Spacer />
          <Flex>
            <Button
              w="200px"
              mr="20px"
              onClick={() => handleOutputLocationChange()}
            >
              Select Location
            </Button>
            <Input isDisabled={true} value={outputLocation} />
          </Flex>
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel>Output formats</FormLabel>
        <Stack spacing={2}>
          {Object.entries(EXPORT_FORMATS).map(([key, value]) => {
            return (
              <Checkbox
                isChecked={outputFormats.includes(key)}
                onChange={() => handleOutputFormatsChange(key)}
              >
                {value}
              </Checkbox>
            );
          })}
        </Stack>
      </FormControl>

      <Heading as="h2" size="md" mt={8} mb={4}>
        Advanced Options
      </Heading>
      <FormControl display="flex" justifyContent="space-between">
        <FormLabel>Speaker Identification</FormLabel>
        <Switch
          isChecked={enableSpeakerIdentification}
          onChange={() =>
            toggleSpeakerIdentification(!enableSpeakerIdentification)
          }
        />
      </FormControl>
      <FormControl display="flex" justifyContent="space-between">
        <FormLabel>Word Level Timestamps</FormLabel>
        <Switch
          isChecked={enableWordLevelTimestamps}
          onChange={() => toggleWordLevelTimestamps(!enableWordLevelTimestamps)}
        />
      </FormControl>
    </Box>
  );
}
