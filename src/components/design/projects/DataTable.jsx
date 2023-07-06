import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

import View from './View';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Icons = () =>{
  return (<>
    {/* <View />
    <EditIcon/>
    <DeleteIcon
      style={{ "cursor": "pointer" }}
    /> */}
<h1>Hello</h1>
  </>)
}



const columns = [
  // { field: 'id', headerName: 'ID' , width:200},
  { field: 'projectid', headerName: 'ProjectID', width: 150 },
  { field: 'projectname', headerName: 'Project Name', width: 200 },
  {
    field: 'assignedby',
    headerName: 'AssignedBy',
    type: 'number', width: 150

  },
  {
    field: 'assignedto',
    headerName: 'Assigned To',
    type: 'number', width: 150

  },
  {
    field: 'description',
    headerName: 'Description',
    type: 'number', width: 150

  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'number', width: 150

  },
  // {
  //   field: {Icons},
  //   headerName: 'Action',
  //   type: 'number', width: 200

  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,

  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


export default function DataTable() {
  const [data, setdata] = useState([])
  const [role, setRole] = useState([]);
  const roleCollectionRef = collection(db, "projects");

  useEffect(() => {
    onSnapshot(roleCollectionRef, (snapshot) => {
      setRole(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    })

    // rows.map((d) => setdata(d))

    // console.log(role)
  }, []);

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        rows={role}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      >
        <h1>This is another table </h1>
      </DataGrid>
    </div>
  );
}