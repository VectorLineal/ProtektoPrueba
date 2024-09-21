import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState} from "react";
import { userContext, employeeContext } from "./MyContext";
import { Employees } from './pages/Employees';
import { Requests } from './pages/Requests';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {AddRequest} from "./pages/AddRequest";

function App() {
  const [userData, setUserData] = useState({username: "", role: "", token: ""});
  const [curEmployee, setCurEmployee] = useState(-1);

  return (
    <div className="App">
      <employeeContext.Provider value={{curEmployee, setCurEmployee}}>
        <userContext.Provider value={{ userData, setUserData }}>
          <nav> </nav>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/requests" element={<Requests />}/>
            <Route path="/employees" element={<Employees />}/>
            <Route path="/addRequest" element={<AddRequest />}/>
          </Routes>
        </userContext.Provider>
      </employeeContext.Provider>
      
    </div>
  );
}

export default App;
