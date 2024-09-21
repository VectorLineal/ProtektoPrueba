import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { employeeContext, userContext } from "../MyContext";
import { UserData } from '../components/UserData';
import { Header } from '../components/Header';

const client = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/api/"
});

export function Requests(){
    const { curEmployee, setCurEmployee } = useContext(employeeContext);
    const { userData, setUserData } = useContext(userContext);

    const [employeeData, setEmployeeData] = useState({});
    const [curUser, setCurUser] = useState({});
    const [requests, setRequests] = useState([]);

    const fetchEmployeeUser = async () => {
        console.log("Sirvo para una puta mierda.");
        try {
           let employee = await client.get('employees/' + curEmployee, {
                headers: {
                    Authorization: userData.token
                }
            });
           console.log("fetched employee:", employee.data);
           setEmployeeData(employee.data);
           let user = await client.get('userEmployee/' + curEmployee, {
                headers: {
                    Authorization: userData.token
                }
            });
           console.log("fetched user:", user.data);
           setCurUser(user.data);
           let requestsRes = await client.get('requestsEmployee/' + curEmployee, {
                headers: {
                    Authorization: userData.token
                }
            });
           console.log("fetched user:", requestsRes.data);
           setRequests(requestsRes.data);
        } catch (error) {
            console.log("error:", error);
        }
    };
    useEffect(() => {
        console.log("Sirvo para dos putas mierdas.");
        fetchEmployeeUser();
    }, []);

    console.log("saved user:", curUser);
    return (
        <div>
            <Header/>
            <UserData employee={employeeData} user={curUser} requests={requests} client={client}/>
        </div>
    );
}