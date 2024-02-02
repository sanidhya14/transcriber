import React from "react";
import {
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import GeneralInformation from "./components/General";
import Banner from "./components/Banner";
import ColumnsTable from "views/home/components/ColumnsTable";

export default function Home() {

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        columns={2}
        gap="20px"
        mb="20px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem colSpan={3} rowSpan={1}>
          {" "}
          <Banner />{" "}
        </GridItem>
        <GridItem colSpan={2} rowSpan={1}>
          <GeneralInformation
            gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
            minH="100px"
            pe="20px"
            // API Call to get below configs
            totalTranscriptionMinutes="109.58 minutes"
            informationDetails={[
              {
                title: "Files Transcribed",
                value: "10",
              },
            ]}
          />
        </GridItem>
        <GridItem colSpan={3} rowSpan={1}>
          <ColumnsTable
            // API calls to fetch data
            tableData={[
              {
                name: "Marketplace",
                quantity: 2458,
                date: "12.Jan.2021",
                progress: 75.5,
              },
              {
                name: "Venus DB PRO",
                quantity: 1485,
                date: "21.Feb.2021",
                progress: 35.4,
              },
              {
                name: "Venus DS",
                quantity: 1024,
                date: "13.Mar.2021",
                progress: 25,
              },
              {
                name: "Venus 3D Asset",
                quantity: 858,
                date: "24.Jan.2021",
                progress: 100,
              },
            ]}
            columnsData={[
              {
                Header: "NAME",
                accessor: "name",
              },
              {
                Header: "PROGRESS",
                accessor: "progress",
              },
              {
                Header: "QUANTITY",
                accessor: "quantity",
              },
              {
                Header: "DATE",
                accessor: "date",
              },
            ]}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
