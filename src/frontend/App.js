import './App.css';
import HomePage from './pages/HomePage';
import { Navbar } from './pages/dashboard/Navbar';
import { Login } from './pages/Login';
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Dashboard } from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';

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
