import './InputField.css';
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button } from '@mui/material';
import { Timestamp } from "@firebase/firestore";
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDoc, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Input, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Autocomplete } from '@mui/material';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

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



const AddUserForm = ({ handleClose, id, setBookID, roles }) => {
    console.log(roles.name)
    const classes = useStyles();

    const [userID, setUserID] = useState("");
    const [userName, setUserName] = useState("");
    // const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [level, setLevel] = useState("");
    const [manager, setManager] = useState("");
    const [createdby, setCreatedby] = useState("");
    const [updatedby, setUpdatedby] = useState("");
    const [createdat, setCreatedat] = useState("");
    const [updatedat, setUpdatedat] = useState("");
    let createdDate = Timestamp.fromDate(new Date(createdat));
    let updatedDate = Timestamp.fromDate(new Date(updatedat));
    const userCollectionRef = collection(db, "users");  

    
 
    const [selectedOptions, setSelectedOptions] = useState([]);

    

    const [role, setRole] = useState('');

      const handleOptionChange = (event) => {
        setRole(event.target.value);
      };
    

    console.log(createdDate + " " + updatedDate)

    const getBook = (id) => {
        const bookDoc = doc(db, "users", id);
        return getDoc(bookDoc);
    };

    const updateBook = (id, updatedBook) => {
        const bookDoc = doc(db, "users", id);
        return updateDoc(bookDoc, updatedBook);
    };



    const editHandler = async () => {
        try {
            const docSnap = await getBook(id);
            console.log("the record is : ", docSnap.data());
           
            setUserName(docSnap.data().username)
            // setUserID(docSnap.data().userid);
            setLevel(docSnap.data().level);
            // setUpdatedby(docSnap.data().updatedby)
            setRole(docSnap.data().role);
            setStatus(docSnap.data().status);
            setManager(docSnap.data().manager);

            setCreatedat(docSnap.data().createdat);
           
        } catch (err) {

        }
    }

    useEffect(() => {
        // console.log("The id here is : ", id)

       

        if (id !== undefined && id !== "") {
            editHandler();

        }


    }, [id])




    const addProject = async (e) => {
        e.preventDefault();

        const obj = {
            // userid: userID,
            username: userName,
            role: role,
            status: status,
            level: level,
            manager: manager,
            createdat: new Date(),
            // selectedOptions:selectedOptions,
            // selectedOption:selectedOption,
            // updatedat: updatedDate,
            // createdby: createdby,
            // updatedby: updatedby,
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
        } else {


            await addDoc(userCollectionRef, obj)

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
        }
        handleClose();

    }
    // const options = [
    //     { label: '1', value: 'suman' },
    //     { label: '2', value: 'aman' },
    //     { label: '3', value: 'ram' },
    //   ];

    

    return (
        <form onSubmit={addProject}>
            <Grid container spacing={2}>

                {/* <Grid item xs={12} sm={6}>
                    <TextField
                       value={userID}
                        label="User ID"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setUserID(e.target.value)}
                    />


                </Grid> */}

{/* 
{roles?.map((role)=>{
    return (
<>
<div>  
   
<h1>{role.name}

 </h1>
 <h1>{role.level}</h1>
 </div>
 
</>
    )
}) } */}

<Grid item xs={12} sm={12}>

{/* <Autocomplete
      multiple
      options={roles}
      getOptionLabel={(roles) => roles.name}
      value={selectedOptions}
      onChange={handleOptionChange}
      renderInput={(params) => (
        <TextField {...params} label="Select Roles" variant="outlined" />
      )}
    /> */}
 <div>
      <label htmlFor="options" className="input-label">Role:</label>{" "}
      <select id="options" value={role} onChange={handleOptionChange} className="input-select">
        <option value="">Select Role</option>
    
        {roles?.map((e)=><option value={e.name}>{e.name}</option>)}
      </select>
    
    </div>
            </Grid>  

               <Grid item xs={12} sm={6}>
                    <TextField
                        value={userName}
                        label="User Name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </Grid>

             
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        value={role}
                        label="Role"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setRole(e.target.value)}
                        required

                    />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={level}
                        label="Level"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setLevel(e.target.value)}
                        required

                    />
                </Grid>
              



                <Grid item xs={12} sm={6}>
                    <TextField
                        value={manager}
                        label="Manager"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setManager(e.target.value)}
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


            <Grid item xs={12}>
                    <Button
                        variant="contained"
                        // color="primary"
                        type="submit"
                        sx={{ mr: 5 }}


                    > {(id !== undefined && id !== "") ? "Update User" : "Add User"} </Button>

                </Grid>

            </Grid>
        </form>
    );

}

export default AddUserForm




