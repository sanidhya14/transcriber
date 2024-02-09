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
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { PAGE_SIZE } from "constants/TranscriptionHistoryConstants.js";
import Card from "components/card/Card";

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

  const moment = require("moment");
  const convertEpochToDate = (epochTimestamp) => {
    return moment.unix(epochTimestamp).format("Do MMM, YYYY");
  };

  const handleRowClick = (row) => {
    // route to transription viewer here
    //console.log("Row clicked: ", row.original);
  };

  return (
    <Card className="card">
      <Table {...getTableProps()} variant="simple" className="table">
        <Thead className="thead">
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index} className="tr">
              {headerGroup.headers.map((column, index) => (
                <Th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="th"
                >
                  <Flex
                    className="header-flex"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} className="tbody">
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr className="tr"
                key={index}
                {...row.getRowProps()}
                onClick={() => handleRowClick(row)}
              >
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Flex>
                        <Checkbox
                          className="checkbox-container"
                          colorScheme="pink"
                          isChecked={selectedItems.includes(row)}
                          onChange={(e) => handleTableItemSelection(e, row)}
                        />
                        <Text className="text-container">
                          {cell.value[0]}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "LANGUAGE") {
                    data = (
                      <Flex>
                        <Text
                          className="text-container"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DURATION") {
                    data = (
                      <Text className="text-container">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "CREATED") {
                    data = (
                      <Text className="text-container">
                        {/* This should be done while fetching from backend */}
                        {convertEpochToDate(cell.value)}
                      </Text>
                    );
                  } else if (cell.column.Header === "LAST UPDATED") {
                    data = (
                      <Text className="text-container">
                        {/* This should be done while fetching from backend */}
                        {convertEpochToDate(cell.value)}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      className="td"
                      {...cell.getCellProps()}
                      key={index}
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

      <Flex className="pagination">
        <Button
          className="button"
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
          variant="hidden"
        >
          Prev
        </Button>
        {pageOptions.map((pageOption) => (
          <Button
            className="button"
            key={pageOption}
            onClick={() => gotoPage(pageOption)}
            variant="hidden"
            fontWeight={pageOption === pageCount ? "bold" : "normal"}
          >
            {pageOption + 1}
          </Button>
        ))}
        <Button
          className="button"
          disabled={!canNextPage}
          onClick={() => nextPage()}
          variant="link"
        >
          Next
        </Button>
      </Flex>
    </Card>
  );
}
