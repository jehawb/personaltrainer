import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from "react";

// !!!!! NOT IMPLEMENTED !!!!!

export default function EditTraining(props) {

    // States

    const [training, setTraining] = useState({ activity: '', date: '', duration: '', customer: '' });
    const [showDialog, setShowDialog] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});

    // REST API functions

    const REST_URL = "http://traineeapp.azurewebsites.net/api/customers/";

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content);
            })
            .catch(error => console.error(error));
    }

    // Functions

    const handleClickOpen = () => {
        setTraining({ ...training, activity: props.training.activity, date: dayjs(props.training.date).format('DD/MM/YYYY'), duration: props.training.duration, customer: "http://traineeapp.azurewebsites.net/api/customers/" + props.training.customer.id });
        setShowDialog(true);
    }

    const handleInputChanged = (event) => {

    }

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setShowDialog(false);
        }
    }

    const editTraining = () => {
        console.log(training);
        setShowDialog(false);
        setTraining({ activity: '', date: '', duration: '', customer: '' });
    }

    const handleCustomerChanged = (event) => {
        setSelectedCustomer(event.target.value);    // event.target.value gives the href in this case, maybe because it's mentioned in the menu item?
        setTraining({ ...training, customer: event.target.value });
    }

    // Rendering

    return (
        <>
            <Button onClick={handleClickOpen}>Edit</Button>

            <Dialog
                open={showDialog}
                onClose={handleClose}>

                <DialogTitle>Edit training info</DialogTitle>

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
                                // TODO: Show the previous date in the date picker some how
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
                                // TODO: Figure out how to show the customer here from the training being edited
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
                    <Button onClick={editTraining}>Save</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}