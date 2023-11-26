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
  FormControl,
  FormLabel,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { EXPORT_FORMATS } from "constants/JobConstants";
import { useRef } from "react";

export default function ExportModal(props) {
    
  const {
    isVisible,
    toggleVisibility,
    handleConfirmation,
    exportFormats,
    handleExportFormatsChange,
  } = props;

  const cancelModalButtonRef = useRef();

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
          <Flex>Export Transcriptions</Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody ml={12}>
          {
            <FormControl>
              <FormLabel>
                Select the output formats for the selected transcriptions
              </FormLabel>
              <Stack spacing={2}>
                {Object.entries(EXPORT_FORMATS).map(([key, value]) => {
                  return (
                    <Checkbox
                      key={key}
                      isChecked={exportFormats.includes(key)}
                      onChange={() => handleExportFormatsChange(key)}
                    >
                      {value}
                    </Checkbox>
                  );
                })}
              </Stack>
            </FormControl>
          }
        </ModalBody>
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
