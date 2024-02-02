import { useState, useEffect } from "react";
import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function AudioPlayer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audioElement = props.audio;
    audioElement.addEventListener("loadedmetadata", () => {
      setDuration(audioElement.duration);
    });

    audioElement.addEventListener("timeupdate", () => {
      setCurrentTime(audioElement.currentTime);
    });

    return () => {
      audioElement.removeEventListener("loadedmetadata", () => {});
      audioElement.removeEventListener("timeupdate", () => {});
    };
  }, [props.audio]);

  const togglePlay = () => {
    if (isPlaying) {
      props.audio.pause();
    } else {
      props.audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onSliderChange = (value) => {
    props.audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <Flex
      position="fixed"
      bottom="10px"
      left="50%"
      transform="translateX(-50%)"
      bg="white"
      p="10px"
      pl="20px"
      borderRadius="30px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
      alignItems="center"
      justifyContent="space-between"
      width="500px"
    >
      <IconButton
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        onClick={togglePlay}
        borderRadius="50%"
        bg="white"
        fontSize="1.5rem"
        aria-label={isPlaying ? "Pause" : "Play"}
        _hover={{ bg: "gray.300" }}
      />
      <Flex align="center" w="100%" ml="10px">
        <Text fontSize="sm" mr="15px">
          {formatTime(currentTime)}
        </Text>
        <Slider
          flex="1"
          min={0}
          max={duration}
          value={currentTime}
          onChange={onSliderChange}
          colorScheme="blue"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text fontSize="sm" ml="15px">
          {formatTime(duration)}
        </Text>
      </Flex>
    </Flex>
  );
}

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};
