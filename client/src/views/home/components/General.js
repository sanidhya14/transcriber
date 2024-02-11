import { SimpleGrid, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import Information from "./Information";

export default function GeneralInformation(props) {
  const { ...rest } = props;
  const { informationDetails } = { ...props };

  return (
    <Card className="card">
      <Text className="general-card-header">
        Total Transcription Duration
      </Text>
      <Text className="general-information-card">
        {props.totalTranscriptionDuration}
      </Text>
      <SimpleGrid className="simple-grid">
        {informationDetails !== undefined
          ? informationDetails.map((element) => (
            <Information
              title={element.title}
              value={element.value}
              key={element}
            />
          ))
          : null}
      </SimpleGrid>
    </Card>
  );
}
