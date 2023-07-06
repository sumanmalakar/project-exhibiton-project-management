// import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { db } from '../../Firebase/firebaseConfig';
import { Grid, TextField, Button } from '@mui/material';
import { Timestamp } from "@firebase/firestore";
import { collection, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';


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


const AddRoleForm = ({ handleClose, id, setBookID, handleopen, color, view, edit }) => {
    const classes = useStyles();

    const [roleID, setRoleID] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState(true);
    const [level, setLevel] = useState("");
    const [createdby, setCreatedby] = useState(new Date());
    const [updatedby, setUpdatedby] = useState("");
    const [createdat, setCreatedat] = useState("");
    const [updatedat, setUpdatedat] = useState("");
    let createdDate = Timestamp.fromDate(new Date());
    let updatedDate = Timestamp.fromDate(new Date(updatedat));
    const [permissions, setPermissions] = useState({
        name: '',
        level: '',
        projects: {
            create: false,
            view: false,
            edit: false,
            delete: false,
        },
        tasks: {
            create: false,
            view: false,
            edit: false,
            delete: false,
        },
        users: {
            create: false,
            view: false,
            edit: false,
            delete: false,
        },

    })

    const roleCollectionRef = collection(db, "roles");

    const [counter, setCounter] = useState(1);
    const generateId = () => {
        const newId = `id_${counter}`;
        setCounter(counter + 1);
        return newId;
    };


    console.log(createdat + " " + updatedat)

    const getBook = (id) => {
        const bookDoc = doc(db, "roles", id);
        return getDoc(bookDoc);
    };

    const updateBook = (id, updatedBook) => {
        const bookDoc = doc(db, "roles", id);
        return updateDoc(bookDoc, updatedBook);
    };
    const handleCheckboxChange = (fieldName, category) => {
        setPermissions((prevData) => ({
          ...prevData,
          [category]: {
            ...prevData[category],
            [fieldName]: !prevData[category][fieldName],
          },
        }));
      };


    const editHandler = async () => {
        try {


            const docSnap = await getBook(id);
            console.log("the record is : ", docSnap.data());


            setRoleID(docSnap.data().roleid);
            setName(docSnap.data().name);
            // setStatus(docSnap.data().status);
            if (docSnap.data().status === true ? setStatus(true) : setStatus(false))
                console.log(docSnap.data().status)
            setLevel(docSnap.data().level);


            setCreatedat(docSnap.data().createdat);
            setPermissions(docSnap.data().permissions);
            console.log(docSnap.data().createdat)




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

    console.log(status)


    const addProject = async (e) => {
        e.preventDefault();
        generateId();

        const obj = {
            // roleid: counter,
           name: name,
            status: status,
            level: level,
            createdat: new Date(),
            permissions: permissions
            // updatedat: updatedDate,
            // createdby: createdby,
            // updatedby: updatedby


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
        }
        else {

            await addDoc(roleCollectionRef, obj)
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

            setRoleID("")
        }
        handleClose();
    }

    return (
        <form onSubmit={addProject}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                    <TextField
                        value={name}
                        label="Name"
                       
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        fullWidth
                        required

                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        value={level}
                        name="level"
                        label="Level"
                        variant="outlined"
                        onChange={(e) => setLevel(e.target.value)}

                        fullWidth
                        type="text"
                        required

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
                                checked={permissions.projects.create}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('create', 'projects')}
                            />
                           create
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="view"
                                checked={permissions.projects.view}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('view', 'projects')}

                            />
                            view
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="edit"
                                checked={permissions.projects.edit}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('edit', 'projects')}

                            />
                            edit
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="delete"
                                checked={permissions.projects.delete}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('delete', 'projects')}

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
                                checked={permissions.tasks.create}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('create', 'tasks')}

                            />
                           create
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="view"
                                checked={permissions.tasks.view}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('view', 'tasks')}

                            />
                            view
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="edit"
                                checked={permissions.tasks.edit}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('edit', 'tasks')}

                            />
                            edit
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="delete"
                                checked={permissions.tasks.delete}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('delete', 'tasks')}

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
                                checked={permissions.users.create}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('create', 'users')}

                            />
                           create
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="view"
                                checked={permissions.users.view}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('view', 'users')}

                            />
                            view
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="edit"
                                checked={permissions.users.edit}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('edit', 'users')}

                            />
                            edit
                        </label>

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="delete"
                                checked={permissions.users.delete}
                                // onChange={handleCheckboxChange}
                                onChange={() => handleCheckboxChange('delete', 'users')}

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
            onChange={(event) => setStatus(event.target.checked)}
        />
        Status
    </label>

</div>
</Grid>
               




                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        // color="primary"
                        type="submit"
                        sx={{ mr: 5 }}


                    > {(id !== undefined && id !== "") ? "Update Role" : "Add Role"} </Button>

                </Grid>
            </Grid>
        </form>
    );

}

export default AddRoleForm




