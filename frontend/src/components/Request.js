import { CButton } from '@coreui/react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { userContext } from "../MyContext";

export function Request({ request, client }) {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(userContext);

  const deleteNote = async (id) => {
    try {
      let response = await client.delete('requests/' + id, {
        headers: {
          Authorization: userData.token
        }
      });
      console.log("response deletion:", response.status);
     
    } catch (error) {
        console.log("error:", error);
    }
  };
  const onDelete = async () =>{
    await deleteNote(request.id);
    navigate("/employees");
  };

  return (
    <div>
      <div>
        <h1>{request.description}</h1>
        <h3>{"Code: " + request.code}</h3>
        <p>{request.sumary}</p>
      </div>
      {userData.role == "administrador" &&
        <CButton color="danger" size='lg' onClick={onDelete}>Delete</CButton>
      }
      
    </div>
  );
}