import React from "react";

// Chakra imports
import { Button, Flex, Grid, Link, Text, Box, Icon } from "@chakra-ui/react";

import {
  MdArrowBack,
} from "react-icons/md";

// Assets
import banner from "assets/img/nfts/NftBanner1.png";

export default function Banner() {

  const [isTaskView, setIsTaskView] = React.useState(false);

  const toggleTaskView = (flag) => {
    setIsTaskView(!flag);
  }

  return (
    <Flex
      direction='column'
      height="300px"
      bgImage={banner}
      bgSize='cover'
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius='30px'>
      <Grid templateRows="repeat(2, 1fr)" gap="20px">
        {isTaskView === false ? <Box h="100px">
          <Text
            fontSize={{ base: "24px", md: "34px" }}
            color='white'
            mb='14px'
            maxW={{
              base: "100%",
              md: "64%",
              lg: "46%",
              xl: "70%",
              "2xl": "50%",
              "3xl": "42%",
            }}
            fontWeight='700'
            lineHeight={{ base: "32px", md: "42px" }}>
            Getting Started
          </Text>
          <Text
            fontSize='md'
            color='#E3DAFF'
            maxW={{
              base: "100%",
              md: "64%",
              lg: "40%",
              xl: "70%",
              "2xl": "46%",
              "3xl": "34%",
            }}
            fontWeight='500'
            mb='40px'
            lineHeight='28px'>
            Discover the World of Transcription and Uncover Endless Possibilities ! Start Transcribing Like a Pro !
          </Text>
        </Box>
          : <Box h="100px">
            <Text
              fontSize={{ base: "24px", md: "34px" }}
              color='white'
              mb='14px'
              maxW={{
                base: "100%",
                md: "64%",
                lg: "46%",
                xl: "70%",
                "2xl": "50%",
                "3xl": "42%",
              }}
              fontWeight='700'
              lineHeight={{ base: "32px", md: "42px" }}>
              V2
            </Text>
          </Box>}
        <Flex align='center'>
          <Button
            bg='white'
            color='black'
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            fontWeight='500'
            fontSize='14px'
            py='20px'
            px='27'
            me='38px'
            w="130px"
            onClick={() => toggleTaskView(isTaskView)}
          >
            {isTaskView === false ? 'Discover now' : <Icon as={MdArrowBack} width='20px' height='20px' color='inherit' />}
          </Button>
          <Link
            href="https://www.youtube.com/watch?v=a6bLriHBL20"
            isExternal="true"
          >
            <Text color='white' fontSize='sm' fontWeight='500'>
              Watch video
            </Text>
          </Link>
        </Flex>
      </Grid>
    </Flex>
  );
}
