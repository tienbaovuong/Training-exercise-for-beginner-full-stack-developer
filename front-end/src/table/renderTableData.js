import '../index.css';
import '../home.css';
import { DeleteDialog } from '../delete.js';
import {
    Link
} from "react-router-dom";
export default function RenderTableData({patients,page,filterMode}){
    if(patients==null) return <tr><td>Loading...</td></tr>
    return patients.map((patient, index)=>{
            return (
               <tr key={index}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.age}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone_number}</td>
                  <td>
                          <nav>
                              <pre style={{ display: 'inline-block'}}><Link  to={`/edit/${filterMode}/${page}/${index}`}>Edit</Link>  | </pre>
                              <DeleteDialog id={patient.patient_id}/>
                          </nav>
                  </td>
               </tr>
            )
         })
}
