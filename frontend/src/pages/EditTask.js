import axios from "axios";
import { CButton, CButtonGroup, CButtonToolbar, CForm, CFormInput, CFormCheck } from '@coreui/react';
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { userContext } from "../MyContext";
import { Header } from '../components/Header';

export function EditTask() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const { userData, setUserData } = useContext(userContext);

    const task = state.task;

    const client = axios.create({
        baseURL: "http://localhost:5252/api/Task",
        headers:{
            Authorization: "Bearer " + userData.token
        }
    });

    const goToNewPage = () => {
        navigate("/tasks");
    }

    const deleteTask = async (id) => {
        try {
        let response = await client.delete('/' + id);
        console.log("response deletion:", response.status);
        if(response.status === 204) goToNewPage();
        } catch (error) {
            console.log("error:", error);
        }
    };
    
    const updateTask = async (id, content) => {
        try {
            let completedValue = false;
            console.log("Content Input:", content);
            let response = await client.put('/' + id, {
                title: content.title,
                content: content.content,
                completed: content.completed
            });
            console.log("response update:", response.status);
            if(response.status === 204) goToNewPage();
        } catch (error) {
            console.log("error:", error);
        }
    };

    const onDelete = async () =>{
        await deleteTask(task.id);
    };

    const onUpdate = async (content) =>{
        await updateTask(task.id, content);
    };

    //set up the state for each form field
    const contentState = {
        title: task.title,
        content: task.content,
        completed: task.completed
    };

    const cancelForm = () => {
        goToNewPage();
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log("Texts:", contentState, "event:", event.target);
        await onUpdate(contentState);
    }
    //simple content form for multiple text fields
    return (
        <div>
            <Header/>
            <CButtonGroup role="group" aria-label="Data Creation">
                <CButton color="danger" onClick={onDelete}>Delete Current Task</CButton>
            </CButtonGroup>
            <CForm onSubmit={handleSubmit}>
                <CFormInput
                    type="text"
                    id="title"
                    label="Title"
                    placeholder={task.title}
                    size="lg"
                    onChange={(event) => {
                        contentState.title = event.target.value;
                    }}
                />
                <CFormInput
                    type="text"
                    id="content"
                    label="Task description"
                    placeholder={task.content}
                    onChange={(event) => {
                        contentState.content = event.target.value;
                    }}
                />
                <CFormCheck
                    button={{ color: 'primary', variant: 'outline' }}
                    id="completed"
                    label="Is current Task Completed?"
                    defaultChecked={task.completed}
                    inline
                    onChange={(event) => {
                        contentState.completed = event.target.checked;
                    }}
                />
                <CButtonToolbar className="justify-content-center" role="group" aria-label="CancelBar">
                    <CButtonGroup role="group" aria-label="Archivate">
                        <CButton type="submit" color='success' size='lg'>Save</CButton>
                        <CButton color="warning" onClick={cancelForm}>Cancel</CButton>
                    </CButtonGroup>
                </CButtonToolbar>
            </CForm>
        </div>
    );
}