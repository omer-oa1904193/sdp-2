import React, { useState,useEffect } from "react";
import {useRouter} from "next/router";
import {useUserStore} from "@/stores/userStore.js";
import {SEASONS_ORDER} from "@/constants.js";
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
    Box

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
    const router = useRouter()
    const userStore = useUserStore();
    const [studyPlan, setStudyPlan] = useState(null);
    const { studyPlanId } = router.query;


    useEffect(() => {
        userStore.fetchProtected(`/study-plans/${studyPlanId}`)
            .then(r => r.json())
            .then(studyPlan => {
                const yearMap = new Map();
                const stats = {
                    courses: studyPlan.courseMappings.length + studyPlan.electiveMappings.length,
                    completed: 0, remaining: 0, progress: 0, creditHours: 0, tuitionFees: 0,
                }
                studyPlan.courseMappings.forEach(courseMapping => {
                    if (!yearMap.has(courseMapping.year))
                        yearMap.set(courseMapping.year, new Map(SEASONS_ORDER.map(s => [s, new Map()])),);
                    yearMap.get(courseMapping.year).get(courseMapping.season).set(`course-${courseMapping.id}`, {
                        ...courseMapping,
                        isElective: false
                    });
                });
                studyPlan.electiveMappings.forEach(electiveMapping => {
                    if (!yearMap.has(electiveMapping.year))
                        yearMap.set(electiveMapping.year, new Map(SEASONS_ORDER.map(s => [s, new Map()])),);
                    yearMap.get(electiveMapping.year).get(electiveMapping.season).set(`elective-${electiveMapping.id}`, {
                        ...electiveMapping,
                        isElective: true
                    });
                });

                setStudyPlan({...studyPlan, yearMap, stats});
            })
    }, [studyPlanId])
    console.log(studyPlan)

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
                <FormControlLabel sx={{margin: '0px'}}
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
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
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
                </Grid>
                <Grid item xs={6} md={4}>
                </Grid>

            </Grid>
        </Box>
    );
};

export default AnalyzeForm;
