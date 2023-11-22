import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {

    // States

    const [customer, setCustomer] = useState({ firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: '' });
    const [showDialog, setShowDialog] = useState(false);

    // Functions

    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        } else {
            setShowDialog(false);
        }
    }

    const handleSave = () => {
        props.addCustomer(customer);
        setShowDialog(false);
        setCustomer({ firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: '' }); // Clear add customer form after adding 
    }

    // Return

    return (
        <>
            <Button onClick={() => setShowDialog(true)}>New Customer</Button>

            <Dialog
                open={showDialog}
                onClose={handleClose}>

                <DialogTitle>Add a new customer</DialogTitle>

                <DialogContent>
                    <Stack>
                        <TextField
                            label='First name'
                            value={customer.firstname}
                            name='firstname'
                            onChange={handleInputChanged} />

                        <TextField
                            label='Last name'
                            value={customer.lastname}
                            name='lastname'
                            onChange={handleInputChanged} />

                        <TextField
                            label='email'
                            value={customer.email}
                            name='email'
                            onChange={handleInputChanged} />

                        <TextField
                            label='Phone number'
                            value={customer.phone}
                            name='phone'
                            onChange={handleInputChanged} />

                        <TextField
                            label='Street address'
                            value={customer.streetaddress}
                            name='streetaddress'
                            onChange={handleInputChanged} />

                        <TextField
                            label='Post code'
                            value={customer.postcode}
                            name='postcode'
                            onChange={handleInputChanged} />

                        <TextField
                            label='City'
                            value={customer.city}
                            name='city'
                            onChange={handleInputChanged} />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>

            </Dialog>
        </>
    );

}