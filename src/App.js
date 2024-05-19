import './App.css';
import HomePage from './frontend/pages/HomePage';
import { Login } from './frontend/pages/Login';
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Dashboard } from './frontend/pages/dashboard/Dashboard';
import Profile from './frontend/pages/dashboard/Profile';
import Question from './frontend/pages/questions/Question';
import VideoQuestion from './frontend/pages/questions/VideoQuestion';
import Play from './frontend/pages/questions/Play';

function App() {
  return (
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Dashboard/>}>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/question" element={<Question />}/>
              <Route path="/vid_question" element={<VideoQuestion />}/>
              <Route path="/play" element={<Play />}/>
            </Route>

            <Route path="/login" element={<Login/>}/>

          </Routes>
        </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
