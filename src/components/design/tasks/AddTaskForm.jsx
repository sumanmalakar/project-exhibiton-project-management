import React, { useState, useEffect } from 'react'
import { db } from '../../Firebase/firebaseConfig';
import { Grid, TextField, Button } from '@mui/material';
import { collection, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { Timestamp } from "@firebase/firestore";


import { Input, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '16px', // Optional: Adds some spacing between input fields
    },
    label: {
        marginBottom: '8px', // Adds space below the label
    },
    timestamp: {
        marginTop: '8px', // Adds space above the timestamp
    },
}));


const AddTaskForm = ({  handleClose, id, setBookID, handleopen,view, edit  }) => {
    const classes = useStyles();


    // const [taskID, setTaskID] = useState("");
    const [taskName, setTaskName] = useState("");
    const [projectId, setProjectId] = useState("");
    const [moduleId, setModuleId] = useState("");
    const [assignedby, setAssignedby] = useState("");
    const [assignedto, setAssignedto] = useState("");
    const [status, setStatus] = useState("");
    const [deadline, setDeadline] = useState("");
    const [createdat, setCreatedat] = useState("");
    const [updatedat, setUpdatedat] = useState("");
    const [createdby, setCreatedby] = useState("");
    const [updatedby, setUpdatedby] = useState("");
    const [description, setDescription] = useState("");

    // let createdDate = Timestamp.fromDate(new Date(createdat));
    // let updatedDate = Timestamp.fromDate(new Date(updatedat));
    // let deadlineDate = Timestamp.fromDate(new Date(deadline));

    const taskCollectionRef = collection(db, "tasks");
    // const handleClose = () => setOpen(false);


    const getBook = (id) => {
        const bookDoc = doc(db, "tasks", id);
        return getDoc(bookDoc);
    };

    const updateBook = (id, updatedBook) => {
        const bookDoc = doc(db, "tasks", id);
        return updateDoc(bookDoc, updatedBook);
    };

    const editHandler = async () => {
        try {

            const docSnap = await getBook(id);
            console.log("the record is : ", docSnap.data());
            console.log(docSnap.data().createdby)
            console.log(docSnap.data().updatedby)
            // setTaskID(docSnap.data().taskid);
            setTaskName(docSnap.data().taskname);
            setModuleId(docSnap.data().moduleid);

            setCreatedby(docSnap.data().createdby)
            setUpdatedby(docSnap.data().updatedby)

            setProjectId(docSnap.data().projectid);
            setAssignedby(docSnap.data().assignedby);
            setAssignedto(docSnap.data().assignedto);
            setDescription(docSnap.data().description);
            setStatus(docSnap.data().status);

            // setCreatedDate(docSnap.data().createdat);
            // // setUpdatedDate(docSnap.data().updated);
            // setCreatedat(moment(docSnap.data().createdat.toDate()).calendar());
            // setUpdatedat(docSnap.data().setUpdatedat.toDate())
            setCreatedat(docSnap.data().createdat);




        } catch (err) {

        }
    }

    useEffect(() => {
        console.log("The id here is : ", id)

        if (id !== undefined && id !== "") {
            editHandler();
            // handleopen();
            // setBookID("")
        }


    }, [id])







    const addProject = async (e) => {
        e.preventDefault();
        
        const obj = {
            // taskid: taskID,
            taskname: taskName,
            status: status,
            moduleid: moduleId,
            
            projectid: projectId,
            createdat: new Date(),
            // updatedat: updatedDate,
            assignedto: assignedto,
            // deadline: deadlineDate,
            assignedby: assignedby,
            createdby: createdby,
            updatedby: updatedby,
            description: description
        }

        if (id !== undefined && id !== "") {
            await updateBook(id, obj)
            toast.success('Your project is updated Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setBookID("");
        }else{

            
            
            await addDoc(taskCollectionRef,obj
                )
                
                toast.success('Your task is added Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setBookID("");
            }
            handleClose();
    }

    return (
        <form onSubmit={addProject}>
            <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
                    <TextField
                        value={projectId}
                        label="Project ID"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setProjectId(e.target.value)}
                    />
                </Grid>
           

                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        value={taskID}
                        label="Task ID"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setTaskID(e.target.value)}
                    />
                </Grid> */}
            

                <Grid item xs={12} sm={6}>
                    <TextField
                        value={taskName}
                        label="Task Name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </Grid>
            
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={moduleId}
                        label="Module ID"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setModuleId(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        value={assignedby}
                        label="Assigned By"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setAssignedby(e.target.value)}
                        required

                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        value={assignedto}
                        label="Assigned To"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setAssignedto(e.target.value)}
                        required

                    />
                </Grid>

           
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={description}
                        label="Description"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)}
                        required

                    />
                </Grid>
    
{/* 
          {edit &&(     
                <Grid item xs={12} sm={12}>

                    <div className={classes.inputContainer}>
                        <Typography variant="body1" className={classes.label}>
                            Deadline:
                        </Typography>
                        <Input
                            value={deadline}
                            label="Deadline"
                            type="date"
                            onChange={(e) => setDeadline(e.target.value)}
                            required

                        />
                    </div>
                </Grid>)}
 */}

<Grid item xs={12} sm={6}>


<div>
    <label>
        <input
            type="checkbox"
            checked={status}
            onChange={(event) => setStatus(event.target.checked)}
        />
        Status
    </label>

</div>
</Grid>


<Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mr: 5 }}

                    >{(id !== undefined && id !== "") ? "Update Task" : "Add Task"}</Button>
                    
                </Grid>
            </Grid>
        </form>
    );

}

export default AddTaskForm




