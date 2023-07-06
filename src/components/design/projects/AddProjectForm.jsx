import React, { useState, useEffect } from 'react'
import { db } from '../../Firebase/firebaseConfig';
import { Grid, TextField, Button } from '@mui/material';
import { collection, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Autocomplete } from '@mui/material';



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





const AddProjectForm = ({ handleClose, id, setBookID,users, handleopen }) => {
    const classes = useStyles();


    const [projectID, setProjectID] = useState("");
    const [projectName, setProjectName] = useState("");
    const [status, setStatus] = useState("");

    const [assignedby, setAssignedby] = useState("");
    const [assignedto, setAssignedto] = useState("");
    const [deadline, setDeadline] = useState("");
    const [createdat, setCreatedat] = useState("");
    const [updatedat, setUpdatedat] = useState("");
    const [createdby, setCreatedby] = useState("");
    const [updatedby, setUpdatedby] = useState("");
    const [description, setDescription] = useState("");
    
    const projectCollectionRef = collection(db, "projects");
    // const handleClose = () => setOpen(false);


    // add teams code
    const [teams, setTeams] = useState([]);
    const handleOptionChange = (event, values) => {
        setTeams(values);
    };

    const getBook = (id) => {
        const bookDoc = doc(db, "projects", id);
        return getDoc(bookDoc);
    };

    const updateBook = (id, updatedBook) => {
        const bookDoc = doc(db, "projects", id);
        return updateDoc(bookDoc, updatedBook);
    };

    const editHandler = async () => {
        try {


            const docSnap = await getBook(id);
            console.log("the record is : ", docSnap.data());
            console.log(docSnap.data().createdby)
            console.log(docSnap.data().updatedby)
            setCreatedby(docSnap.data().createdby)
            setUpdatedby(docSnap.data().updatedby)

            setProjectName(docSnap.data().projectname);
            setStatus(docSnap.data().status);
            setProjectID(docSnap.data().projectid);
            setAssignedby(docSnap.data().assignedby);
            setAssignedto(docSnap.data().assignedto);
            setDescription(docSnap.data().description);
            setCreatedat(moment(docSnap.data().createdat.toDate()).calendar());
            setUpdatedat(docSnap.data().setUpdatedat.toDate())
            setCreatedat(docSnap.data().createdat);
            setTeams(docSnap.data().teams)
            // setTeams("hii")

            console.log(docSnap.data().teams);


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
            projectid: projectID,
            projectname: projectName,
            status: status,
            createdat: new Date(),
            assignedto: assignedto,
            assignedby: assignedby,
            createdby: createdby,
            updatedby: updatedby,
            description: description,
            teams:teams,


        }

        if (id !== undefined && id !== "") {
            // await updateBook(id, obj)
            await updateBook(id, {
                projectid: projectID,
                projectname: projectName,
                status: status,
                createdat: new Date(),
                assignedto: assignedto,
                assignedby: assignedby,
                createdby: createdby,
                updatedby: updatedby,
                description: description,
                // teams:teams,
    
    
            }
                
                )
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

            // setBookID("");
        } else {

            await addDoc(projectCollectionRef,
                obj)

            toast.success('Your project is added Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            // setBookID("");

        }
        setBookID("");

        handleClose();

    }



    return (
        <form onSubmit={addProject}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                    <TextField
                        value={projectID}
                        label="Project ID"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setProjectID(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={projectName}
                        label="Project Name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setProjectName(e.target.value)}
                        required
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


                <Grid item xs={12} sm={12}>
                                <Autocomplete
                                    multiple
                                    options={users}
                                    getOptionLabel={(users) => users.username}
                                    // value={undefined}
                                    value={teams}
                                    required
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
                        color="secondary"
                        type="submit"
                        sx={{ mr: 5 }}

                    >

                        {(id !== undefined && id !== "") ? "Update project" : "Add project"}
                    </Button>

                </Grid>

            </Grid>
        </form>
    );

}

export default AddProjectForm




