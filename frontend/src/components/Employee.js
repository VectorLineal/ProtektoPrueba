import { CButton } from '@coreui/react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { employeeContext } from "../MyContext";

export function Employee({ employee }) {
  const navigate = useNavigate();
  const { curEmployee, setCurEmployee } = useContext(employeeContext);

  const goToNewPage = () => {
    setCurEmployee(employee.id);
    navigate("/requests");
  }

  return (
    <div>
      <div>
        <h2>{"Name: " + employee.name}</h2>
        <p>{"Salary: " + employee.salary}</p>
        <p>{"Started Working since " + employee.joinDate}</p>
      </div>
      <CButton color="success" size='lg' onClick={goToNewPage}>View</CButton>
    </div>
  );
}