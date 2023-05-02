import React, { useState } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    Button,
    Grid,
    FormGroup,
    FormControlLabel,

} from "@mui/material";

const AnalyzeForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        birthDate: "",
        acceptTerms: false,
        interests: [],
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your form submission logic goes here
        console.log(formData);
    };

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === "acceptTerms" ? checked : value,
            interests:
                name === "interests"
                    ? checked
                        ? [...prevState.interests, value]
                        : prevState.interests.filter((interest) => interest !== value)
                    : prevState.interests,
        }));
    };


    const interestsOptions = [
        { value: "music", label: "Music" },
        { value: "sports", label: "Sports" },
        { value: "books", label: "Books" },
    ];

    const renderSelectMenu = (options) => (
        <FormGroup>
            {options.map((option) => (
                <FormControlLabel
                    key={option.value}
                    control={
                        <Checkbox
                            name="interests"
                            value={option.value}
                            checked={formData.interests.includes(option.value)}
                            onChange={handleChange}
                        />
                    }
                    label={option.label}
                />
            ))}
        </FormGroup>
    );

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Country</InputLabel>
                        <Select
                            native
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                            <option value="Mexico">Mexico</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Birth Date"
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />


                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Interests</InputLabel>
                        <Select
                            multiple
                            name="interests"
                            value={formData.interests}
                            onChange={handleChange}
                            MenuProps={{
                                getContentAnchorEl: null,
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                },
                            }}
                        >
                            {renderSelectMenu(interestsOptions)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                            />
                        }
                        label="I accept the terms and conditions."
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AnalyzeForm;
