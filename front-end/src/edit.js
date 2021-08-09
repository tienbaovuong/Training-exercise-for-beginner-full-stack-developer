import axios from "axios";
import React, { useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Link, Route, Switch } from "react-router-dom";
import './index.css';
import './form.css';
import { useSelector } from "react-redux";
export default function EditPage(filterMode,page,index) {
  const patient0 = useSelector((state)=>state.mainData[page-1]); 
  const patient1 = useSelector((state)=>state.filterData[page-1]);
  let patient;
  const matchURL=`/edit/${filterMode}/${page}/${index}`;
  if(filterMode==0) {
    if(patient0==null) window.location.href = 'http://localhost:3000'; 
    else patient=patient0[index];
  }
  else {
    if(patient1==null) window.location.href = 'http://localhost:3000'; 
    else patient=patient1[index];
  }
  const [name, setName] = useState(patient.name);
  const [gender, setGender] = useState(patient.gender);
  const [age, setAge] = useState(patient.age);
  const [email, setEmail] = useState(patient.email);
  const [phone_number, setPhone] = useState(patient.phone_number);
    return(
      <div>
        <Switch>
          <Route exact path={matchURL}>
            <h2>Edit patient</h2>
            <PatientEditForm id={patient.id} setName={setName} name={name} setGender={setGender} gender={gender} setAge={setAge} age={age}
            setEmail={setEmail} email={email} setPhone={setPhone} phone_number={phone_number} matchURL={matchURL}/>
          </Route>
          <Route exact path={matchURL+"/confirm"}>
            <h2>Edit patient confirm</h2>
            <OnSubmit id={patient.id} name={name} gender={gender} age={age} email={email} phone_number={phone_number} matchURL={matchURL}/>
          </Route>
          <Route exact path={matchURL+"/success"}>
            <h2>Congrats! Patient was Edited</h2>
            <a href="/"><button class="gohome">Go home</button></a>
          </Route>
        </Switch>
      </div>
    )

}
function OnSubmit({id,name,gender,age,email,phone_number,matchURL}){
      const history =useHistory();
      const OnConfirm = (event) =>{
        event.preventDefault();
        axios.put('http://localhost:8080/api/patient',{ id,name,gender,age,email,phone_number})
            .then((response) => {
              console.log(response.data)
              history.push(matchURL+`/success`)
            }); 
      }
      return(
        <div>
        <pre className="idbox">PatientID*   {id}</pre>
        <pre className="namebox">Name*   {name}</pre>
        <pre className="genderbox">Gender*   {gender}</pre>
        <pre className="agebox">Age*    {age}</pre>
        <pre className="emailbox">Email    {email}</pre>
        <pre className="phonebox">Phone number    {phone_number}</pre>
        <Link to="/create"><button className="cancel">Back</button></Link>
        <button className="next" onClick= {OnConfirm}>Save</button>
        </div>
      )
}

function PatientEditForm({id, setName, name,setAge,age,setEmail,email,setGender,gender,setPhone,phone_number,matchURL}) { 
  const history = useHistory(); 
    const onChange = (event) => {
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
      var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; 
      if(!phoneRegex.test(phone_number)){
        alert("Invalid phone number");
      }
      else if(!emailRegex.test(email)){
        alert("Invalid email")
      }
      else history.push(matchURL+`/confirm`);
  }

    return (
    <div className="center-form">
      <form onSubmit= {onSubmit}>
        <pre className="idbox">PatientID   <input type="text"  value={id} readOnly="readonly" /></pre>
        <pre className="namebox">Name   <input required
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        /></pre>
        <pre className="genderbox">Gender   <select required name="gender" id="gender"  value={gender}  onChange={onChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Would rather not say">Would rather not say</option>
            
        </select></pre>
        <pre className="agebox">Age    <input required
          type="number" min="1"
          name="age"
          value={age}
          onChange={onChange}
        /></pre>
        <pre id="email" className="emailbox">Email   <input 
          type="text"
          name="email"
          value={email}
          onChange={onChange}
        /></pre>
        <pre id="phone" className="phonebox">Phone number   <input required
          type="text"
          name="phone_number"
          value={phone_number}
          onChange={onChange}
        /></pre>
        <nav>
          <button className="next" type="submit">Next</button>
        </nav>
      </form>
      <nav>
        <Link to="/"><button className="cancel">Cancel</button></Link>
      </nav>
    </div>  
    );
  
}
