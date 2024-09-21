import axios from "axios";
import { useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { ContentForm } from '../components/ContentForm';
import { Header } from '../components/Header';
import { userContext } from "../MyContext";

export function AddTask(){
    const { userData, setUserData } = useContext(userContext);
    const client = axios.create({
        baseURL: "http://localhost:5252/api/Task",
        headers:{
            Authorization: "Bearer " + userData.token
        }
    });
    const navigate = useNavigate();

    const goToNewPage = () => {
        navigate("/tasks");
    }

    const formFields = [
        {label: "Title", stateValue: "title", value: "", type: "text"},
        {label: "Content", stateValue: "content", value: "", type: "text"}
    ]

    const submitRequest = async (content) => {
        try {
            const response = await client.post('', {
                title: content.title,
                content: content.content,
                userId: userData.id
            });
            console.log("response notes:", response);
            if(response.status === 201){
                goToNewPage();
            }
        } catch (error) {
            console.log("error:", error);
        }
    };
     
    return (
      <div>
        <Header/>
        <h1>Add new Task to current user</h1>
        <ContentForm buttonText="Add Task" cancelText="Cancel" cancelDestination={-1} fields={formFields} clientOperation={submitRequest}/>
      </div>
    );
}