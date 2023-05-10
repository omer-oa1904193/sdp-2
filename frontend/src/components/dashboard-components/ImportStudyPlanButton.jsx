import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import { useUserStore } from "@/stores/userStore.js";

export default function ImportStudyPlanButton({isImportDialogOpen,setImportDialog,handleAddDialogClose}){

    const [url, setInputValue] = useState("");
  
    const CreateButton = styled(Button)({
      background: "#267BAA",
      color: "#FFFFFF",
      borderRadius: "10px",
      boxShadow: "none",
      "&:hover": {
        background: "#FFFFFF",
        color: "#267BAA",
        boxShadow: "none",
        fontWeight: "bold",
        transform: "scale(1.02)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      },
    });
  
    const userStore = useUserStore();
    // useEffect(() => {
    //   userStore.fetchProtected("/programs/")
    //     .then(r => r.json())
    //     .then(d => setProgramList(d))
    // }, [])
  
    const handleButtonClick = () => {
        setImportDialog(true);
    };
  
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleFormSubmit = async(event) => {
      event.preventDefault();
      console.log("Input value:", url);
 
      handleAddDialogClose();
    };
  
    return (
      <>
        <CreateButton variant="contained" onClick={handleButtonClick}>
          <AddIcon></AddIcon>
          <Typography sx={{ padding: '0px', fontWeight: "bold", fontSize: '0.7rem' }}>Import study plan</Typography>
        </CreateButton>
        <Dialog open={isImportDialogOpen} onClose={handleAddDialogClose}>
          <DialogTitle>Import study plan</DialogTitle>
          <DialogContent>
            <form onSubmit={handleFormSubmit}>
              <FormControl fullWidth>
              <TextField
                label="Paste URL"
                value={url}
                onChange={handleInputChange}
                fullWidth
              />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose}>Cancel</Button>
            <Button onClick={handleFormSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
