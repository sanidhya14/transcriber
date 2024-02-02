import { Flex, Text, Spinner, Center, VStack } from "@chakra-ui/react";
import { ICON_COLOR_LIGHT } from "constants/ThemeConstants";

export default function Loading(props) {
  const { loadingText } = props;

  return (
    <Center>
      <Flex>
        <VStack>
          <Text
            mr={4}
            mb={4}
            color={ICON_COLOR_LIGHT}
            fontSize="lg"
            fontWeight="700"
          >
            {loadingText}
          </Text>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="white"
            color={ICON_COLOR_LIGHT}
            size="xl"
          />
        </VStack>
      </Flex>
    </Center>
  );
}
