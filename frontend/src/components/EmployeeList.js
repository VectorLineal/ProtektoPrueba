import {Employee} from './Employee';

export function EmployeeList({ employees }) {
    const count = employees.length;
    let heading = "";
    if (count > 0) {
      const noun = count > 1 ? 'Employees' : 'Employee';
      heading = count + ' ' + noun;
    }
    return (
      <section>
        <h1>{heading}</h1>
        {employees.map(employee =>
            <a>
              <Employee employee={employee}  />  
            </a>
        )}
      </section>
    );
}