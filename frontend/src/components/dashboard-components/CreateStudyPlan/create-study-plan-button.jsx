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
import { styled } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import { useUserStore } from "@/stores/userStore.js";

export default function CreateStudyPlanButton({isAddDialogOpen,setAddDialog,handleAddDialogClose,setStudyPlans}) {
  const [programId, setSelectedOption] = useState("");
  const [name, setInputValue] = useState("");

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
  const [programList, setProgramList] = useState([])
  useEffect(() => {
    userStore.fetchProtected("/programs/")
      .then(r => r.json())
      .then(d => setProgramList(d))
  }, [])

  const handleButtonClick = () => {
    setAddDialog(true);
  };


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    console.log("Selected option:", programId);
    console.log("Input value:", name);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ programId, name })
    };
    await userStore.fetchProtected("/study-plans/", requestOptions)
    handleAddDialogClose();
  };

  return (
    <>
      <CreateButton variant="contained" onClick={handleButtonClick}>
        <AddIcon></AddIcon>
        <Typography sx={{ padding: '0px', fontWeight: "bold", fontSize: '0.7rem' }}>Add study plan</Typography>
      </CreateButton>
      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add study plan</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select program</InputLabel>
              <Select
                labelId="select-label"
                value={programId}
                onChange={handleOptionChange}
              >
                {programList.map(program => (
                  <MenuItem key={program.id} value={program.id}>{program.name}</MenuItem>
                ))}

              </Select>
            </FormControl>
            <TextField
              label="Name your study plan"
              value={name}
              onChange={handleInputChange}
              fullWidth
            />
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

