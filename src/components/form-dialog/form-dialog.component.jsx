import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { createProject } from "../../utils/firebase/firebase.utils";

export default function FormDialog() {
  const { currentUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleCreateProject = async () => {
    try {
        await createProject(currentUser, name);
    } catch (error) {
       console.log("Error creating project.", error);
    }
    setName("");
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a projeect, enter your project name below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateProject}>Create Project</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
