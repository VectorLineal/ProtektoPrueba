import {Request} from './Request';

export function RequestList({ requests, client }) {
    const count = requests.length;
    let heading = "Requests";
    if (count > 0) {
      const noun = count > 1 ? 'Requests' : 'Request';
      heading = count + ' ' + noun;
    }
    return (
      <section>
        <h1>{heading}</h1>
        {requests.map(request =>
            <a>
              <Request request={request} client={client}/>  
            </a>
        )}
      </section>
    );
}