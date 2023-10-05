import React, { useState } from "react";
import {
  Box,
  Grid,
  Center,
  Flex,
  Text,
  Button,
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
} from "@chakra-ui/react";

import TimelineRow from "./components/TimelineRow";
import Card from "./components/Card.js";
import FileSelector from "./components/FileSelector";
import { GoCircle } from "react-icons/go";
import ProgressLabel from "./ProgressLabel";

export default function Transcribe() {
  const [audioLanguage, setAudioLanguage] = useState("Auto-detect");
  const [transcriptionMode, setTranscriptionMode] = useState("Fast");
  const [outputLocation, setOutputLocation] = useState("");
  const [outputFormats, setOutputFormats] = useState([]);
  const [speakerIdentification, setSpeakerIdentification] = useState(true);
  const [wordLevelTimestamps, setWordLevelTimestamps] = useState(true);
  const [setDefaultPreferences, setSetDefaultPreferences] = useState(false);

  const devPage = 2;

  const textColorSecondary = "gray.400";

  const timelineData = [
    {
      logo: GoCircle,
      title: "Select Audio File",
      date: "Loading audio file",
      color: "brand.300",
    },
    {
      logo: GoCircle,
      title: "Configure Options",
      date: "Fetching configurations",
      color: "grey.300",
    },
    {
      logo: GoCircle,
      title: "Transcibe",
      date: "Running model",
      color: "orange.300",
    },
  ];

  const handleOutputFormatChange = (format) => {
    if (outputFormats.includes(format)) {
      setOutputFormats(outputFormats.filter((item) => item !== format));
    } else {
      setOutputFormats([...outputFormats, format]);
    }
  };

  const getPage = (devPage) => {
    switch (devPage) {
      case 0:
        return (
          <Card p="1rem" height="100%" width="100%">
            <FileSelector height="100%" width="100%"></FileSelector>
          </Card>
        );

      case 1:
        return (
          <Card p="1rem" height="80vh" width="100%" overflowY="auto">
            <Heading as="h2" size="md" mb={4}>
              Primary Options
            </Heading>
            <FormControl mb={4}>
              <FormLabel>Audio Language</FormLabel>
              <Select
                value={audioLanguage}
                onChange={(e) => setAudioLanguage(e.target.value)}
              >
                <option value="Auto-detect">Auto-detect</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                {/* Add other language options */}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Transcription Mode</FormLabel>
              <RadioGroup
                value={transcriptionMode}
                onChange={setTranscriptionMode}
              >
                <Stack spacing={2}>
                  <Radio value="Fast">Fast</Radio>
                  <Radio value="Balanced">Balanced</Radio>
                  <Radio value="High Accuracy">High Accuracy</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Heading as="h2" size="md" mt={8} mb={4}>
              Export Options
            </Heading>
            <FormControl mb={4}>
              <FormLabel>Output Location</FormLabel>
              <Input
                value={outputLocation}
                onChange={(e) => setOutputLocation(e.target.value)}
              />
            </FormControl>
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
              Advanced Options
            </Heading>
            <Button mb={4}>Auto-Detect</Button>
            <FormControl display="flex" justifyContent="space-between" mb={4}>
              <FormLabel>Speaker Identification</FormLabel>
              <Switch
                isChecked={speakerIdentification}
                onChange={() =>
                  setSpeakerIdentification(!speakerIdentification)
                }
              />
            </FormControl>
            <FormControl display="flex" justifyContent="space-between" mb={4}>
              <FormLabel>Word Level Timestamps</FormLabel>
              <Switch
                isChecked={wordLevelTimestamps}
                onChange={() => setWordLevelTimestamps(!wordLevelTimestamps)}
              />
            </FormControl>

            <Checkbox
              isChecked={setDefaultPreferences}
              onChange={() => setSetDefaultPreferences(!setDefaultPreferences)}
            >
              Set as default preferences
            </Checkbox>
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
        <Card p="1rem" height="100%" width="100%">
          <Flex direction="column" p="1rem" mt="1rem">
            {timelineData.map((row, index, arr) => {
              return (
                <TimelineRow
                  logo={row.logo}
                  title={row.title}
                  date={row.date}
                  color={row.color}
                  index={index}
                  arrLength={arr.length}
                />
              );
            })}
          </Flex>
        </Card>
        <Card p="1rem" height="100%" width="100%">
          {/* header small step counter */}
          <Text
            color={textColorSecondary}
            fontSize="md"
            my={{ base: "auto", "2xl": "10px" }}
            ml="1rem"
            textAlign="start"
          >
            Step {devPage + 1}
          </Text>

          {/* Main Box */}
          {getPage(devPage)}
          {/* Small Layout */}
          <Flex direction="row" justify="space-between" mt={4}>
            <Button colorScheme="blue" ml={2} mr={2}>
              Next
            </Button>
          </Flex>
        </Card>
      </Grid>
    </Box>
  );
}
