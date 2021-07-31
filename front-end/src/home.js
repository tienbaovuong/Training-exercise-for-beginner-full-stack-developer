import React from 'react';
import './index.css';
import './home.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { changeFilter} from './store/filterSlice.js'
import {
    Switch,
    Route,
    Link,
    useParams,
    useHistory
} from "react-router-dom";
import { DeleteDialog } from './delete.js';
import { changeFilterData,resetFilterData } from './store/filterDataSlice.js';
import { changeCounterFilter } from './store/counterFilterSlice.js';
import { changeCounter } from './store/counterSlice.js';
import { changeMainData} from './store/mainDataSlice.js';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={filter:{
            id: null, 
            name: null,
            gender:null,
            age:0, 
            email:null, 
            phone_number:null
            },
            filterMode:0}
    }
    
    onChange = (event) => {
        this.setState(
            this.state.filter.id = event.target.value
        )
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.setState({filterMode:1})
        OnSubmit(this.state.filter);
    }
    renderFilter(){
    const {  id, name, gender, age,email,phone_number } =this.state
    return (
    <div>
      <form className="filter-form" onSubmit={this.onSubmit}>
      <input 
          type="text"
          name="id"
          placeholder="PatientID"
          value={id}
          onChange={this.onChange}
          style={{ width :"250px" }}
          />
        <input 
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={this.onChange}
          style={{ width :"250px" }}
          />
        <select  name="gender" id="gender"  onChange={this.onChange}>
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
          onChange={this.onChange}
          style={{ width :"70px" }}
          />
        <input 
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.onChange}
          style={{ width :"250px" }}
          />
        <input 
          type="text"
          name="phone_number"
          placeholder="Phone number"
          value={phone_number}
          onChange={this.onChange}
          style={{ width :"250px" }}
          />
        <button className="filter-button" type="submit">Filter</button>
      </form>
    </div>
    )
    }
    render(){
        return(
            <div>
                {this.renderFilter()}
                
                <Switch>
                    <Route path="/:page">
                        <TableWithPage filterMode={this.state.filterMode} />
                    </Route>
                    <Route  path="/">
                        <Table  page={1} filterMode={this.state.filterMode}/>
                    </Route>
                    
                </Switch>
                
            </div>
            
        )
    }
}
export default Home;

function OnSubmit(state){
    const dispatch = useDispatch();
    dispatch(changeFilter(state));
    dispatch(resetFilterData);
    dispatch(changeCounterFilter(0))
    const history = useHistory();
    history.push("/");
}
function TableWithPage(props) {
    const {page}=useParams();
    return <Table page={page} filterMode={props.filterMode}/>    
}
function Table (props){
    const patientsFilter = useSelector((state)=>state.filterData[props.page-1]);
    const patientsMain = useSelector((state)=>state.mainData[props.page-1]);
    const filter= useSelector((state)=> state.filter);
    const counterFilter=useSelector((state)=> state.counterFilter.value);
    const counterMain=useSelector((state)=> state.counterMain.value);
    const dispatch=useDispatch();
    let patients=[];
    let counter=0;
    if(props.filterMode===1){
        patients = patientsFilter;
        counter = counterFilter;
        if(counter==0){
            axios.post(`http://localhost:8080/api/patient/filter/count`,filter)
            .then((response) => {
                    dispatch(changeCounterFilter(response.data));
                });
        }
        if(patients==null){
            axios.post(`http://localhost:8080/api/patient/filter/${props.page}`,filter)
            .then((response) => {
                    let payload={data:response.data,numPage:props.page};
                    dispatch(changeFilterData(payload));
                });
        }
    }else{
        patients = patientsMain;
        counter = counterMain;
        if(counter===0){
            axios.get(`http://localhost:8080/api/patient/count`)
            .then((response) => {
                    dispatch(changeCounter(response.data));
                });
        }
        if(patientsMain==null){
            axios.get(`http://localhost:8080/api/patient/?page=${props.page}`)
            .then((response) => {
                    let payload={data:response.data,numPage:props.page};
                    dispatch(changeMainData(payload));
                });
        }
    }
        let lastPage= counter%4;
        if (lastPage===0) lastPage=4;
        let numPage =(counter+4-lastPage)/4;
        let current;
        if(props.page%3===0){
            current =props.page-2;
        }
        else current = props.page-props.page%3+1;
        let lastTab;
        if(numPage%3===0){
            lastTab =numPage-2;
        }
        else lastTab = numPage-numPage%3+1;
        let limit=4;
        if(current===lastTab){
            limit =numPage%3;
        }else  limit=4;
        if (limit===0) limit=3;
        if(counter===0) return (
            <div className="errorpage">
                <p>Can't find the required patient</p>
                <a href="/" style={{ textDecoration: 'underline' }} to="/">Return to home page</a>
            </div>
        )
        else if(props.page > numPage) return (
            <div className="errorpage">
                <p>This page does not exist</p>
                <a href="/" style={{ textDecoration: 'underline' }} to="/">Return to home page</a>
            </div>
        
        )
        else return (
            <div>
                <table>
                    <tbody>
                        <RenderTableHeader/>
                        <RenderTableData patients={patients}/>
                    </tbody>
                </table>
                <nav>
                <Link to="/create">
                    <button className="create-button">
                         Create Patient
                    </button></Link>
                    <div className="btn-group">
                    <RenderTab current={current} limit={limit} numPage={numPage}/>
                    </div>
                </nav>
            </div>
        )
    }
function RenderTableHeader(){
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

function RenderTableData({patients}){
    console.log(patients);
    if(patients==null) return (<p>Loading...</p>);
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
                              <pre style={{ display: 'inline-block'}}><Link  to={`/edit/id/${patient.id}`}>Edit</Link>  | </pre>
                              <DeleteDialog id={patient.id}/>
                          </nav>
                  </td>
               </tr>
            )
         })
}

function RenderTab({current,limit,numPage}){
    if(current!==1) {
        current--;
    }
    else{
        limit--;
    }
    if(limit===4)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${current+1}`}><button>{current+1}</button></Link>
        <Link to= {`/${current+2}`}><button>{current+2}</button></Link>
        <Link to= {`/${current+3}`}><button>{current+3}</button></Link>
        <Link to= {`/${current+4}`}><button>{current+4}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
    if(limit===3)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${current+1}`}><button>{current+1}</button></Link>
        <Link to= {`/${current+2}`}><button>{current+2}</button></Link>
        <Link to= {`/${current+3}`}><button>{current+3}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
    if(limit===2)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${current+1}`}><button>{current+1}</button></Link>
        <Link to= {`/${current+2}`}><button>{current+2}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
    if(limit===1)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${current+1}`}><button>{current+1}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
    if(limit===0)
    return(
        <div>
        <Link to= "/1"><button>{"<<"}</button></Link>
        <Link to= {`/${current}`}><button>{current}</button></Link>
        <Link to= {`/${numPage}`}><button>{">>"}</button></Link>
        </div>
    )
}