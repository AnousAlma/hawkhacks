'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Img,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { auth } from '../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function Question() {

  const correctAnswer = 'Answer 1';
  const navigate = useNavigate();

  const Card = ({ heading, selected, correct }) => {
    let color = NaN;
    if (selected) {
      if (correct === 1) {
        color = 'green.500';
      }
      else if (correct === -1) {
        color = 'red.500';
      }
      else {
        color = 'blue.500';
      }
    }
    else if (correct === -1 && heading === correctAnswer) {
      color = 'green.500';
    }
    return (
      <Box
        maxW={{ base: 'full', md: '10vw' }}
        w={'full'}
        borderWidth="1px"
        borderColor={useColorModeValue('black', 'white')}
        borderRadius="lg"
        backgroundColor= {color}
        overflow="hidden"
        p={5}
        textAlign="center"
        onClick={handleClick}
        cursor= 'pointer'
        >
            <Heading size="sm">{heading}</Heading>
      </Box>
    )
  }


  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0); // 0 = not answered, 1 = correct, -1 = incorrect
  const [userScore, setUserScore] = useState(0);
  const [userAttempts, setUserAttempts] = useState(0);

  function handleClick(e) {
    setSelected(e.target.innerText);
  }

  function nextQuestion() {
    setUserAttempts((prevAttempts) => prevAttempts + 1);
    const docRef = doc(db, "users", auth.currentUser.uid);
    setDoc(docRef, {attempted: userAttempts + 1}, {merge: true});
    navigate('/play');
  }


  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setUserScore(docSnap.data().score);
        setUserAttempts(docSnap.data().attempted);
      }
    });
  })

  function checkAnswer() {
    if (selected === null) {
      setCorrect(0);
    }
    else if (selected === correctAnswer) {
      setCorrect(1);
      setUserScore((prevScore) => prevScore + 1);
      const docRef = doc(db, "users", auth.currentUser.uid);
      setDoc(docRef, {score: userScore + 1}, {merge: true});
    }
    else {
      setCorrect(-1);
    }
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const answers = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
  let [answersHTML, setAnswersHTML] = useState([]);
  let [shuffled_answers, setShuffledAnswers] = useState([]);
  useEffect(() => {  setShuffledAnswers(shuffle(answers));}, [])

  useEffect(() => {
    setAnswersHTML( shuffled_answers.map((answer) => {
      if (answer === selected) {
        return <Card heading={answer} selected={true} correct={correct}/>
      }
      return <Card heading={answer} selected={false} correct={correct}/>
    }))
  }, [selected, shuffled_answers, correct])


  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          What does this mean?
        </Heading>
      </Stack>

      <Img src="https://imageio.forbes.com/specials-images/imageserve/5ed6636cdd5d320006caf841/0x0.jpg?format=jpg&height=600&width=1200&fit=bounds" 
        alt="sign_language"
        width={{base:"90vw", md: "50vw"}}
        height={{base:"20vh" , md: "50vh"}}
        marginTop={'5vh'}
        marginBottom="5vh"
        marginLeft="auto"
        marginRight="auto"
        borderRadius={10} 
        />

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {answersHTML}
        </Flex>
      </Container>
      <Container
        width='100%'
        display='flex'
        justifyContent='center'
      >
     { correct === 0 &&  <Button
          bg={'green.500'}
          color={'white'}
          _hover={{
            bg: 'green.700',
          }}
          marginTop = "4vh"
          onClick={checkAnswer}
        >
          Check Answer
        </Button>}
        { (correct === 1 || correct === -1) && 
          <Button 
            bg='blue.500'
            color='white'
            _hover={{
              bg: 'blue.700',
            }}
            marginTop = "4vh"
            onClick={nextQuestion}
          >
            Continue
          </Button>
        }
      </Container>
    </Box>
  )
}