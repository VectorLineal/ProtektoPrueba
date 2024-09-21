import axios from "axios";
import { useNavigate} from "react-router-dom";
import { ContentForm } from '../components/ContentForm';

export function Register(){
    const client = axios.create({
        baseURL: "http://localhost:5252/api" 
    });
    const navigate = useNavigate();

    const goToNewPage = () => {
        navigate("/");
    }

    const formFields = [
        {label: "Username", stateValue: "username", value: "", type: "text"},
        {label: "Password", stateValue: "password", value: "", type: "password"}
    ]

    const tryRegister = async (content) => {
        try {
            const user = await client.post('/User', {
                username: content.username,
                password: content.password
            });
            if(user.data !== null) goToNewPage();
        } catch (error) {
            console.log("error:", error);
        }
    };
     
    return (
      <div>
        <h1>Register</h1>
        <ContentForm buttonText="Register" cancelText="I already have an acount" cancelDestination="/" fields={formFields} clientOperation={tryRegister}/>
      </div>
    );
}