import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import GeneralInformation from "./components/General";
import Banner from "./components/Banner";

const INITIAL_STATE = {
  transcriptionUsageMetadata: {
    totalTranscriptionDuration: "122.4 minutes",
    detail: [
      {
        title: "Files Transcribed",
        value: "10",
      }
    ]
  },
};

function initializeState(initialState) {
  return Object.keys(initialState).reduce((state, key) => {
    const [value, setValue] = useState(initialState[key]);
    state[key] = value;
    state[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = setValue;
    return state;
  }, {});
}

export default function Home() {

  const state = initializeState(INITIAL_STATE);
  const {
    transcriptionUsageMetadata,
    setTranscriptionUsageMetadata,
  } = state;

  return (
    <Box className="page-container">
      <Grid className="home-main-grid">
        <GridItem className="banner-grid-item">
          <Banner />
        </GridItem>
        <GridItem className="usage-metrics-grid-item">
          <GeneralInformation
            totalTranscriptionDuration={transcriptionUsageMetadata.totalTranscriptionDuration}
            informationDetails={transcriptionUsageMetadata.detail}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
