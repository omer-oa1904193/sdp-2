import React, { useState, useEffect} from "react";
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
import {styled} from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import { useUserStore } from "@/stores/userStore.js";

export default function CreateStudyPlanButton(){
  const [open, setOpen] = useState(false);
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
  const [programList,setProgramList] = useState([])
  useEffect(() => {
    userStore.fetchProtected("/study-plans/")
    .then(r => r.json())
    .then(d => setProgramList(d))
}, [])
console.log(programList)

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ programId, name })
    };
    userStore.fetchProtected("/study-plans/",requestOptions)
}, [])

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Selected option:", programId);
    console.log("Input value:", name);
    handleDialogClose();
  };

  return (
    <>
      <CreateButton variant="contained" onClick={handleButtonClick}>
      <AddIcon></AddIcon>
        <Typography sx={{ padding: '0px', fontWeight: "bold", fontSize: '0.7rem' }}>Add study plan</Typography>
      </CreateButton>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Option</InputLabel>
              <Select
                labelId="select-label"
                value={programId}
                onChange={handleOptionChange}
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Input Value"
              value={name}
              onChange={handleInputChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

