import React from "react";
import { Button, Flex, Grid, Link, Text, Box, Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import banner from "assets/img/nfts/NftBanner1.png";

export default function Banner() {
  const [isTaskView, setIsTaskView] = React.useState(false);

  const toggleTaskView = (flag) => {
    setIsTaskView(!flag);
  };

  return (
    <Flex className="bannerFlex" bgImage={banner}>
      <Grid className="bannerGrid">
        {isTaskView === false ? (
          <Box className="bannerBox">
            <Text
              className="bannerHeading"
            >
              Getting Started
            </Text>
            <Text
              className="bannerDescriptionText"
            >
              Discover the World of Transcription and Uncover Endless
              Possibilities ! Start Transcribing Like a Pro !
            </Text>
          </Box>
        ) : (
          <Box className="bannerBox">
            <Text className="bannerHeading">
              Quick Tips
            </Text>
          </Box>
        )}
        <Flex className="banner-footer">
          <Button
            className="bannerButton"
            onClick={() => toggleTaskView(isTaskView)}
          >
            {isTaskView === false ? (
              "Discover now"
            ) : (
              <Icon
                as={MdArrowBack}
                width="20px"
                height="20px"
                color="inherit"
              />
            )}
          </Button>
          <Link
            href="https://www.youtube.com/watch?v=a6bLriHBL20"
            isExternal="true"
          >
            <Text className="banner-link">
              Watch video
            </Text>
          </Link>
        </Flex>
      </Grid>
    </Flex>
  );
}
