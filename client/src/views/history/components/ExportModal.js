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
import { useRef, useState } from "react";

export default function ExportModal(props) {
  const { isExportModalVisible, toggleExportModalVisibility } = { ...props };
  const [exportFormats, setExportFormats] = useState([]);
  const cancelModalButtonRef = useRef();

  const handleExportFormatsChange = (format) => {
    if (exportFormats.includes(format)) {
      setExportFormats(exportFormats.filter((item) => item !== format));
    } else {
      setExportFormats([...exportFormats, format]);
    }
  };

  const handleExportAction = () => {
    console.log("Exporting transcripts: ", exportFormats);
    // WRAP EVERY API CALL With proper waiting states on UI
    toggleExportModalVisibility(false);
  };

  return (
    <Modal
      isCentered={true}
      initialFocusRef={cancelModalButtonRef}
      isOpen={isExportModalVisible}
      onClose={() => toggleExportModalVisibility(false)}
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
            onClick={() => toggleExportModalVisibility(false)}
          >
            Cancel
          </Button>
          <Button colorScheme="red" mr={3} onClick={() => handleExportAction()}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
