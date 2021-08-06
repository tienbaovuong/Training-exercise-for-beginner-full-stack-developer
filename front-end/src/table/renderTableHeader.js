import '../index.css';
import '../home.css';

export default function RenderTableHeader(){
    return(
        <tr>
            <th className="ID">PatientID</th>
            <th className="Name">Name</th>
            <th className="Gender">Gender</th>
            <th className="Age">Age</th>
            <th className="Email">Email</th>
            <th className="Phone">Phone number</th>
            <th></th>
        </tr>
    )
}
