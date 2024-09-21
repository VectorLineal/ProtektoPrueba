import { CButton } from '@coreui/react';
import { useNavigate } from "react-router-dom";

export function Task({ task }) {
  const navigate = useNavigate();
  const onEdit = async () =>{
    navigate("/taskEdit", { state: {task}});
  };

  let status = "pending";
  if(task.completed) status = "completed";

  return (
    <div>
      <div>
        <h1>{task.title}</h1>
        <h3>{"Start Date: " + task.publishedOn}</h3>
        <h4>{"Status: " + status}</h4>
        <p>{task.content}</p>
      </div>
      <CButton color="primary" size='lg' onClick={onEdit}>Edit</CButton>
      
    </div>
  );
}