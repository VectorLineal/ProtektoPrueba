import { CButton, CButtonGroup, CHeader, CContainer, CHeaderBrand, CHeaderNav, CNavItem, CHeaderText } from '@coreui/react';
import { useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { employeeContext } from "../MyContext";

export function Header(){
    const navigate = useNavigate();

    const goToNewPage = () => {
        navigate("/");
    }
    const goBack = () => {
        navigate(-1);
    }

    const { curEmployee, setCurEmployee } = useContext(employeeContext);

    return(
        <div>
            <CHeader>
                <CContainer fluid>
                    <CButtonGroup role="group" aria-label="Navigation">
                        <CButton color="info" onClick={goBack}>{"<======="}</CButton>
                    </CButtonGroup>
                    <CHeaderBrand>Protekto Test</CHeaderBrand>
                    <CHeaderNav>
                        <CNavItem>
                            <CHeaderText>{"Logged as " + curEmployee}</CHeaderText>
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