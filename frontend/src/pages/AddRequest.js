import axios from "axios";
import { useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { ContentForm } from '../components/ContentForm';
import { userContext, employeeContext } from "../MyContext";

export function AddRequest(){
    const { userData, setUserData } = useContext(userContext);
    const { curEmployee, setCurEmployee } = useContext(employeeContext);
    const client = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:3001/api/requests",
        headers:{
            Authorization: userData.token
        }
    });
    const navigate = useNavigate();

    const goToNewPage = () => {
        navigate("/requests");
    }

    const formFields = [
        {label: "Code", stateValue: "code", value: "", type: "text"},
        {label: "Description", stateValue: "description", value: "", type: "text"},
        {label: "Summary", stateValue: "sumary", value: "", type: "text"}
    ]

    const submitRequest = async (content) => {
        try {
            const response = await client.post('', {
                code: content.code,
                description: content.description,
                sumary: content.sumary,
                employeeId: curEmployee
            });
            console.log("response notes:", response);
            if(response.status == 201){
                goToNewPage();
            }
        } catch (error) {
            console.log("error:", error);
        }
    };
     
    return (
      <div>
        <h1>Add Request to current Employee</h1>
        <ContentForm buttonText="Add Request" cancelText="Cancel" cancelDestination={-1} fields={formFields} clientOperation={submitRequest}/>
      </div>
    );
}