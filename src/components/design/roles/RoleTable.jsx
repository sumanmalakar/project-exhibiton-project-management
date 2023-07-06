/* eslint-disable react-hooks/exhaustive-deps */
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
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

import AddRoleForm from './AddRoleForm';

import View from './View';

import { getAuth} from 'firebase/auth'



import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import DataTable from '../projects/DataTable';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:520,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




export default function TaskTable({color}) {
  const auth = getAuth()

  const [role, setRole] = useState();
  const [edit, setEdit] = useState(true);
  const [view, setView] = useState(false);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{ setOpen(false);
    setEdit(false);
    setView(false);
  }
  
  const [bookID, setBookID] = useState("")
  console.log(bookID)
  
  const roleCollectionRef = collection(db, "roles");


  
  useEffect(() => {
      onSnapshot(roleCollectionRef, (snapshot)=>{
        setRole(snapshot.docs.map((doc) => ({
          ...doc.data(), id: doc.id})))
  })
  
}, []);
  
  //delete
const deleterole = async (id) =>{
  const roleDoc = doc(db, "roles", id);
  await deleteDoc(roleDoc)

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
setEdit(true);

}
const ViewHander = (id) =>{
setBookID(id);
handleOpen();
setView(true)


}



  return (

    <>
  <Grid container spacing={2}>

{/* <h1>{getAuth().currentUser.displayName}</h1>
<img src={getAuth().currentUser.photoURL} alt="Avatar" className="avatar" /> */}


  <Grid item xs={3}>
            <TextField
              label="Search Projects by Name/ID/Manager"
    
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Select Manager"
             
              fullWidth
              required
              className='ml-5'
            />
          </Grid>
          <Grid item xs={4}>
          <Button variant="contained"
          onClick={handleOpen}
          sx={color}
           >Add Role</Button>
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
<AddRoleForm
handleClose={handleClose}
  handleOpen = {handleOpen}
  id={bookID} setBookID={setBookID}
  edit={edit} view={view}
  
   />
</Box>

</Modal>




    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650, mt:5 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
        
            {/* <TableCell align="center">RoleID</TableCell> */}
            <TableCell align="center">RoleName</TableCell>
            <TableCell align="center">Level</TableCell>
            <TableCell align="center">Status</TableCell>

            {/* <TableCell align="center">CreatedBy</TableCell>
            <TableCell align="center">UpdatedBy</TableCell>
            <TableCell align="center">CreatedAt</TableCell>
            <TableCell align="center">UpdatedAt</TableCell> */}

            <TableCell align="center">Action</TableCell>
          
           
          </TableRow>
        </TableHead>
        <TableBody>
          {role?.map((proj) => (
            <TableRow
              key={proj.roleid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell  align="center" component="th" scope="row">
                {proj.roleid}
              </TableCell> */}
              <TableCell align="center">{proj.name}</TableCell>
              <TableCell align="center">{proj.level}</TableCell>
              <TableCell align="center">{(proj.status === true) ? "active":"inactive"}</TableCell>
              {/* <TableCell align="center">{proj.createdby}</TableCell>
              <TableCell align="center">{proj.updatedby}</TableCell> */}
              
              {/* <TableCell align="center">
                {moment(proj.createdat.toDate()).calendar()}
                </TableCell>

              <TableCell align="center">
                {moment(proj.updatedat.toDate()).calendar()}
                </TableCell>
              */}
            

              <TableCell align="center" style={{"color":"red"}} > 
{/*               
              <VisibilityIcon  onClick={()=>ViewHander(proj.id)}  /> 
               */}
              <View id = {proj.id} />
              <EditIcon  onClick={()=>editHander(proj.id)}  />


               <DeleteIcon 
               style={{"cursor":"pointer"}}
                onClick={()=>deleterole(proj.id)} />


               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

{/* 
      <br />
      <br />
      <br /> */}

{/* <DataTable /> */}
    </TableContainer>

    </>
  );
}