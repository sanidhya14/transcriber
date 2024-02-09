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
  const [duration, setDuration] = useState(120);

  useEffect(() => {
    const audioElement = props.audio;
    audioElement.addEventListener("loadedmetadata", () => {
      setDuration(audioElement.duration);
    });

    audioElement.addEventListener("timeupdate", () => {
      setCurrentTime(audioElement.currentTime);
    });

    return () => {
      audioElement.removeEventListener("loadedmetadata", () => { });
      audioElement.removeEventListener("timeupdate", () => { });
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
    <Flex className="audio-player-container">
      <IconButton
        className="icon-button"
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      />
      <Flex className="play-container">
        <Text className="text-container">
          {formatTime(currentTime)}
        </Text>
        <Slider
          className="slider-container"
          // Hack for now
          colorScheme="pink"
          min={0}
          max={duration}
          value={currentTime}
          onChange={onSliderChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text className="text-container">
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
