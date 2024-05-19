'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import Webcam from 'react-webcam'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'
import { auth } from '../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Card = ({ heading }) => {
    return (
        <Box
        maxW={{ base: 'full', md: '12vw' }}
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
    const [userAttempts, setUserAttempts] = useState(0);
    const [userScore, setUserScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUserScore(docSnap.data().score);
            setUserAttempts(docSnap.data().attempted);
          }
        });
      })

      function nextQuestion() {
        setUserAttempts((prevAttempts) => prevAttempts + 1);
        const docRef = doc(db, "users", auth.currentUser.uid);
        setDoc(docRef, {attempted: userAttempts + 1}, {merge: true});
        navigate('/play');
      }


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
            <Button 
                bg='blue.500'
                color='white'
                _hover={{
                bg: 'blue.700',
                }}
                marginTop = "4vh"
                onClick={nextQuestion}
            >
                Skip
            </Button>
            </Flex>
        </Container>
        </Box>
    )
    }