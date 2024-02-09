import { Flex, Text, Spinner, VStack } from "@chakra-ui/react";

export default function Loading(props) {
  const { loadingText } = props;

  return (
    <Flex className="loading-container">
      <VStack className="vstack-container">
        <Text
          className="loading-text"
        >
          {loadingText}
        </Text>
        <Spinner
          className="spinner"
          speed="0.45s"
        />
      </VStack>
    </Flex>
  );
}
