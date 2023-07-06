import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDoc, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

import { Grid, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';


import { Input } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from '../projects/DataTable'


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

const CreateTeams = () => {

    const classes = useStyles();


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [project, setProject] = useState();
    const [users, setUsers] = useState();
    const projectCollectionRef = collection(db, "projects");
    const userCollectionRef = collection(db, "users");

    const teamsCollectionRef = collection(db, "teams");


    const [teams, setTeams] = React.useState([]);

    const handleOptionChange = (event, values) => {
        setTeams(values);
    };


    const [proj, setProj] = useState('');

    const handleOptionChange2 = (event) => {
        setProj(event.target.value);
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        const obj = {
            teams: teams,
            projectname: proj,

        };

        await addDoc(teamsCollectionRef, obj);

        toast.success('Your Team is Created Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        handleClose();
        setTeams(" ");
        setProj(" ");

    };

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

    return (
        <>
            <Button variant="contained" sx={{ marginLeft: '3rem', backgroundColor: 'red' }}
                onClick={handleOpen}
            // sx={color}
            >Create Teams </Button>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={submitHandler}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>

                                <div>
                                    <label htmlFor="options" className="input-label">Choose Project </label>{" "}
                                    <select id="options" value={proj} onChange={handleOptionChange2} className="input-select"
                                        required
                                    >
                                        <option value="">Select Project</option>

                                        {project?.map((e) => <option value={e.projectname}>{e.projectname}</option>)}
                                    </select>

                                </div>
                            </Grid>



                            <Grid item xs={12} sm={12}>
                                <Autocomplete
                                    multiple
                                    options={users}
                                    getOptionLabel={(users) => users.username}
                                    value={undefined}
                                    
                                    onChange={handleOptionChange}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Add Members" variant="outlined"
                                        // required
                                         />
                                    )}


                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    // color="primary"
                                    type="submit"
                                    sx={{ mr: 5 }}


                                > Create Team </Button>

                            </Grid>

                        </Grid>


                    </form>
                </Box>
            </Modal>
<div style={{marginTop:"2rem"}} >

<DataTable />


</div>
        </>
    )
};

export default CreateTeams