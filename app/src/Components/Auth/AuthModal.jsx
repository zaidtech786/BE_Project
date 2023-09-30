import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import { useContext, useEffect, useState } from "react";
import LoginUserForm from "./Login";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/UseContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ handleClose, open }) {
  const {state,setState} = useContext(AppContext);
  console.log(state)
  const location = useLocation();
  const navigate=useNavigate()
 
  return (
    <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="large"
    >
      <Box className="rounded-md" sx={style}>
        {location.pathname === "/login" ? (
          <LoginUserForm />
        ) :
       (
        <RegisterUserForm/>
       )
      }
      </Box>
    </Modal>
    
    </>
    
  );
}
