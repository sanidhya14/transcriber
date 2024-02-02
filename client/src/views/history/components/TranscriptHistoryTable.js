import {
  Button,
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { PAGE_SIZE } from "constants/TranscriptionHistoryConstants.js";

const COLUMNS_DATA = [
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
    Header: "CREATED",
    accessor: "created",
  },
  {
    Header: "LAST UPDATED",
    accessor: "lastUpdated",
  },
];

export default function TranscriptHistoryTable(props) {
  const { tableData, selectedItems, handleTableItemSelection } = props;

  const columns = useMemo(() => COLUMNS_DATA, [COLUMNS_DATA]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  } = tableInstance;

  initialState.pageSize = PAGE_SIZE;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const moment = require("moment");
  const convertEpochToDate = (epochTimestamp) => {
    return moment.unix(epochTimestamp).format("Do MMM, YYYY");
  };

  const handleRowClick = (row) => {
    // route to transription viewer here
    //console.log("Row clicked: ", row.original);
  };

  return (
    <Box>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr
                key={index}
                {...row.getRowProps()}
                onClick={() => handleRowClick(row)}
                style={{ cursor: "pointer" }}
              >
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Flex align="center" key={index}>
                        <Checkbox
                          isChecked={selectedItems.includes(row)}
                          onChange={(e) => handleTableItemSelection(e, row)}
                          colorScheme="brandScheme"
                          me="10px"
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value[0]}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "LANGUAGE") {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DURATION") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "CREATED") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {/* This should be done while fetching from backend */}
                        {convertEpochToDate(cell.value)}
                      </Text>
                    );
                  } else if (cell.column.Header === "LAST UPDATED") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {/* This should be done while fetching from backend */}
                        {convertEpochToDate(cell.value)}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      lineHeight="2"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Flex justify="end" px="25px" align="center">
        <Button
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
          variant="hidden"
          fontSize="14px"
          mr="2"
        >
          Prev
        </Button>
        {pageOptions.map((pageOption) => (
          <Button
            key={pageOption}
            onClick={() => gotoPage(pageOption)}
            variant="hidden"
            fontSize="14px"
            mr="2"
            fontWeight={pageOption === pageCount ? "bold" : "normal"}
          >
            {pageOption + 1}
          </Button>
        ))}
        <Button
          disabled={!canNextPage}
          onClick={() => nextPage()}
          variant="link"
          fontSize="14px"
          mr="2"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}
