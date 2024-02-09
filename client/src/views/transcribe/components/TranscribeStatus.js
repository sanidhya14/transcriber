import { Box, Flex, Text, Button, Heading, Progress } from "@chakra-ui/react";
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
    <Flex className="transcribe-status-container">
      <Heading className="heading">
        {statusDescription + "..."}
      </Heading>
      <Flex className="progress-bar">
        <Progress
          className="progress"
          value={statusPercentage}
          colorScheme="purple"
          flexGrow={1}
        />
        <Box className="label">
          {40}%
        </Box>
      </Flex>
      <Flex className="status-metadata-container">
        <Text className="text-container">
          Estimated time left:
        </Text>
        <Text className="text-container">
          {estimatedTimeRemaining}
        </Text>
      </Flex>
      <Flex className="button-container">
        {statusPercentage === 100 ? (
          <Button
            className="blue-button"
            variant="action"
          >See Transcript</Button>
        ) : (
          <Button
            className="red-button"
            variant="action"
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
