import { Box, Button, Typography } from "@mui/material";
import React from "react";
import resoluteailogo from "../../assets/images/resoluteailogo.png";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

export default function Header() {

  return (
    <div
      style={{
        backgroundColor: "beige",
        display: "flex",
        justifyContent: "space-between",
        padding: " 5px 10px",
        position:"fixed",
        zIndex:"100"
      }}
    >
      <logo>
        <img
          src={resoluteailogo}
          alt="Facegenie-logo"
          style={{ width: "20%" }}
        />
      </logo>
      <Box sx={{ display: { xs: "none", sm: "block" }, color: "black" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button
            variant="outlined"
            sx={{ color: "black", borderColor: "black" }}
          >
            <Person2OutlinedIcon />
            <Typography sx={{ padding: "10px" }}>abc@abc.com</Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "black", borderColor: "black" }}
          >
            <NotificationsNoneOutlinedIcon />
          </Button>
        </div>
      </Box>
    </div>
  );
};

