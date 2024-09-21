import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CButtonGroup, CButton } from '@coreui/react';
import { userContext } from "../MyContext";
import { Header } from '../components/Header';
import { TaskList } from '../components/TaskList';



export function Tasks(){
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(userContext);
    const [tasks, setTasks] = useState([]);

    const client = axios.create({
        baseURL: "http://localhost:5252/api/Task",
        headers:{
            Authorization: "Bearer " + userData.token
        }
    });

    const addTask = () => {
        navigate("/addTask");
      }

    const fetchTasks = async () => {
        try {
           let tasks = await client.get('/user/' + userData.id);
           console.log("fetched Tasks:", tasks.data);
           setTasks(tasks.data);
        } catch (error) {
            console.log("error:", error);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);
    return (
        <div>
            <Header/>
            <CButtonGroup role="group" aria-label="Data Creation">
                <CButton color="success" onClick={addTask}>Add New Task</CButton>
            </CButtonGroup>
            <TaskList tasks={tasks} />
        </div>
    );
}