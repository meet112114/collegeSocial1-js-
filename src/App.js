import {Route , Routes} from "react-router-dom";
import './App.css';
import Login from './components/login';
import If from "./components/if";
import Me from "./components/me";
import Co from "./components/co";
import Ee from "./components/ee";
import Ej from "./components/ej";

function App() {

  const Routing  = () => {
    return(
      <Routes>
      <Route exact path='/' element={ <Login/>}/>
      <Route  path='/if' element={ <If/>}/>
      <Route  path='/ee' element={ <Ee/>}/>
      <Route  path='/ej' element={ <Ej/>}/>
      <Route  path='/me' element={ <Me/>}/>
      <Route  path='/co' element={ <Co/>}/>
      </Routes>
    )
  }; 

  return (
    <>
      <Routing/>
    </>
  );
}

export default App;
