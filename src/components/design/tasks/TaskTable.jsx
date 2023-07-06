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
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

import AddTaskForm from './AddTaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

import View from './View';

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


export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const tasksCollectionRef = collection(db, "tasks");

  const [edit, setEdit] = useState(true);
  const [view, setView] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setView(false);
  }

  const [bookID, setBookID] = useState("")
  console.log(bookID)

  const color = {
    color: 'white',
    background:'red'
  }
  


  useEffect(() => {

    const getTasks = async () => {

      // const data = await getDocs(tasksCollectionRef);
      // //  console.log(data)
      // setTasks(data.docs.map((doc) => ({
      //   ...doc.data(), id: doc.id
      // })));

      // console.log(project)

      onSnapshot(tasksCollectionRef, (snapshot) => {
        setTasks(snapshot.docs.map((doc) => ({
          ...doc.data(), id: doc.id
        })))
      })

    }
    getTasks();
  }, []);

  //delete
  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc)

    toast.success('Your task is deleted Successfully!', {
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



  return (

    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            label="Search Tasks by Name/ID"

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
          >Add Task</Button>
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
          <AddTaskForm
            handleClose={handleClose}
            handleOpen={handleOpen}
            id={bookID} setBookID={setBookID}
            edit={edit} view={view}

          />
        </Box>

      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, mt: 5 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Task ID</TableCell> */}
              <TableCell align="center">Task Name</TableCell>
              <TableCell align="center">Project ID</TableCell>
              <TableCell align="center">Module ID</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((task) => (
              <TableRow
                key={task.taskid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {task.taskid}
                </TableCell> */}
                <TableCell align="center">{task.taskname}</TableCell>
                <TableCell align="center">{task.projectid}</TableCell>
                <TableCell align="center">{task.moduleid}</TableCell>
                {/* <TableCell align="center">
                  
                  {moment(task.deadline.toDate()).calendar()}

                </TableCell> */}
                <TableCell align="center">{task.status === true ? "active" : "inactive"}</TableCell>
                {/* <TableCell align="center">{task.createdby}</TableCell>
                <TableCell align="center">{task.updatedby}</TableCell>
                <TableCell align="center">
                  {moment(task.createdat.toDate()).calendar()}

                </TableCell>
                <TableCell align="center">
                  {moment(task.updatedat.toDate()).calendar()}

                </TableCell>
                <TableCell align="center">{task.assignedby}</TableCell> */}
                {/* <TableCell align="center">
                  Assigned
         
                </TableCell>
                <TableCell align="center">{task.description}</TableCell> */}

                <TableCell align="center"
                 style={{"color":"red"}} 
                > 
                {/* <VisibilityIcon  onClick={()=>ViewHander(task.id)} /> */}

                 <View  id={task.id} />

                 <EditIcon
                  onClick={() => editHander(task.id)}
                />


                  <DeleteIcon
                    style={{ "cursor": "pointer" }}
                    onClick={() => deleteTask(task.id)} />




                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}