import * as React from "react";
import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
import { Typography, gridClasses } from "@mui/material";
import styled from "@emotion/styled";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGridState } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
  red: {
    backgroundColor: "red"
  }
});


const columns = [
  { field: "id", headerName: "ID", width: 0, hide: true },
  { field: "poNumber", headerName: "PO Number", width: 150 },
  {
    field: "raisedate",
    headerName: "Raise Date",
    width: 150,
  },
  {
    field: "supplierName",
    headerName: "Supplier Name/Code",
    width: 180,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
    align: "left",
  },
  {
    field: "deliveryDate",
    headerName: "Delivery Date",
    width: 150,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    align: "left",
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
  },
];

const initialRows = [
  {
    id: "yghju",
    poNumber: "PO1",
    raisedate: "22-05-2023",
    supplierName: "ABC",
    quantity: 100,
    deliveryDate: "06/06/2023",
    amount: 100000,
    status: "Accepted",
  },
  {
    id: "fghu654",
    poNumber: "PO2",
    raisedate: "22-05-2023",
    supplierName: "BEE Hive",
    quantity: 540,
    deliveryDate: "08/06/2023",
    amount: 1000000,
    status: "Accepted",
  },
  {
    id: "er54e",
    poNumber: "PO1",
    raisedate: "22-05-2023",
    supplierName: "ABC",
    quantity: 100,
    deliveryDate: "06/06/2023",
    amount: 100000,
    status: "Accepted",
  },
  {
    id: "234tfgh",
    poNumber: "PO2",
    raisedate: "22-05-2023",
    supplierName: "BEE Hive",
    quantity: 540,
    deliveryDate: "08/06/2023",
    amount: 1000000,
    status: "Accepted",
  },
  {
    id: "vg0tr92",
    poNumber: "PO1",
    raisedate: "22-05-2023",
    supplierName: "ABC",
    quantity: 100,
    deliveryDate: "06/06/2023",
    amount: 100000,
    status: "Accepted",
  },
  {
    id: "2345rds",
    poNumber: "PO2",
    raisedate: "22-05-2023",
    supplierName: "BEE Hive",
    quantity: 540,
    deliveryDate: "08/06/2023",
    amount: 1000000,
    status: "Accepted",
  },
  {
    id: "xct5432",
    poNumber: "PO1",
    raisedate: "22-05-2023",
    supplierName: "ABC",
    quantity: 100,
    deliveryDate: "06/06/2023",
    amount: 100000,
    status: "Accepted",
  },
  {
    id: "ert54382",
    poNumber: "PO2",
    raisedate: "22-05-2023",
    supplierName: "BEE Hive",
    quantity: 540,
    deliveryDate: "08/06/2023",
    amount: 1000000,
    status: "Accepted",
  },
  {
    id: "dfrt43",
    poNumber: "PO1",
    raisedate: "22-05-2023",
    supplierName: "ABC",
    quantity: 100,
    deliveryDate: "06/06/2023",
    amount: 100000,
    status: "Accepted",
  },
  {
    id: "e45rfdgt",
    poNumber: "PO2",
    raisedate: "22-05-2023",
    supplierName: "BEE Hive",
    quantity: 540,
    deliveryDate: "08/06/2023",
    amount: 1000000,
    status: "Accepted",
  },
  {
    id: "erfgyt54g",
    poNumber: "PO1",
    raisedate: "22-05-2023",
    supplierName: "ABC",
    quantity: 100,
    deliveryDate: "06/06/2023",
    amount: 100000,
    status: "Accepted",
  },
  {
    id: "er5432q",
    poNumber: "PO2",
    raisedate: "22-05-2023",
    supplierName: "BEE Hive",
    quantity: 540,
    deliveryDate: "08/06/2023",
    amount: 1000000,
    status: "Accepted",
  },
  {
    id: "ertfds",
    poNumber: "PO1",
    raisedate: "22-05-2023",
    supplierName: "ABC",
    quantity: 100,
    deliveryDate: "06/06/2023",
    amount: 100000,
    status: "Accepted",
  },
  {
    id: "34rtfd",
    poNumber: "PO2",
    raisedate: "22-05-2023",
    supplierName: "BEE Hive",
    quantity: 540,
    deliveryDate: "08/06/2023",
    amount: 1000000,
    status: "Accepted",
  },
  {
    id: "ser5432",
    poNumber: "PO1",
    raisedate: "22-05-2023",
    supplierName: "ABC",
    quantity: 100,
    deliveryDate: "06/06/2023",
    amount: 100000,
    status: "Accepted",
  },
  {
    id: "34rtedw",
    poNumber: "PO2",
    raisedate: "22-05-2023",
    supplierName: "BEE Hive",
    quantity: 540,
    deliveryDate: "08/06/2023",
    amount: 1000000,
    status: "Accepted",
  },
  {
    id: "hytresd",
    poNumber: "PO1",
    raisedate: "22-05-2023",
    supplierName: "ABC",
    quantity: 100,
    deliveryDate: "06/06/2023",
    amount: 100000,
    status: "Accepted",
  },
  {
    id: "fgyt543",
    poNumber: "PO2",
    raisedate: "22-05-2023",
    supplierName: "BEE Hive",
    quantity: 540,
    deliveryDate: "08/06/2023",
    amount: 1000000,
    status: "Accepted",
  },
];



export default function Supplier() {
  const [rows, setRows] = React.useState(initialRows);
  const [searchText, setSearchText] = React.useState("");


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  React.useEffect(() => {
    const applySearchFilter = (items, searchText) => {
      if (searchText === "") {
        return items;
      }
      const normalizedSearchText = searchText.toLowerCase();
      return items.filter((item) => {
        let matches = false;
        Object.values(item).forEach((value) => {
          if (
            typeof value === "string" &&
            value.toLowerCase().includes(normalizedSearchText)
          ) {
            matches = true;
          }
        });
        return matches;
      });
    };

    const filteredRows = applySearchFilter(initialRows, searchText);
    setRows(filteredRows);
  }, [searchText]);




  return (
    <Box>
      <Typography sx={{ padding: "10px 10px 10px 0" }}>Supplier Details</Typography>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchChange}
        variant="outlined"
        size="small"
        fullWidth
        style={{ marginBottom: 10, backgroundColor: 'white' }}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={30}
        disableColumnMenu={true}
        columnVisibilityModel={{
          id: false,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}

       
      />
    </Box>
  );
}
