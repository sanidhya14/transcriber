import React from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Spacer,
  IconButton,
  Icon,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import Card from "components/card/Card.js";
import Menu from "./MainMenu.js";

import {
  MdCalendarMonth,
  MdEdit,
  MdOutlineAccessTime,
} from "react-icons/md";

const Transcript = () => {
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
            <Heading fontSize="2xl">Aug Weekly Sync-up</Heading>
            <Spacer />
            <Button>
              <Icon as={MdEdit} width="20px" height="20px" color="inherit" />
              <Text fontSize="sm">Editor</Text>
            </Button>
            <Menu />
          </HStack>
          <HStack direction="row" mt="2rem" spacing={4}>
            <HStack direction="row">
              <Icon
                as={MdCalendarMonth}
                width="20px"
                height="20px"
                color="inherit"
              />
              <Text fontSize="sm">Fri, Aug 18, 2023 8:00 PM</Text>
            </HStack>
            <HStack direction="row">
              <Icon
                as={MdOutlineAccessTime}
                width="20px"
                height="20px"
                color="inherit"
              />
              <Text fontSize="sm">3:45</Text>
            </HStack>
          </HStack>
        </Card>

        {/* Transcription Section */}
        <Card p="1rem" height="100%" width="100%" overflowY="auto">
          {/* Speaker Transcript Cards */}
          <VStack spacing={8} alignItems="start" mt={4}>
            {/* Speaker row items */}
            <VStack alignItems="start">
              <HStack alignItems="center">
                <Avatar size="sm" src="speakerPhoto.jpg" />
                <Text fontWeight="bold">Speaker 1</Text>
                <Spacer />
                <Text fontSize="sm" color="gray.500">
                  00:00
                </Text>
              </HStack>
              <Text>
                Okay, we are starting the meeting now. Lets get started with it.
              </Text>
            </VStack>

            {/* Repeat the above structure for each speaker */}
            {/* Speaker 2 */}
            <VStack alignItems="start">
              <HStack alignItems="center">
                <Avatar size="sm" src="speakerPhoto.jpg" />
                <Text fontWeight="bold">Speaker 2</Text>
                <Spacer />
                <Text fontSize="sm" color="gray.500">
                  00:00
                </Text>
              </HStack>
              <Text>
                Yeah, so last week we were discussing on the weekly progress of
                the tasks. We want to track all of those now.
              </Text>
            </VStack>
            {/* Speaker 3 */}
            {/* ... */}
          </VStack>
        </Card>
      </Grid>

      {/* Audio Player Floater */}
      <Box
        position="fixed"
        bottom="0"
        right="40"
        width="50%"
        bg="white"
        boxShadow="lg"
        p={4}
        zIndex="1"
      >
        <HStack spacing={4} align="center">
          <IconButton aria-label="Rewind" icon={<Icon as={FaBackward} />} />
          <IconButton
            aria-label="Play"
            icon={<Icon as={FaPlay} />}
            colorScheme="teal"
          />
          <IconButton
            aria-label="Pause"
            icon={<Icon as={FaPause} />}
            colorScheme="teal"
          />
          <IconButton aria-label="Forward" icon={<Icon as={FaForward} />} />
        </HStack>
      </Box>
    </Box>
  );
};

export default Transcript;

/** Component View
 * This view is basically a component that will contain the transcription output performed on a given audio file with speaker diarization, timestamps, and audio playback with editing funcitonality on the text
 * 1. The component layout is a grid with 2 rows as card elements. Rows are spanned in the ratio of 2, 4 by heights and take all container width.
 * 2. The first row contains a heading text element, followed by two smaller text elements below it.
 * 3. The second row is basically the text output from the transcription with timestamps and speaker labelling. It wil be a list view with each row as a speaker labal on top with timestamp on the right and containig the text below. The speker lable should also contain a small icon on left for an icon or speaker photo.
 * 4. The botton side should also contain a small card layout which should be floating or clipped at bottom over the content below despite of any scrolling.
 * 5. This bottom floater should be a audio player view with corresponding buttons over it. Add these as per audio player designs in spotify or other music apps.
 */
