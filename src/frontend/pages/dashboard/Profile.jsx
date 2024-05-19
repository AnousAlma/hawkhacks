'use client'

import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Text,
} from '@chakra-ui/react'
import { auth } from '../../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useEffect, useState } from 'react'

export default function Profile() {

  const [userAttempts, setUserAttempts] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [photoURL, setPhotoURL] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setUserScore(docSnap.data().score);
        setUserAttempts(docSnap.data().attempted);
        setPhotoURL(docSnap.data().photoURL);
        setUserName(docSnap.data().name);
      }
    });
  })

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Statistics
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={photoURL}>
              </Avatar>
            </Center>
            <Center w="full">
            </Center>
          </Stack>
        </FormControl>
        <FormControl>
          <FormLabel>User name</FormLabel>
          <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.300')}>
            {userName}
          </Text>
        </FormControl>
        <FormControl>
          <FormLabel>Attempted Questions</FormLabel>
          <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.300')}>
            {userAttempts}
          </Text>
        </FormControl>
        <FormControl>
          <FormLabel>Correct Answers</FormLabel>
          <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.300')}>
            {userScore}
          </Text>
        </FormControl>
      </Stack>
    </Flex>
  )
}