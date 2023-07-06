
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextField, Button, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc,
  onSnapshot, doc } from 'firebase/firestore'
import InputForm from '../InputForm'
import AddProjectForm from './AddProjectForm';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import moment from 'moment';

  import View from './View';
  import Teams from './Teams';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function DenseTable() {
  const [project, setProject] = useState();
  const [users, setUsers] = useState();
  const projectCollectionRef = collection(db, "projects");
  const userCollectionRef = collection(db, "users");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const [bookID, setBookID] = useState("")
      console.log(bookID)

  
  useEffect(() => {
    onSnapshot(projectCollectionRef, (snapshot)=>{
      setProject(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id})));
});

    onSnapshot(userCollectionRef, (snapshot)=>{
      setUsers(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id})));
});



}, []);


  //delete
const deleteProject = async (id) =>{
  const projectDoc = doc(db, "projects", id);
  await deleteDoc(projectDoc)

  toast.success('Your project is deleted Successfully!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

}

const editHander = (id) =>{
  setBookID(id);
  handleOpen();
  
  }
  
  
  const color = {
    color: 'white',
    background:'red'
  }
  



  return (

    <>
  <Grid container spacing={2}>
  <Grid item xs={3}>
            <TextField
              label="Search Projects by Name/ID/Manager"
    
              fullWidth
              required
            />
          </Grid>
          {/* <Grid item xs={3}>
            <TextField
              label="Select Manager"
             
              fullWidth
              required
              className='ml-5'
            />
          </Grid> */}
          <Grid item xs={4}>
          <Button variant="contained"
          onClick={handleOpen}
          sx={color}
           >Add Project</Button> 


{/* create teams */}
           {/* <Teams 
           users={users}
           project = {project} /> */}


          </Grid>
    </Grid>

    {/* Model */}
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>

<Box sx={style}>

{/* <InputForm /> */}
<AddProjectForm
handleClose={handleClose}
handleOpen = {handleOpen}
id={bookID} setBookID={setBookID}
users={users}


   />
</Box>

</Modal>

    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650, mt:5 }} size="small" aria-label="a dense table"
      
      >
        <TableHead>
          <TableRow>
            <TableCell>Project ID</TableCell>
            <TableCell align="center">Project Name</TableCell>
          
      
          
            <TableCell align="center">AssignedBy</TableCell>
            <TableCell align="center">AssignedTo</TableCell>
            {/* <TableCell align="center">Description</TableCell> */}
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          
           
          </TableRow>
        </TableHead>
        <TableBody>
          {project?.map((proj) => (
            <TableRow
              key={proj.projectid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {proj.projectid}
              </TableCell>
              <TableCell align="center">{proj.projectname}</TableCell>
             
            
              <TableCell align="center">{proj.assignedby}</TableCell>
              <TableCell align="center">{proj.assignedto}</TableCell>
             
              {/* <TableCell align="center">{proj.description}</TableCell> */}
              <TableCell align="center">{proj.status === true?"active":"inactive"}</TableCell>
             
            

              <TableCell align="center"  style={{"color":"red"}}> 
              {/* <VisibilityIcon />  */}
              <View  id={proj.id} />
              <EditIcon
               onClick={()=>editHander(proj.id)}
               />


               <DeleteIcon 
               style={{"cursor":"pointer"}}
                onClick={()=>deleteProject(proj.id)} />




               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}