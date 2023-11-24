import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function AddTraining() {

    // States

    const [training, setTraining] = useState({ activity: '', date: '', duration: '', customer: null });
    const [showDialog, setShowDialog] = useState(false);

    // Functions

    const handleInputChanged = () => {

    }

    const handleClose = () => {

    }

    const handleSave = () => {
        
    }

    // Rendering

    return (
        <>

        </>
    );
}