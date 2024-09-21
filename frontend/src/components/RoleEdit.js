import axios from "axios";
import { CButton, CButtonGroup, CButtonToolbar } from '@coreui/react';
import { useState, useContext } from "react";
import { userContext } from "../MyContext";
import { Roles } from "./Roles";

export function RoleEdit(userId, curRole){
    const { userData, setUserData } = useContext(userContext);
    const [valueUnused, setValueUnused] = useState(userId.role);

    const client = axios.create({
        withCredentials: true,
        headers: {
            Authorization: userData.token
        },
        baseURL: "http://localhost:3001/api/users"
    });

    const handleUnusedChange = (event) => {
        setValueUnused(event.target.value);
    };
    const changeRole = async () => {
        console.log("current user data user id:", userId.userId);
        try {
            let response = await client.put('/' + userId.userId, {
                role: valueUnused
            });
            console.log("response add tags:", response);
        } catch (error) {
            console.log("error:", error);
        }
    };
    const onPress = async () =>{
        await changeRole();
    }
    return(
        <div>
            <CButtonToolbar className="justify-content-evenly" role="group" aria-label="RoleBar">
                <CButtonGroup role="group" aria-label="Change Role">
                    <Roles label="Choose Role" value={valueUnused} handleChange={handleUnusedChange}/>
                    <CButton color="success" onClick={onPress}>Change Role</CButton>
                </CButtonGroup>
            </CButtonToolbar>
        </div>
    );
}