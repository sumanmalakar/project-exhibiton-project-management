import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDoc, doc } from 'firebase/firestore'

import { Grid, TextField } from '@mui/material';

import { Input } from '@mui/material';
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

const View = ({ id }) => {
    console.log(id);
    const classes = useStyles();


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [roleName, setRoleName] = useState("");
    const [role, setRole] = useState("")
    const [level, setLevel] = useState("");
    const [manager, setManager] = useState("");
    const [status, setStatus] = useState("");
    const [permissions, setPermissions] = useState([])
   
    const [createdat, setCreatedat] = useState("");




    const getBook = (id) => {
        const bookDoc = doc(db, "roles", id);
        return getDoc(bookDoc);
    };



    const show = async () => {

        const docSnap = await getBook(id);
        // console.log("the record is : ", docSnap.data());

            setRoleName(docSnap.data().name)
        setRole(docSnap.data().role);
        setLevel(docSnap.data().level);
        setManager(docSnap.data().manager);
        setStatus(docSnap.data().status);
        setCreatedat(docSnap.data().createdat);
        setPermissions(docSnap.data().permissions);
        console.log(docSnap.data().permissions)

    



    }

    useEffect(() => {


        show();



    }, [id])

    return (
        <>


            <VisibilityIcon onClick={handleOpen} />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Grid container spacing={2}>
    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={roleName}
                            label="Role Name"
                            variant="outlined"
                            fullWidth

                        />
                    </Grid>
                    

                <Grid item xs={12} sm={6}>
                    <TextField
                        value={level}
                        label="Level"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>


                <br />
                <Grid item xs={12} sm={12}>
            <h3>Projects</h3>
                <div  style={{display:'flex', justifyContent:'space-between'}}>

         
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="create"
                                checked={permissions.projects?.create}
                               
                            />
                           create
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="view"
                                checked={permissions.projects?.view}

                            />
                            view
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="edit"
                                checked={permissions.projects?.edit}
        
                            />
                            edit
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="delete"
                                checked={permissions.projects?.delete}
                           

                            />
                           delete
                        </label>
                        </div>
                    </div>
                </Grid>
                
               
                <Grid item xs={12} sm={12} >
            <h3>Tasks</h3>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                
            
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="create"
                                checked={permissions.tasks?.create}
                              
                            />
                           create
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="view"
                                checked={permissions.tasks?.view}
                        

                            />
                            view
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="edit"
                                checked={permissions.tasks?.edit}
                             
                            />
                            edit
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="delete"
                                checked={permissions.tasks?.delete}
                            
                            />
                           delete
                        </label>

                    </div>
                    </div>
                </Grid>
                <br />
                
                <Grid item xs={12} sm={12} >
            <h3>Users</h3>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="create"
                                checked={permissions.users?.create}
                            
                            />
                           create
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="view"
                                checked={permissions.users?.view}
                               
                            />
                            view
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="edit"
                                checked={permissions.users?.edit}
                           
                            />
                            edit
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="delete"
                                checked={permissions.users?.delete}
                              
                            />
                           delete
                        </label>

                    </div>
                   </div>

                </Grid>

                <Grid item xs={12} sm={6}>


<div>
    <label>
        <input
            type="checkbox"
            checked={status}
           
        />
        Status
    </label>

</div>
</Grid>



                        <Grid item xs={12} sm={12}>
                            <div className={classes.inputContainer}>
                                <Typography variant="body1" className={classes.label}>
                                    CreatedAt:
                                </Typography>
                                <Input
                                    // value={new Date(createdat*1000)}
                                    value={new Date(createdat.seconds * 1000 + createdat.nanoseconds / 1000000)}
                                    placeholder="Createdat"


                                />

                            </div>
                        </Grid>

                    </Grid>
                </Box>
            </Modal>

        </>
    )
}

export default View