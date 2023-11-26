import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AddTraining(props) {

    // States

    const [training, setTraining] = useState({ activity: '', date: '', duration: '', customer: '' });
    const [showDialog, setShowDialog] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});

    // REST API functions

    const REST_URL = "http://traineeapp.azurewebsites.net/api/customers/";

    useEffect(() => getCustomers(), []);    // Fetch customers for the dropdown menu (does it get called as trainings page is shown or when add training button is pressed? I suspect the first)

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                // console.log(responseData.content);
                setCustomers(responseData.content);
            })
            .catch(error => console.error(error));
    }

    // Functions

    const handleInputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        }
    }

    const handleSave = () => {
        props.addTraining(training);
        setShowDialog(false);
        setTraining({ activity: '', date: '', duration: '', customer: '' });  // Clear training state after adding new one
    }

    const handleCustomerChanged = (event) => {
        setSelectedCustomer(event.target.value);    // event.target.value gives the href in this case, maybe because it's mentioned in the menu item?
        setTraining({ ...training, customer: event.target.value });
    }

    // Rendering

    return (
        <>
            <Button onClick={() => setShowDialog(true)}>New training</Button>

            <Dialog
                open={showDialog}
                onClose={handleClose}>

                <DialogTitle>Add a new training</DialogTitle>

                <DialogContent>
                    <Stack>
                        <TextField
                            label='Activity name'
                            value={training.activity}
                            name='activity'
                            onChange={handleInputChanged} />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date"
                                name="date"
                                format="DD / MM / YYYY"     // Format shown to user
                                value={training.date}
                                onChange={newdate => setTraining({ ...training, date: newdate.format("YYYY-MM-DD") })}  // Format to be saved into database
                            />
                        </LocalizationProvider>

                        <TextField
                            label='Duration'
                            value={training.duration}
                            name='duration'
                            onChange={handleInputChanged} />

                        <FormControl>
                            <InputLabel id="customer">Customer</InputLabel>
                            <Select
                                labelId="customer"
                                label='Customer'
                                value={selectedCustomer}
                                name='customer'
                                onChange={handleCustomerChanged}>
                                {customers.map((customer) => (
                                    <MenuItem
                                        key={customer.links[0].href}
                                        value={customer.links[0].href}>
                                        {customer.lastname}, {customer.firstname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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