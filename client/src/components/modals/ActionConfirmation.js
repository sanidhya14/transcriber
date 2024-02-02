import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { ACTION_CONFIRMATION_TYPE } from "constants/ModalConstants";
import { useRef } from "react";
import {
  MdDoneOutline,
  MdErrorOutline,
  MdInfoOutline,
  MdWarningAmber,
} from "react-icons/md";

export default function ActionConfirmation(props) {
  const {
    confirmationType,
    confirmnationHeading,
    confirmnationMessage,
    isVisible,
    toggleVisibility,
    handleConfirmation,
  } = props;

  const cancelModalButtonRef = useRef();

  const getIconForConfirmationType = (confirmationType) => {
    if (confirmationType === ACTION_CONFIRMATION_TYPE.WARN) {
      return MdWarningAmber;
    } else if (confirmationType === ACTION_CONFIRMATION_TYPE.ERROR) {
      return MdErrorOutline;
    } else if (confirmationType === ACTION_CONFIRMATION_TYPE.SUCCESS) {
      return MdDoneOutline;
    }
    return MdInfoOutline;
  };

  return (
    <Modal
      isCentered={true}
      initialFocusRef={cancelModalButtonRef}
      isOpen={isVisible}
      onClose={() => toggleVisibility(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex>
            <Icon
              mr={4}
              as={getIconForConfirmationType(confirmationType)}
              boxSize="8"
            />
            {confirmnationHeading}
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody ml={12}>{confirmnationMessage}</ModalBody>
        <ModalFooter>
          <Button
            ref={cancelModalButtonRef}
            variant="ghost"
            onClick={() => toggleVisibility(false)}
          >
            Cancel
          </Button>
          <Button colorScheme="red" mr={3} onClick={() => handleConfirmation()}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
