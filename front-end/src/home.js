import React ,{useState} from 'react';
import './index.css';
import './home.css';
import { useDispatch } from 'react-redux'
//import { changeFilter} from './store/filterSlice.js'
import {
    Switch,
    Route,
    useParams,
    useHistory
} from "react-router-dom";
import Table from './table/table.js'
import { resetFilterData } from './store/reducer/filterDataSlice.js';
import { changeCounterFilter } from './store/reducer/counterFilterSlice.js';
export default function Home(){
    const [id,setID] = useState(null);
    const [name, setName] = useState(null);
    const [gender, setGender] = useState(null);
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone_number, setPhone] = useState(null);
    const [filterMode,setFiltetMode] = useState(0);
    const [filter,setFilter]= useState(null);
    return(
            <div>
                <RenderFilter id={id} setID={setID} setName={setName} name={name} setGender={setGender} gender={gender} setAge={setAge} age={age}
            setEmail={setEmail} email={email} setPhone={setPhone} phone_number={phone_number} setFiltetMode={setFiltetMode} setFilter={setFilter}/>
                
                <Switch>
                    <Route path="/:page">
                        <TableWithPage filterMode={filterMode} filter={filter}/>
                    </Route>
                    <Route  path="/">
                        <Table  page={1} filterMode={filterMode} filter={filter}/>
                    </Route>
                    
                </Switch>
                
            </div>
            
        )
}
function RenderFilter({id,setID, setName, name,setAge,age,setEmail,email,setGender,gender,setPhone,phone_number,setFiltetMode,setFilter}){
    const history = useHistory();
    const dispatch = useDispatch();
    const onChange = (event) => {
      if (event.target.name=== "id") {
        setID(event.target.value);
      }
      if (event.target.name === "name") {
        setName(event.target.value);
      }
      if (event.target.name === "gender") {
        setGender(event.target.value);
      }
      if (event.target.name === "age") {
        setAge(event.target.value);
      }
      if (event.target.name === "email") {
        setEmail(event.target.value);
      }
      if (event.target.name === "phone_number") {
        setPhone(event.target.value);
      }
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if(id==null&&name==null&&gender==null&&age==null&&email==null&&phone_number==null) setFiltetMode(0);
        else
        {setFiltetMode(1);
        let state={
            id:id,
            name:name,
            gender:gender,
            age:age,
            email:email,
            phone_number:phone_number
        }
        setFilter(state);
        dispatch(resetFilterData());
        dispatch(changeCounterFilter(0))
        history.push("/1");
    }}
    return (
        <div>
          <form className="filter-form" onSubmit={onSubmit}>
          <input 
              type="text"
              name="id"
              placeholder="PatientID"
              value={id}
              onChange={onChange}
              style={{ width :"250px" }}
              />
            <input 
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={onChange}
              style={{ width :"250px" }}
              />
            <select  name="gender" id="gender"  onChange={onChange}>
                <option hidden value="" >Gender</option>
                <option value="">(Either)</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Would rather not say">Would rather not say</option>
                
            </select>
            <input 
              type="number" min="1"
              name="age" 
              placeholder="Age"
              value={age}
              onChange={onChange}
              style={{ width :"70px" }}
              />
            <input 
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
              style={{ width :"250px" }}
              />
            <input 
              type="text"
              name="phone_number"
              placeholder="Phone number"
              value={phone_number}
              onChange={onChange}
              style={{ width :"250px" }}
              />
            <button className="filter-button" type="submit">Filter</button>
          </form>
        </div>
        )
}
function TableWithPage(props) {
    const {page}=useParams();
    return <Table page={page} filterMode={props.filterMode} filter={props.filter}/>    
}

