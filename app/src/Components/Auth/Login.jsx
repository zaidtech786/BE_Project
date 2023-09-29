import * as React from "react";
import { Grid, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../Context/UseContext";

export default function LoginUserForm({ handleNext }) {
  const navigate = useNavigate();
  const {setState} = React.useContext(AppContext)
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const handleCloseSnakbar=()=>setOpenSnackBar(false);
 

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const userData={
      email: data.get("email"),
      password: data.get("password"),
     
    }
    console.log("login user",userData);
  

  };

  return (
    <React.Fragment className=" shadow-lg ">
      <form className="w-full" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="given-name"
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{padding:".8rem 0"}}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center">
         <div className="py-3 flex items-center">
        <p className="m-0 p-0">don't have account ?</p>
        <Button onClick={()=> {
           setState("register")
          // navigate("/register")
          }} className="ml-5" size="small">
          Register
        </Button>
        </div>
      </div>
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnakbar}>
        <Alert onClose={handleCloseSnakbar} severity="success" sx={{ width: '100%' }}>
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
