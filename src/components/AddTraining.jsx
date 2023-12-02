import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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
                            <DateTimePicker
                                label="Date"
                                name="date"
                                format="DD/MM/ YYYY HH.mm"     // Format shown to user, HH forces 24h format
                                // TODO: add time to training aswell
                                value={training.date}
                                ampm={false}    // 24h format
                                onChange={newdate => setTraining({ ...training, date: dayjs(newdate).toISOString() })}  // Format to be saved into database
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
                                // name='customer'      // causes out of index errors, maybe?
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