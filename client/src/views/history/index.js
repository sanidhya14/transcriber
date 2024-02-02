import { Box } from "@chakra-ui/react";
import TranscriptionHistory from "./components/TranscriptionHistory";
import Transcript from "./components/Transcript";
import { useState } from "react";

export default function History() {
  const [transcriptVisibility, setTranscriptVisibility] = useState(false);
  const [activeTranscriptId, setActiveTranscriptId] = useState(0);

  const handleTranscriptVisibility = (transcriptId, flag) => {
    setActiveTranscriptId(transcriptId);
    setTranscriptVisibility(flag);
  };

  return (
    <Box pt={{ base: "30px", md: "30px", xl: "30px" }}>
      {transcriptVisibility ? (
        // Pass the transcript Id here.
        // Backend call will be made to fetch the corresponding transcript
        <Transcript
          handleTranscriptVisibility={handleTranscriptVisibility}
          activeTranscriptId={activeTranscriptId}
        />
      ) : (
        <TranscriptionHistory
          height="100%"
          width="100%"
          // Add Routing logic here, to route to transcript page on clicking a row in table
          handleTranscriptVisibility={(transcriptId) =>
            handleTranscriptVisibility(transcriptId)
          }
        />
      )}
    </Box>
  );
}
