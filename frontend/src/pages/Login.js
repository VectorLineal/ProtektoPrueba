import axios from "axios";
import { useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { ContentForm } from '../components/ContentForm';
import { userContext, employeeContext } from "../MyContext";

export function Login(){
    const client = axios.create({
        baseURL: "http://localhost:5252/api/User/login" 
    });
    const navigate = useNavigate();

    const goToNewPage = (path) => {
        navigate(path);
    }

    const { userData, setUserData } = useContext(userContext);
    const { curEmployee, setCurEmployee } = useContext(employeeContext);

    const formFields = [
        {label: "Username", stateValue: "username", value: "", type: "text"},
        {label: "Password", stateValue: "password", value: "", type: "password"}
    ]

    const tryLogin = async (content) => {
        try {
            const response = await client.post('', content);
            console.log("response notes:", response);
            if(response.status === 200){
                const data = {
                    id: response.data.id,
                    token: response.data.token
                }
                setUserData(data);
                setCurEmployee(content.username);
                console.log("logged user:", content.username);
                goToNewPage("/tasks");
            }
        } catch (error) {
            console.log("error:", error);
        }
    };
     
    return (
      <div>
        <h1>Log In</h1>
        <ContentForm buttonText="Log In" cancelText="Register" cancelDestination="/register" fields={formFields} clientOperation={tryLogin}/>
      </div>
    );
}