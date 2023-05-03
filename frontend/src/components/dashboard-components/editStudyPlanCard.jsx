import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";

export default function EditStudyPlanCard({ setIsEditDialogOpen, studyPlan, isEditDialogOpen }) {
  
  const [name, setName] = useState("");
  useEffect(() => {
    setName(studyPlan.name)
  }, []);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(studyPlan);
    console.log("Input value:", name);
    // const requestOptions = {
    //   method: 'POST',
    //   body: JSON.stringify({ programId, name })
    // };
    // userStore.fetchProtected("/study-plans/", requestOptions)
    handleDialogClose();
  };

  return (
    <Dialog open={isEditDialogOpen} onClose={handleDialogClose}>
      <DialogTitle>Edit card</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <FormControl fullWidth>
            <InputLabel id="studyplan-name">{name}</InputLabel>
            <TextField label="Edit name" value={name} onChange={handleNameChange} fullWidth />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
