'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import Webcam from 'react-webcam'
import { useMediaQuery } from 'react-responsive'

const Card = ({ heading }) => {
    return (
        <Box
        maxW={{ base: 'full', md: '15vw' }}
        w={'full'}
        borderWidth="1px"
        borderColor={useColorModeValue('black', 'white')}
        borderRadius="lg"
        overflow="hidden"
        p={5}
        textAlign="center"
        >
            <Heading size="md">{heading}</Heading>
        </Box>
    )
    }

    export default function VideoQuestion() {

    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    return (
        <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
            How do you sign this?
            </Heading>
        </Stack>

        {/* <Img src="https://imageio.forbes.com/specials-images/imageserve/5ed6636cdd5d320006caf841/0x0.jpg?format=jpg&height=600&width=1200&fit=bounds" 
            alt="sign_language"
            width={{base:"90vw", md: "50vw"}}
            height={{base:"60vh" , md: "50vh"}}
            marginTop={{base: "5vh", md: "10vh"}}
            marginBottom="5vh"
            marginLeft="auto"
            marginRight="auto"
            borderRadius={10} 
            /> */}
            {isPortrait ? 
             <Box
             width={"90vw"}
             height={ "60vh"}
             marginTop={ "5vh"}
             marginBottom="5vh"
             marginLeft="auto"
             marginRight="auto"
             borderRadius={10}
         >
             <Webcam
                 audio={false}
                 height="60%"
                 width="60%"
                 mirrored={true}
                 style={{borderRadius: 10, marginLeft: "auto", marginRight: "auto"}}
             />
         </Box>
            : 
            <Box
                width={"50vw"}
                height={ "50vh"}
                marginTop={ "10vh"}
                marginBottom="5vh"
                marginLeft="auto"
                marginRight="auto"
                borderRadius={10}
            >
                <Webcam
                    audio={false}
                    height="50%"
                    width="60%"
                    mirrored={true}
                    style={{borderRadius: 10, marginLeft: "auto", marginRight: "auto"}}
                />
            </Box>}

        <Container maxW={'5xl'} mt={12}>
            <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Card
                heading={'Heading'}
            />
            </Flex>
        </Container>
        </Box>
    )
    }