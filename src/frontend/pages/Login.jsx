import { signInWithGooglePopup, is_logged_in } from "../firebase/firebase"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'


  export const Login = () => {

    let navigate = useNavigate();
    const logGoogleUser = async () => {
      try {
        await signInWithGooglePopup();
        navigate("/home")
      }
      catch (error) {
        console.log(error)
      }
    }

    const navigate_to_home = () => {
      navigate("/home")
    }

    useEffect(() => {
      is_logged_in().then((res) => {
        if (res) {
          navigate_to_home()
        }
      })
    });
    
    
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        backgroundImage={'url(https://img.freepik.com/free-vector/blue-speed-comic-style-background_23-2148820924.jpg)'}
        backgroundRepeat={'no-repeat'}
        backgroundSize={'cover'}
        >
        <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'white')}
            boxShadow={'lg'}
            height={'200%'}
            width={'60%'}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'} color="black">Sign in using google</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  Start learning!
                </Text>
              </Stack>
                <Stack spacing={4}>
                    <Button
                      bg={useColorModeValue('#adebeb', '#99e6e6')}
                      color={'black'}
                      _hover={{
                        bg: useColorModeValue('#85e0e0', '#70dbdb'),
                      }}
                      onClick={logGoogleUser}
                      leftIcon={<FcGoogle />}
                      >
                      Sign in with Google
                    </Button>
                </Stack>
          </Stack>
        </Box>
      </Flex>
    );
}
  