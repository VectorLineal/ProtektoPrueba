export function Roles({ label, value, handleChange }) {
    return (
        <div>
            <label>
                {label}
                <select value={value} onChange={handleChange}>
                    <option value={"empleado"}>{"empleado"}</option>
                    <option value={"administrador"}>{"administrador"}</option>
                </select>
            </label>
        </div>
    );
}