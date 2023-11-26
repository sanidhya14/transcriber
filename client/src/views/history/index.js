import { Box } from "@chakra-ui/react";
import TranscriptionHistory from "./components/TranscriptionHistory";
import Transcript from "./components/Transcript";

export default function History() {
  const transcript = false;

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {transcript === true ? (
        <Transcript />
      ) : (
        <TranscriptionHistory
          height="100%"
          width="100%"
        />
      )}
    </Box>
  );
}
