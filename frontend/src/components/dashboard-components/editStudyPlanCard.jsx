import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import {useUserStore} from "@/stores/userStore.js";

export default function EditStudyPlanCard({fetchStudyPlans,setIsEditDialogOpen, studyPlan, isEditDialogOpen }) {
  const userStore = useUserStore();
  const [name, setName] = useState("");
  
  useEffect(() => {
    setName(studyPlan.name)
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
    fetchStudyPlans()
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    console.log(studyPlan);
    console.log("New name:", name);

    await userStore.fetchProtected(`/study-plans/${studyPlan.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            name: name
        }),
    })
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
