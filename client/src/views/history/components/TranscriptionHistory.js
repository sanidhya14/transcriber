import {
  Button,
  Flex,
  Spacer,
  Text,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ActionConfirmation from "components/modals/ActionConfirmation";
import { ACTION_CONFIRMATION_TYPE } from "constants/ModalConstants";
import { TRANSCRIPTS_FETCH_STATUS } from "constants/TranscriptionHistoryConstants";
import { IoRefreshOutline } from "react-icons/io5";
import TranscriptHistoryTable from "./TranscriptHistoryTable";
import Loading from "components/progress/Loading";
import ExportModal from "./ExportModal";

const INITIAL_STATE = {
  transcriptsFetchStatus: TRANSCRIPTS_FETCH_STATUS.REQUESTED,
  isDeleteTranscriptsModalVisible: false,
  selectedTranscripts: [],
  transcripts: [],
  isExportModalVisible: false,
};

function initializeState(initialState) {
  return Object.keys(initialState).reduce((state, key) => {
    const [value, setValue] = useState(initialState[key]);
    state[key] = value;
    state[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = setValue;
    return state;
  }, {});
}

export default function TranscriptionHistory(props) {

  const state = initializeState(INITIAL_STATE);

  const {
    transcriptsFetchStatus,
    setTranscriptsFetchStatus,
    isDeleteTranscriptsModalVisible,
    setIsDeleteTranscriptsModalVisible,
    selectedTranscripts,
    setSelectedTranscripts,
    transcripts,
    setTranscripts,
    isExportModalVisible,
    setIsExportModalVisible,
  } = state;

  const toggleExportModalVisibility = (flag) => {
    setIsExportModalVisible(flag);
  };

  const toggleDeleteTranscriptsModalVisibility = (flag) => {
    setIsDeleteTranscriptsModalVisible(flag);
  };

  const confirmDeleteTranscripts = () => {
    console.log("Deleting Selected Transcripts: " + JSON.stringify());
    setTranscriptsFetchStatus(TRANSCRIPTS_FETCH_STATUS.REQUESTED);
  };

  const handleRefreshButtonClick = () => {
    setTranscriptsFetchStatus(TRANSCRIPTS_FETCH_STATUS.REQUESTED);
  };

  const handleExportTranscriptsButtonClick = () => {
    toggleExportModalVisibility(true);
  };

  const handleDeleteTranscriptsButtonClick = () => {
    toggleDeleteTranscriptsModalVisibility(true);
  };

  // FETCH from Backend mocking for now.
  const fetchTranscripts = () => {
    console.log("Fetching Transcripts from backend");
    new Promise((resolve) => setTimeout(resolve, 4000)).then(() => {
      console.log("Done!");
      setTranscripts([
        {
          id: 1,
          name: ["Marketplace", false],
          language: "English",
          duration: "18m",
          created: "1604520829",
          lastUpdated: "1632525229",
        },
        {
          id: 2,
          name: ["Venus DB PRO", true],
          language: "English",
          duration: "18m",
          created: "1604520829000",
          lastUpdated: "1632525229000",
        },
        {
          id: 3,
          name: ["Marketplace", false],
          language: "English",
          duration: "18m",
          created: "1604520829000",
          lastUpdated: "1632525229000",
        },
        {
          id: 4,
          name: ["Venus DB PRO", true],
          language: "English",
          duration: "18m",
          created: "1604520829000",
          lastUpdated: "1632525229000",
        },
        {
          id: 5,
          name: ["Marketplace", false],
          language: "English",
          duration: "18m",
          created: "1604520829000",
          lastUpdated: "1632525229000",
        },
        {
          id: 6,
          name: ["Venus DB PRO", true],
          language: "English",
          duration: "18m",
          created: "1604520829000",
          lastUpdated: "1632525229000",
        },
        {
          id: 7,
          name: ["Marketplace", false],
          language: "English",
          duration: "18m",
          created: "1604520829000",
          lastUpdated: "1632525229000",
        },
        {
          id: 8,
          name: ["Venus DB PRO", true],
          language: "English",
          duration: "18m",
          created: "1604520829000",
          lastUpdated: "1632525229000",
        },
      ]);
      setTranscriptsFetchStatus(TRANSCRIPTS_FETCH_STATUS.COMPLETED);
    });
  };

  //WRAPER for table data format from API backend call,
  //update according to new data contracts.
  const getTableDataFromTranscripts = () => {
    return transcripts;
  };

  const handleTableItemSelection = (event, row) => {
    if (event.target.checked) {
      setSelectedTranscripts([...selectedTranscripts, row]);
    } else {
      setSelectedTranscripts(
        selectedTranscripts.filter((rowItem) => rowItem !== row)
      );
    }
    console.log(selectedTranscripts);
  };

  useEffect(() => {
    if (transcriptsFetchStatus === TRANSCRIPTS_FETCH_STATUS.REQUESTED) {
      // Reset to INITIAL_STATE
      const initialStateKeys = Object.keys(INITIAL_STATE);
      initialStateKeys.forEach((key) => {
        if (state[key] !== INITIAL_STATE[key]) {
          state[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](
            INITIAL_STATE[key]
          );
        }
      });
      fetchTranscripts();
    } else if (transcriptsFetchStatus === TRANSCRIPTS_FETCH_STATUS.COMPLETED) {
    } else if (transcriptsFetchStatus === TRANSCRIPTS_FETCH_STATUS.FAILED) {
    }
  }, [transcriptsFetchStatus]);

  return (
    <Flex className="history-container">
      <Flex className="header">
        <Text
          className="header-text"
        >
          My Transcripts
        </Text>
        <Spacer />
        <IconButton
          className="action-buttons"
          disabled={
            transcriptsFetchStatus === TRANSCRIPTS_FETCH_STATUS.REQUESTED
          }
          icon={<IoRefreshOutline />}
          onClick={() => handleRefreshButtonClick()}
        />
        <Button
          className="action-buttons"
          disabled={
            transcriptsFetchStatus === TRANSCRIPTS_FETCH_STATUS.REQUESTED ||
            selectedTranscripts.length === 0
          }
          onClick={() => handleExportTranscriptsButtonClick()}
        >
          Export
        </Button>
        <Button
          className="action-buttons"
          disabled={
            transcriptsFetchStatus === TRANSCRIPTS_FETCH_STATUS.REQUESTED ||
            selectedTranscripts.length === 0
          }
          onClick={() => handleDeleteTranscriptsButtonClick()}
        >
          Delete
        </Button>
      </Flex>

      <Flex className="transcripts-container">
        {transcriptsFetchStatus === TRANSCRIPTS_FETCH_STATUS.REQUESTED ? (
          <Loading loadingText="Loading Transcripts" />
        ) : (
          <TranscriptHistoryTable
            transcriptsFetchStatus={transcriptsFetchStatus}
            tableData={getTableDataFromTranscripts()}
            handleTableItemSelection={(event, id) =>
              handleTableItemSelection(event, id)
            }
            selectedItems={selectedTranscripts}
          />
        )}

        <ExportModal
          isExportModalVisible={isExportModalVisible}
          toggleExportModalVisibility={toggleExportModalVisibility}
        />

        <ActionConfirmation
          confirmationType={ACTION_CONFIRMATION_TYPE.WARN}
          confirmnationHeading="Delete Transcripts"
          confirmnationMessage="Are you sure ? This will permanently delete the selected transcripts"
          isVisible={isDeleteTranscriptsModalVisible}
          toggleVisibility={(flag) =>
            toggleDeleteTranscriptsModalVisibility(flag)
          }
          handleConfirmation={() => confirmDeleteTranscripts()}
        />
      </Flex>
    </Flex>
  );
}
