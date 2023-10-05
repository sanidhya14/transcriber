import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import Card from "./components/Card";

export default function Settings() {
  const [defaultLanguage, setDefaultLanguage] = useState("Auto-Detect");
  const [transcriptionMode, setTranscriptionMode] = useState("Fast");
  const [outputFormats, setOutputFormats] = useState([]);
  const [speakerIdentification, setSpeakerIdentification] = useState(true);
  const [wordLevelTimestamps, setWordLevelTimestamps] = useState(true);
  const [autoCorrection, setAutoCorrection] = useState(false);
  const [profanityFiltering, setProfanityFiltering] = useState(false);
  const [completionNotification, setCompletionNotification] = useState(true);
  const [darkMode, setdarkMode] = useState(true);

  const handleDefaultLanguageChange = (value) => {
    setDefaultLanguage(value);
  };

  const handleTranscriptionModeChange = (value) => {
    setTranscriptionMode(value);
  };

  const handleOutputFormatChange = (format) => {
    if (outputFormats.includes(format)) {
      setOutputFormats(outputFormats.filter((item) => item !== format));
    } else {
      setOutputFormats([...outputFormats, format]);
    }
  };

  const handleSpeakerIdentificationChange = (flag) => {
    setSpeakerIdentification(flag);
  };

  const handleWordLevelTimestampsChange = (flag) => {
    setWordLevelTimestamps(flag);
  };

  const handleAutoCorrectionChange = (flag) => {
    setAutoCorrection(flag);
  };

  const handleProfanityFilteringChange = (flag) => {
    setProfanityFiltering(flag);
  };

  const handleCompletionNotificationChange = (flag) => {
    setCompletionNotification(flag);
  };

  const handleDarkModeChange = (flag) => {
    setdarkMode(flag);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} height="100vh">
      <Card p="1rem" height="80vh" width="100%" overflowY="auto">
        <Heading as="h2" size="md" mt={8} mb={4}>
          Run Settings
        </Heading>
        <FormControl display="flex" justifyContent="space-between" mb={4}>
          <FormLabel>Default Language</FormLabel>
          <Select
            value={defaultLanguage}
            onChange={(e) => handleDefaultLanguageChange(e.target.value)}
          >
            <option value="Auto-detect">Auto-detect</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            {/* Add other language options, progreamtaically take from db list*/}
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Transcription Mode</FormLabel>
          <RadioGroup
            value={transcriptionMode}
            onChange={handleTranscriptionModeChange}
          >
            <Stack spacing={2}>
              <Radio value="Fast">Fast</Radio>
              <Radio value="Balanced">Balanced</Radio>
              <Radio value="High Accuracy">High Accuracy</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <Heading as="h2" size="md" mt={8} mb={4}>
          Export
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Output formats</FormLabel>
          <Stack spacing={2}>
            <Checkbox
              isChecked={outputFormats.includes("txt")}
              onChange={() => handleOutputFormatChange("txt")}
            >
              txt
            </Checkbox>
            <Checkbox
              isChecked={outputFormats.includes("srt")}
              onChange={() => handleOutputFormatChange("srt")}
            >
              srt
            </Checkbox>
            <Checkbox
              isChecked={outputFormats.includes("vtt")}
              onChange={() => handleOutputFormatChange("vtt")}
            >
              vtt
            </Checkbox>
            <Checkbox
              isChecked={outputFormats.includes("json")}
              onChange={() => handleOutputFormatChange("json")}
            >
              json
            </Checkbox>
          </Stack>
        </FormControl>

        <Heading as="h2" size="md" mt={8} mb={4}>
          Post Processing
        </Heading>

        <FormControl display="flex" justifyContent="space-between" mb={4}>
          <FormLabel>Identify the speakers</FormLabel>
          <Switch
            isChecked={speakerIdentification}
            onChange={() =>
              handleSpeakerIdentificationChange(!speakerIdentification)
            }
          />
        </FormControl>

        <FormControl display="flex" justifyContent="space-between" mb={4}>
          <FormLabel>Detect Word Level Timestamps</FormLabel>
          <Switch
            isChecked={wordLevelTimestamps}
            onChange={() =>
              handleWordLevelTimestampsChange(!wordLevelTimestamps)
            }
          />
        </FormControl>

        <FormControl display="flex" justifyContent="space-between" mb={4}>
          <FormLabel>Do Auto-corrections and punctuations</FormLabel>
          <Switch
            isChecked={autoCorrection}
            onChange={() => handleAutoCorrectionChange(!autoCorrection)}
          />
        </FormControl>

        <FormControl display="flex" justifyContent="space-between" mb={4}>
          <FormLabel>Enable Profanity filtering</FormLabel>
          <Switch
            isChecked={profanityFiltering}
            onChange={() => handleProfanityFilteringChange(!profanityFiltering)}
          />
        </FormControl>

        <Heading as="h2" size="md" mt={8} mb={4}>
          Notifications
        </Heading>

        <FormControl display="flex" justifyContent="space-between" mb={4}>
          <FormLabel>Notify on transcription job completion</FormLabel>
          <Switch
            isChecked={completionNotification}
            onChange={() =>
              handleCompletionNotificationChange(!completionNotification)
            }
          />
        </FormControl>

        <Heading as="h2" size="md" mt={8} mb={4}>
          Themes
        </Heading>

        <FormControl display="flex" justifyContent="space-between" mb={4}>
          <FormLabel>Enable dark mode</FormLabel>
          <Switch
            isChecked={darkMode}
            onChange={() => handleDarkModeChange(!darkMode)}
          />
        </FormControl>

        <Heading as="h2" size="md" mt={8} mb={4}>
          Storage
        </Heading>

        <FormControl display="flex" justifyContent="space-between" mb={4}>
          <FormLabel>Cached assets</FormLabel>
          <Button mb={4}>Download All</Button>
          <Button mb={4}>Clear All</Button>
        </FormControl>
      </Card>
    </Box>
  );
}

/**
 *  Primary Preferrences
 *  Default Language: [Select]
 *  Transcription Mode: [Radio]
 *
 *  Export
 *  Default Location: [File selector]
 *  Output Formats: [Checkboxes]
 *
 *  Post-Processing:
 *  Identify speakers [Toggle]
 *  Identify Word level timestamps [Toggle]
 *  Punctuation [Toggle]
 *  Profanity Filter [Toggle]
 *
 *  Notifications:
 *  Notify on transcription completion: [Toggle]
 *
 *  Themes
 *  Dark mode: [Toggle]
 *
 *  Storage
 *  Cached Assets (Download All) (Clear All)
 *
 */
