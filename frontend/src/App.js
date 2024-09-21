import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState} from "react";
import { userContext, employeeContext } from "./MyContext";
import { EditTask } from './pages/EditTask';
import { Tasks } from './pages/Tasks';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {AddTask} from "./pages/AddTask";

function App() {
  const [userData, setUserData] = useState({username: "", role: "", token: ""});
  const [curEmployee, setCurEmployee] = useState("");

  return (
    <div className="App">
      <employeeContext.Provider value={{curEmployee, setCurEmployee}}>
        <userContext.Provider value={{ userData, setUserData }}>
          <nav> </nav>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<Tasks />}/>
            <Route path="/taskEdit" element={<EditTask />}/>
            <Route path="/addTask" element={<AddTask />}/>
          </Routes>
        </userContext.Provider>
      </employeeContext.Provider>
      
    </div>
  );
}

export default App;
