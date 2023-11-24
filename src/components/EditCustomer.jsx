import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function EditCustomer(props) {

    // States

    const [customer, setCustomer] = useState({ firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: '' });
    const [showDialog, setShowDialog] = useState(false);

    // Functions

    const handleClickOpen = () => {
        console.log(props.customer);
        setCustomer({ ...customer, firstname: props.customer.firstname, lastname: props.customer.lastname, email: props.customer.email, phone: props.customer.phone, streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, city: props.customer.city });
        setShowDialog(true);
    }

    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        }
    }

    const editCustomer = () => {
        console.log(props.customer.links[0].href);
        props.editCustomer(customer, props.customer.links[0].href); // Link may not be the right one
        setShowDialog(false);
        setCustomer({ firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: '' });
    }

    // Rendering
    
    return (
        <>
            <Button onClick={handleClickOpen}>Edit</Button>

            <Dialog
                open={showDialog}
                onClose={handleClose}>

                <DialogTitle>Edit customer info</DialogTitle>

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
                    <Button onClick={editCustomer}>Save</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}