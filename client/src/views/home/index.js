/*!

Home Dashboard view.

*/

// Chakra imports
import {
    Avatar,
    Box,
    Grid,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue,
    GridItem,
  } from "@chakra-ui/react";
  // Assets
  import Usa from "assets/img/dashboards/usa.png";
  // Custom components
  import MiniCalendar from "components/calendar/MiniCalendar";
  import MiniStatistics from "components/card/MiniStatistics";
  import IconBox from "components/icons/IconBox";
  import React from "react";
  import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart,
    MdFileCopy,
  } from "react-icons/md";
  import CheckTable from "views/admin/default/components/CheckTable";
  import ComplexTable from "views/admin/default/components/ComplexTable";
  import DailyTraffic from "views/admin/default/components/DailyTraffic";
  import PieCard from "views/admin/default/components/PieCard";
  import Tasks from "views/admin/default/components/Tasks";
  import TotalSpent from "views/admin/default/components/TotalSpent";
  import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
  import {
    columnsDataCheck,
    columnsDataComplex,
  } from "views/admin/default/variables/columnsData";
  import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
  import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
  import GeneralInformation from "./components/General";
  import Banner from "./components/Banner";
  import ColumnsTable from "views/home/components/ColumnsTable";

  export default function Home() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Grid
         columns={2}
          gap='20px'
           mb='20px'
           templateRows="repeat(2, 1fr)"
           templateColumns="repeat(5, 1fr)"
        >
          <GridItem colSpan={3} rowSpan={1} > <Banner /> </GridItem>
          <GridItem colSpan={2} rowSpan={1} >
          <GeneralInformation
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='100px'
          pe='20px'
          // API Call to get below configs
          totalTranscriptionMinutes="109.58 minutes"
          informationDetails={[
            {
             title:'Files Transcribed',
             value:"10",
            }
          ]}
        />
          </GridItem>
          <GridItem colSpan={3} rowSpan={1} > 
          <ColumnsTable
          // API calls to fetch data
          tableData={[
            {
              "name":"Marketplace",
              "quantity": 2458, 
              "date": "12.Jan.2021",
              "progress": 75.5  
            },
            {
              "name":"Venus DB PRO",
              "quantity": 1485, 
              "date": "21.Feb.2021",
              "progress": 35.4  
            },
            {
              "name":"Venus DS",
              "quantity": 1024, 
              "date": "13.Mar.2021",
              "progress": 25  
            },
            {
              "name":"Venus 3D Asset",
              "quantity": 858, 
              "date": "24.Jan.2021",
              "progress": 100  
            }
          ]
          }
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
  