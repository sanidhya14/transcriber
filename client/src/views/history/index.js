import { Box } from "@chakra-ui/react";
import TranscriptionHistory from "./components/TranscriptionHistory";
import Transcript from "./components/Transcript";
import { useState } from "react";
import Card from "components/card/Card";

export default function History() {
  const [transcriptVisibility, setTranscriptVisibility] = useState(true);
  const [activeTranscriptId, setActiveTranscriptId] = useState(0);

  const handleTranscriptVisibility = (transcriptId, flag) => {
    setActiveTranscriptId(transcriptId);
    setTranscriptVisibility(flag);
  };

  return (
    <Box className="page-container">
      {transcriptVisibility ? (
        // Pass the transcript Id here.
        // Backend call will be made to fetch the corresponding transcript
        <Transcript
          handleTranscriptVisibility={handleTranscriptVisibility}
          activeTranscriptId={activeTranscriptId}
        />
      ) : (
          <TranscriptionHistory
            // Add Routing logic here, to route to transcript page on clicking a row in table
            handleTranscriptVisibility={(transcriptId) =>
              handleTranscriptVisibility(transcriptId)
            }
          />
      )}
    </Box>
  );
}
