import React, { useState } from "react";
import {
    Flex,
    Text,
    VStack,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { IoMicCircleSharp } from "react-icons/io5";
import { ReactMediaRecorder } from "react-media-recorder";
import { FaPauseCircle, FaPlayCircle, FaStopCircle } from "react-icons/fa";
import AudioVisualizer from "./AudioVisualizer";

export default function AudioRecorder() {

    const [recordingTime, setRecordingTime] = useState(0);

    return (
        <ReactMediaRecorder
            render={({ status, startRecording, pauseRecording, resumeRecording, stopRecording, previewAudioStream, mediaBlobUrl }) => (
                <Flex onClick={(status !== "recording") && (status !== "paused") ? startRecording : null} className="audio-recorder-viewer">
                    {(status !== "recording") && (status !== "paused") ? (
                        <VStack className="file-selector-icon-container">
                            <IoMicCircleSharp className="file-selector-icon" />
                            <Text className="file-selector-main-text">
                                Record
                            </Text>
                            <Text className="file-selector-secondary-text">
                                Easily record your voice now
                            </Text>
                        </VStack>
                    ) : (
                        <Grid className="audio-recorder-container-main">
                            <GridItem className="border">
                                <Flex className="recording-time">
                                    <Text>{formatTime(recordingTime)}</Text>
                                </Flex>
                            </GridItem>
                            <GridItem className="audio-waveform-container">
                                <AudioVisualizer audioStream={previewAudioStream} className="audio-visualizer"/>
                            </GridItem>
                            <GridItem className="border">
                                <Flex className="audio-recorder-control-buttons-container">
                                    {status === "recording" ? <FaPauseCircle className="pause-button" onClick={pauseRecording} />
                                        : <FaPlayCircle className="pause-button" onClick={resumeRecording} />}
                                    <FaStopCircle className="stop-button" onClick={stopRecording} />
                                </Flex>
                            </GridItem>
                        </Grid>
                    )}
                </Flex>
            )}
        />
    );
}

// Function to format recording time in HH:MM:SS format
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
