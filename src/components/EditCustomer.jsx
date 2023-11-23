import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function EditCustomer(props) {

    // states
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: '' });
    const [showDialog, setShowDialog] = useState(false);

    // functions
    const handleClickOpen = () => {
        console.log(props.customer);
        setCar({ ...customer, firstname: props.customer.firstname, lastname: props.customer.lastname, email: props.customer.email, phone: props.customer.phone, streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, city: props.customer.city });
        setShowDialog(true);
    }

    const handleInputChanged = (event) => {
        setCar({ ...customer, [event.target.name]: event.target.value });
    }

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        } else {
            setShowDialog(false);
        }
    }

    const updateCustomer = () => {
        props.updateCustomer(customer, props.data.customer.links[0].href); // Link may not be the right one
        setShowDialog(false);
        setCustomer({ firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: '' });
    }

    // return
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
                    <Button onClick={updateCustomer}>Save</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}