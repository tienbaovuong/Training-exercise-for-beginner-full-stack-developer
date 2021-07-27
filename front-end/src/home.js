import React from 'react';
import './index.css';
import './home.css';
import axios from 'axios';
import {
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            patients:{
            patientsPreCut: []         
            },
            id: null,
            name: null,
            gender:null,
            age:null,
            email:null,
            phone_number:null
        }
    }
    componentDidMount() {
        // Simple GET request using axios
        axios.get('http://localhost:8080/api/patient')
        .then(response => {
            this.setState({ patients:{patientsPreCut: response.data }});
            
        });
    }
    
    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    onSubmit = (event) => {
        event.preventDefault();
        const { notneed,id,name,gender,age,email,phone_number}=this.state;
        axios.post('http://localhost:8080/api/patient/filter',{ id,name,gender,age,email,phone_number})
        .then((response) => {
            this.setState({ patients:{patientsPreCut: response.data }});
        });
    }
    renderFilter(){
    const { notneed, id, name, gender, age,email,phone_number } = this.state;
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
          type="number"
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
                        <TableWithPage patients ={this.state.patients.patientsPreCut}/>
                    </Route>
                    <Route  path="/">
                        <Table patientsPreCut={this.state.patients.patientsPreCut} page={1} />
                    </Route>
                    
                </Switch>
                
            </div>
            
        )
    }
}
export default Home;

function TableWithPage(props) {
    const {page}=useParams();
    return <Table patientsPreCut={props.patients} page={page}/>    
}
class Table extends React.Component{

    renderTableData(){
        const patients = this.props.patientsPreCut.slice(this.props.page*4-4,this.props.page*4);
        return patients.map((patient, index) => {
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
                              <pre style={{ display: 'inline-block'}}><Link  to={`/edit/id/${patient.id}`}>Edit</Link>  | </pre><DeleteDialog id={patient.id}/>
                          </nav>
                  </td>
               </tr>
            )
         })
    }
    renderTableHeader(){
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
    renderTab(current,limit,numPage){
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
    render(){
        let lastPage= this.props.patientsPreCut.length%4;
        if (lastPage===0) lastPage=4;
        let numPage =(this.props.patientsPreCut.length+4-lastPage)/4;
        let current;
        if(this.props.page%3===0){
            current =this.props.page-2;
        }
        else current = this.props.page-this.props.page%3+1;
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
        if(this.props.patientsPreCut.length===0) return (
            <div className="errorpage">
                <p>Can't find the required patient</p>
                <a href="/" style={{ textDecoration: 'underline' }} to="/">Return to home page</a>
            </div>
        )
        else if(this.props.page > numPage) return (
            <div className="errorpage">
                <p>This page does not exist</p>
                <a href="/" style={{ textDecoration: 'underline' }} to="/">Return to home page</a>
            </div>
        
        )
        

        else return (
            <div>
                <table>
                    <tbody>
                        {this.renderTableHeader()}
                        {this.renderTableData()}
                    </tbody>
                </table>
                <nav>
                <Link to="/create">
                    <button className="create-button">
                         Create Patient
                    </button></Link>
                    <div className="btn-group">
                    {this.renderTab(current,limit,numPage)}
                    </div>
                </nav>
            </div>
        )
    }
}
    const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    
    button: {
        textTransform: "none"
     },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
     top: theme.spacing(1),
    color: theme.palette.grey[500],
    },
    });

    const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
    });
    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);

    const DialogActions = withStyles((theme) => ({
         root: {
            margin: 0,
            padding: theme.spacing(1),
        },
    }))(MuiDialogActions);

function DeleteDialog({id}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRequest=()=>{
      setOpen(false);
      axios.delete(`http://localhost:8080/api/patient/${id}`)
        .then(response => {
            console.log(response);  
            console.log(response.data);
            window.location.href = 'http://localhost:3000'; 
        });
  }
  return (
    <div style={{ display: 'inline-block'}}>
      <Button  className="delete" onClick={handleClickOpen}>
      <Typography style={{ textTransform: 'none', paddingBottom: '3px',font: '15px bolder  "Century Gothic"' }}>Delete</Typography>
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Confirm
        </DialogTitle>
        <DialogContent style={{ "min-height": "120px", width: "450px" }} dividers>
          <Typography  style={{margin:"10px", marginTop:"20px"}}gutterBottom>

            Do you want to delete patient with id {id}?            


          </Typography>
        </DialogContent>
        <DialogActions>
            <Button style={{ "max-height": "40px", width: "120px" }} variant="outlined"  onClick={handleClose}>
            <Typography style={{ textTransform: 'none', paddingBottom: '3px',font: '15px bolder  "Century Gothic"' }}>Cancel</Typography>
            </Button>
            <Button style={{ "max-height": "40px", width: "120px", backgroundColor:"grey", color:"white" }} variant="contained"  onClick={handleRequest} >
            <Typography style={{ textTransform: 'none', paddingBottom: '3px',font: '15px bolder  "Century Gothic"' }}>Yes</Typography>
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


