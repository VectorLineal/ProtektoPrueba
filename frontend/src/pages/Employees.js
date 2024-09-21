import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { userContext } from "../MyContext";
import { EmployeeList } from '../components/EmployeeList';
import { Header } from '../components/Header';

const client = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/api/employees"
});

export function Employees(){
    const { userData, setUserData } = useContext(userContext);
    const [employeesData, setEmployeesData] = useState([]);
    useEffect(() => {
        client.get('', {
            headers: {
                Authorization: userData.token
            }
        }).then((response) => {
            setEmployeesData(response.data);
            console.log("fetched employees:", employeesData);
        }).catch((error) => {
            console.log("error:", error.response);
        })
    }, []);
    return (
        <div>
            <Header/>
            <EmployeeList employees={employeesData}/>
        </div>
    );
}