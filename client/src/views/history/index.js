import { Box } from "@chakra-ui/react";
import CheckTable from "./components/CheckTable";
import Transcript from "./components/Transcript";

export default function History() {

    const transcript = true;

   const columnsDataCheck = [
        {
          Header: "NAME",
          accessor: "name",
        },
        {
          Header: "LANGUAGE",
          accessor: "language",
        },
        {
          Header: "DURATION",
          accessor: "duration",
        },
        {
          Header: "TIMESTAMP",
          accessor: "timestamp",
        },
      ];

    const tableData = [
        {
          "name":["Marketplace",false],
          "language": "English", 
          "duration": "18m",
          "timestamp": "Aug 11, 2023 . 7:20 PM"
        },
        {
          "name":["Venus DB PRO",true],
          "language": "English", 
          "duration": "18m",
          "timestamp": "Aug 11, 2023 . 7:20 PM"
        },
        {
          "name":["Venus DS",true],
          "language": "English", 
          "duration": "18m",
          "timestamp": "Aug 11, 2023 . 7:20 PM"
        },
        {
          "name":["Venus 3D Asset",true],
          "language": "English", 
          "duration": "18m",
          "timestamp": "Aug 11, 2023 . 7:20 PM" 
        },
        {
          "name":["Marketplace",false],
          "language": "English", 
          "duration": "18m",
          "timestamp": "Aug 11, 2023 . 7:20 PM"
        },
        {
          "name":["Marketplace",false],
          "language": "English", 
          "duration": "18m",
          "timestamp": "Aug 11, 2023 . 7:20 PM" 
        },
        {
          "name":["Marketplace",false],
          "language": "English", 
          "duration": "18m",
          "timestamp": "Aug 11, 2023 . 7:20 PM"
        }
    ];

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} height="100vh">
            {
                transcript === true ? <Transcript /> :< CheckTable columnsData={columnsDataCheck} tableData={tableData} />
            }
        </Box>
    );
}

/**
 * Columns -
 * Transcription name
 * TimeStamp
 * Language
 * Duration
 * Tags
 */

/** Buttons -
 *  Export 
 *  Edit
 *  Delete
 */