import { BrowserRouter as Router, Route, Routes, useNavigate   } from 'react-router-dom';
import './App.css';
import { createContext, useEffect, useReducer } from "react";

import Navbar from "./components/navbar";
import BBI from "./components/bbi";
import BAF from "./components/baf";
import BCA from "./components/bca";
import BMS from "./components/bms";
import BSC from "./components/bsc";
import AdminPage  from "./components/admin";
import LandingPage from "./pages/landingPage/landingpage";
import SHomePage from "./pages/sHomePage/sHomePage";
import AnnouncementsPage from './pages/announcments/announcments';
import LecturesPage from './pages/LeacturesPage/LeacturesPage';
import StudentActivityPage from './pages/studentActivity/studentActivity';
import StudentRegister from './pages/studentRegister/studentRegister';
import AdminContentManagement from './pages/contentManagment/contentmanagement';
import AP from './components/adminPost';

import { initialState, reducer } from "./reducer/userReducer";
export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer , initialState );


  return (
  
    <UserContext.Provider value={{state , dispatch}}>
    <Router>
    <Navbar/>
    <Routes>
  <Route exact path='/' element={ <LandingPage/>}/>
  <Route  path='/bbi' element={ <BBI/>}/>
  <Route  path='/bms' element={ <BMS/>}/>
  <Route  path='/bsc' element={ <BSC/>}/>
  <Route  path='/baf' element={ <BAF/>}/>
  <Route  path='/bca' element={ <BCA/>}/>
  <Route  path='/admin' element={ <AdminPage/>}/>
  <Route  path='/posts' element={ <SHomePage/>}/>
  <Route  path='/announcements' element={ <AnnouncementsPage/>}/>
  <Route  path='/lectures' element={ <LecturesPage/>}/>
  <Route  path='/activity' element={ <StudentActivityPage/>}/>
  <Route  path='/register' element={ <StudentRegister/>}/>
  <Route  path='/adminManage' element={ <AdminContentManagement/>}/>
  <Route  path='/adminpost' element={ <AP/>}/>
  </Routes>
    </Router>
  </UserContext.Provider>
  );
}

export default App;
