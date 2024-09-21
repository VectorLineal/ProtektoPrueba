import { CButtonGroup, CButton } from '@coreui/react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { userContext } from "../MyContext";
import { RoleEdit } from "./RoleEdit";
import { RequestList } from './RequestList';

export function UserData({ employee, user, requests, client }) {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);
  const isAdmin = userData.role == "administrador";

  const goToNewPage = () => {
    navigate("/employees");
  }
  const editRequest = () => {
    navigate("/addRequest");
  }
  
  return (
    <div>
      <div>
        <h1>{employee.name}</h1>
        <h2>{"Username: " + user.username}</h2>
        <p>{"Salary: " + employee.salary}</p>
        <p>{"Started Working since " + employee.joinDate}</p>
        {isAdmin
            ? <RoleEdit userId={user.id} curRole={user.role} />
            : <p>{user.role}</p>     
        }
      </div>
      <CButtonGroup role="group" aria-label="Authentication">
        <CButton color="info" size='lg' onClick={goToNewPage}>View All Employees</CButton>
        {isAdmin &&
          <CButton color="success" onClick={editRequest}>Add Request</CButton>
        }
      </CButtonGroup>
      <div>
        <RequestList employee={employee} requests={requests} client={client}/>
      </div>
    </div>
  );
}