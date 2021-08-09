import '../index.css';
import '../home.css';
import { changeFilterData } from '../store/reducer/filterDataSlice.js';
import { changeCounter } from '../store/reducer/counterSlice.js';
import { changeCounterFilter } from '../store/reducer/counterFilterSlice.js';
import { changeMainData} from '../store/reducer/mainDataSlice.js';
import { useSelector, useDispatch } from 'react-redux'
import RenderTableHeader from './renderTableHeader';
import RenderTableData from './renderTableData';
import RenderTab from './renderTab';
import axios from 'axios';
import {
    Link
} from "react-router-dom";
export default function Table (props){
    const counterFilter=useSelector((state)=> state.counterFilter.value);
    const counterMain=useSelector((state)=> state.counterMain.value);
    const patientsFilter = useSelector((state)=>state.filterData[props.page-1]);
    const patientsMain = useSelector((state)=>state.mainData[props.page-1]);
    const filter=props.filter;
    const dispatch=useDispatch();
    let patients=[];
    let counter=0;
    if(props.filterMode===1){
        if(filter=={id:null,name:null,gender:null,age:null,email:null,phone_number:null}) return (<p>Loading...</p>);
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
        if(counter==0){
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
        if(counter===0&&props.filterMode==1) return (
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
                        <RenderTableData patients={patients} page={props.page} filterMode={props.filterMode}/>
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