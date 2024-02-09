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
import Card from "components/card/Card";

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
    <Box className="page-container">
      <Box className="settings-container">
        <Card className="card">
          <Heading className="heading">
            Run Settings
          </Heading>
          <FormControl className="form-control">
            <FormLabel className="form-label">Default Language</FormLabel>
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
          <FormControl className="form-control">
            <FormLabel className="form-label">Transcription Mode</FormLabel>
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
        </Card>

        <Card className="card">
          <Heading className="heading">
            Export
          </Heading>
          <FormControl className="form-control">
            <FormLabel className="form-label">Output formats</FormLabel>
            <Stack className="checkbox-stack">
              <Checkbox
                className="checkbox"
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
        </Card>

        <Card className="card">
          <Heading className="heading">
            Post Processing
          </Heading>

          <FormControl className="form-control">
            <FormLabel className="form-label">Identify the speakers</FormLabel>
            <Switch
              className="switch"
              isChecked={speakerIdentification}
              onChange={() =>
                handleSpeakerIdentificationChange(!speakerIdentification)
              }
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel className="form-label">Detect Word Level Timestamps</FormLabel>
            <Switch
              className="switch"
              isChecked={wordLevelTimestamps}
              onChange={() =>
                handleWordLevelTimestampsChange(!wordLevelTimestamps)
              }
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel className="form-label">Do Auto-corrections and punctuations</FormLabel>
            <Switch
              isChecked={autoCorrection}
              onChange={() => handleAutoCorrectionChange(!autoCorrection)}
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel className="form-label">Enable Profanity filtering</FormLabel>
            <Switch
              isChecked={profanityFiltering}
              onChange={() => handleProfanityFilteringChange(!profanityFiltering)}
            />
          </FormControl>
        </Card>

        <Card className="card">
          <Heading className="heading">
            Notifications
          </Heading>

          <FormControl className="form-control">
            <FormLabel className="form-label">Notify on transcription job completion</FormLabel>
            <Switch
              isChecked={completionNotification}
              onChange={() =>
                handleCompletionNotificationChange(!completionNotification)
              }
            />
          </FormControl>
        </Card>

        <Card className="card">
          <Heading className="heading">
            Themes
          </Heading>

          <FormControl className="form-control">
            <FormLabel className="form-label">Enable dark mode</FormLabel>
            <Switch
              isChecked={darkMode}
              onChange={() => handleDarkModeChange(!darkMode)}
            />
          </FormControl>
        </Card>

        <Card className="card">
          <Heading className="heading">
            Storage
          </Heading>

          <FormControl className="form-control">
            <FormLabel className="form-label">Cached assets</FormLabel>
            <Button mb={4}>Download All</Button>
            <Button mb={4}>Clear All</Button>
          </FormControl>
        </Card>
      </Box>
    </Box >
  );
}
