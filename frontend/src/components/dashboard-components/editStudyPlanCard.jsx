import {useUserStore} from "@/stores/userStore.js";
import React, {useState, useEffect} from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditStudyPlanCard({setIsEditDialogOpen, studyPlan, isEditDialogOpen}) {
    const userStore = useUserStore();
    const [name, setName] = useState("");
    useEffect(() => {
        setName(studyPlan.name)
    }, [studyPlan]);
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

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this study plan?");
        if (confirmed) {
            try {
                await userStore.fetchProtected(`/study-plans/${studyPlan.id}`, {
                    method: "DELETE"
                });
                handleDialogClose();
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <Dialog open={isEditDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Edit card</DialogTitle>
            <DialogContent>
                <form onSubmit={handleFormSubmit}>
                    <FormControl fullWidth>
                        <InputLabel id="studyplan-name">{name}</InputLabel>
                        <TextField label="Edit name" value={name} onChange={handleNameChange} fullWidth/>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleFormSubmit}>Submit</Button>
                <Button onClick={handleDelete}><DeleteIcon color="error"></DeleteIcon></Button>
            </DialogActions>
        </Dialog>
    );
}
