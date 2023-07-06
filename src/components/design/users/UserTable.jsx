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
import Typography from '@mui/material/Typography';
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDocs, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUserForm from './AddUserForm';
import moment from 'moment/moment';

import View from './View';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // height:700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function UserTable() {
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(true);
  const [view, setView] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setView(false);
  }
  const userCollectionRef = collection(db, "users");
  const roleCollectionRef = collection(db, "roles");


  const [roles, setRoles] = useState({})


  const [bookID, setBookID] = useState("")
  console.log(bookID)




  useEffect(() => {

    // getDocs Method for data fetching
    // const getProjects = async () => {
    //   const data = await getDocs(userCollectionRef);
    //   setUser(data.docs.map((doc) => ({
    //     ...doc.data(), id: doc.id
    //   })));
    // }
    // getProjects();


    // onSnapshot Method for data fetching
    onSnapshot(userCollectionRef, (snapshot) => {
      setUser(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    })


    onSnapshot(roleCollectionRef, (snapshot) => {
      setRoles(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    })

    console.log(roles)






  }, []);

  //delete
  const deleteuser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)

    toast.success('Your user is deleted Successfully!', {
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

  const editHander = (id) => {
    setBookID(id);
    handleOpen();
    setEdit(true);

  }

  const ViewHander = (id) => {
    setBookID(id);
    handleOpen();
    setView(true)


  }
  const color = {
    color: 'white',
    background: 'red'
  }



  return (

    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            label="Search Users by Name/ID/Manager"

            fullWidth
            required
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Select Project"

            fullWidth
            required
            className='ml-5'
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained"
            onClick={handleOpen}
            sx={color}
          >Add User</Button>
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
          <AddUserForm
            handleClose={handleClose}
            handleOpen={handleOpen}
            id={bookID} setBookID={setBookID}
            edit={edit} view={view} roles = {roles}

       
          />
        </Box>

      </Modal>

      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650, mt: 5 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {/* <TableCell>User ID</TableCell> */}
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="center">Manager</TableCell>
              <TableCell align="center">Status</TableCell>
              {/* <TableCell align="center">CreatedBy</TableCell>
            <TableCell align="center">UpdatedBy</TableCell>
            <TableCell align="center">CreatedAt</TableCell>
            <TableCell align="center">UpdatedAt</TableCell> */}
              <TableCell align="center">Action</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {user?.map((user) => (
              <TableRow
                key={user.userid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                {user.userid}
              </TableCell> */}
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">{user.level}</TableCell>
                <TableCell align="center">{user.manager}</TableCell>
                <TableCell align="center">{user.status === true ? "active" : "inactive"}</TableCell>
                {/* <TableCell align="center">{user.createdby}</TableCell>
              <TableCell align="center">{user.updatedby}</TableCell> */}
                {/* <TableCell align="center">
                {moment(user.createdat.toDate()).calendar()}
              
                </TableCell>
              <TableCell align="center">
                {moment(user.updatedat.toDate()).calendar()}


                </TableCell>
              */}


                <TableCell align="center" style={{ "color": "red" }}>

                  {/* <VisibilityIcon
              onClick={()=>ViewHander(user.id)}
              />  */}

                  <View id={user.id} />
                  <EditIcon onClick={() => editHander(user.id)} />


                  <DeleteIcon
                    style={{ "cursor": "pointer" }}
                    onClick={() => deleteuser(user.id)} />




                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}