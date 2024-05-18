import { signInWithGooglePopup, is_logged_in } from "../firebase/firebase"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
// import './login.css'
import { LoginBox } from '../components/LoginBox' 
import { BrowserView, MobileView } from 'react-device-detect'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';


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
        bg={useColorModeValue('#00cc99', '#009999')}>
        <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            height={'200%'}
            width={'60%'}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign in using google</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  Start learning!
                </Text>
              </Stack>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('#00cc99', '#009999')}
                boxShadow={'lg'}
                p={1}>
                <Stack spacing={4}>
                    <Button
                      bg={useColorModeValue('#00cc99', '#009999')}
                      color={'white'}
                      _hover={{
                        bg: 'gray.100',
                      }}
                      onClick={logGoogleUser}
                      >
                      Sign in
                    </Button>
                </Stack>
              </Box>
          </Stack>
        </Box>
      </Flex>
    );
}
  