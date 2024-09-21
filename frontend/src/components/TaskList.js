import {Task} from './Task';

export function TaskList({ tasks }) {
    const count = tasks.length;
    let heading = "Tasks";
    if (count > 0) {
      const noun = count > 1 ? 'Tasks' : 'Task';
      heading = count + ' ' + noun;
    }
    return (
      <section>
        <h1>{heading}</h1>
        {tasks.map(task =>
            <a>
              <Task task={task} />  
            </a>
        )}
      </section>
    );
}