import { CButton, CButtonGroup, CButtonToolbar, CForm, CFormInput } from '@coreui/react';
import { useNavigate } from "react-router-dom";

//{label, stateValue, value, type} fields
export function ContentForm({ buttonText, cancelText, cancelDestination, fields, clientOperation }) {
    const navigate = useNavigate();

    const state = {};
    //set up the state for each form field
    for(let i = 0; i < fields.length; i++){
        state[fields[i].stateValue] = fields[i].value;
    }

    const cancelForm = () => {
        navigate(cancelDestination);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log("Texts:", state, "event:", event.target);
        await clientOperation(state);
    }
    //simple content form for multiple text fields
    return (
        <div>
            <CForm onSubmit={handleSubmit}>
                {fields.map(field =>
                    <div>
                        <CFormInput
                            type={field.type}
                            id={field.stateValue}
                            label={field.label}
                            placeholder={field.value}
                            size="lg"
                            required
                            onChange={(event) => {
                                state[field.stateValue] = event.target.value;
                            }}
                        />
                    </div>
                )}
                <CButtonToolbar className="justify-content-center" role="group" aria-label="CancelBar">
                    <CButtonGroup role="group" aria-label="Archivate">
                        <CButton type="submit" color='success' size='lg'>{buttonText}</CButton>
                        <CButton color="danger" onClick={cancelForm}>{cancelText}</CButton>
                    </CButtonGroup>
                </CButtonToolbar>
            </CForm>
        </div>
    );
}