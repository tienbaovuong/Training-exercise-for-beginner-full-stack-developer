import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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

export function DeleteDialog({id}) {
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
