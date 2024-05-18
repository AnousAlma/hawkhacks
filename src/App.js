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

function App() {
  return (
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Dashboard/>}>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/profile" element={<Profile />}/>
            </Route>

            <Route path="/login" element={<Login/>}/>

          </Routes>
        </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
