import { CButton, CButtonGroup, CHeader, CContainer, CHeaderBrand, CHeaderNav, CNavItem, CHeaderText } from '@coreui/react';
import { useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { userContext } from "../MyContext";

export function Header(){
    const navigate = useNavigate();

    const goToNewPage = () => {
        navigate("/");
    }
    const goBack = () => {
        navigate(-1);
    }

    const { userData, setUserData } = useContext(userContext);

    return(
        <div>
            <CHeader>
                <CContainer fluid>
                <CHeaderBrand>Konecta Test</CHeaderBrand>
                <CButtonGroup role="group" aria-label="Authentication">
                    <CButton color="info" onClick={goBack}>{"<======="}</CButton>
                </CButtonGroup>
                <CHeaderNav>
                    <CNavItem>
                        <CHeaderText>{"Logged as " + userData.username}</CHeaderText>
                    </CNavItem>
                    <CNavItem>
                        <CHeaderText>{"User Role: " + userData.role}</CHeaderText>
                    </CNavItem>
                </CHeaderNav>
                <CButtonGroup role="group" aria-label="Authentication">
                    <CButton color="danger" onClick={goToNewPage}>Log Out</CButton>
                </CButtonGroup>
                </CContainer>
            </CHeader>
        </div>
    );
}