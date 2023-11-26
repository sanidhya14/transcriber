import { Flex, Text, Button, Heading } from "@chakra-ui/react";
import ProgressLabel from "components/progress/ProgressLabel";
import ActionConfirmation from "components/modals/ActionConfirmation";
import { ACTION_CONFIRMATION_TYPE } from "constants/ModalConstants";

export default function TranscribeStatus(props) {
  const {
    statusDescription,
    statusPercentage,
    estimatedTimeRemaining,
    toggleCancelJobModalVisibility,
    isCancelJobModalVisible,
    cancelTranscriptionJob,
  } = {
    ...props,
  };

  return (
    <Flex direction="column" width="100%">
      <Flex justify="center" mt={4} mb={4}>
        <Heading as="h1" size="lg" color="gray.400" fontWeight="500">
          {statusDescription + "..."}
        </Heading>
      </Flex>
      <Flex width="100%" justify="center" mt={12}>
        <ProgressLabel
          startDegree={270}
          progress={statusPercentage / 2}
          //fillColor="rgb(248,247,243)"
          trackColor="#fff"
          progressColor="#ac884c"
          progressWidth={10}
          trackWidth={16}
          // trackBorderWidth={1}
          // trackBorderColor="rgb(232,223,209)"
          cornersWidth={5}
          size={300}
          text={statusPercentage + "%"}
          textProps={{
            x: "50%",
            y: "48%",
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
      </Flex>
      <Flex justify="center" mt={4} mb={4} direction="row">
        <Text color="gray.400" fontWeight="500" fontSize="lg">
          Estimated Time:
        </Text>
        <Text color="gray.400" fontWeight="500" fontSize="lg" ml={4}>
          {estimatedTimeRemaining}
        </Text>
      </Flex>
      <Flex direction="row" justify="center" mt={4} mb={4}>
        {statusPercentage === 100 ? (
          <Button colorScheme="blue">See Transcript</Button>
        ) : (
          <Button
            colorScheme="red"
            onClick={() => toggleCancelJobModalVisibility(true)}
          >
            Cancel
          </Button>
        )}
        <ActionConfirmation
          confirmationType={ACTION_CONFIRMATION_TYPE.WARN}
          confirmnationHeading="Cancel Transcription"
          confirmnationMessage="Are you sure ? You will loose any current job progress"
          isVisible={isCancelJobModalVisible}
          toggleVisibility={(flag) => toggleCancelJobModalVisibility(flag)}
          handleConfirmation={() => cancelTranscriptionJob()}
        />
      </Flex>
    </Flex>
  );
}
