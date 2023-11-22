import { Snackbar } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import AddCustomer from './Addcustomer';

export default function Customers() {

    // States

    const [customers, setCustomers] = useState([]);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);

    // Ag-Grid columns

    const columnProperties = {
        sortable: true, 
        filter: true, 
        floatingFilter: true
    }

    const columnDefs = [
        { headerName: "Last Name", field: "lastname", ...columnProperties },
        { headerName: "First Name", field: "firstname", ...columnProperties },
        { headerName: "Address", field: "streetaddress", ...columnProperties },
        { headerName: "Postcode", field: "postcode", ...columnProperties },
        { headerName: "City", field: "city", ...columnProperties },
        { headerName: "email", field: "email", ...columnProperties },   // I sure hope this application is not for public use
        { headerName: "Phone number", field: "phone", ...columnProperties },
    ]

    // REST API functions

    const REST_URL = "http://traineeapp.azurewebsites.net/api/customers";
    // Alternative api call https://traineeapp.azurewebsites.net/getcustomers

    useEffect(() => getCustomers(), []);    // Call getCustomers when rendering the component first time

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData:" + responseData.content);
                setCustomers(responseData.content);
            })
            .catch(error => console.error(error));
    }

    const addCustomer = (customer) => {
        // alert("Adding a new customer to database"); // Triggers when pressing save customer button on add new customer form / dialog, maybe useless

        fetch(REST_URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(response.ok) {
                setSnackbarMsg("New customer added");
                setShowSnackbar(true);
                getCustomers();
            } else {
                alert("Something went wrong when  trying to add a new customer.");
            }
        })
        .catch(err => console.error(err));
    }

    // Functions


    // Rendering

    return (
        <>
            <h1>&#127939; Customers! &#129336;</h1>

            <AddCustomer addCustomer={addCustomer} />

            <div className="ag-theme-material" style={{ height: '600px', width: '100%', padding: '0%', margin: 'auto' }} >
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>

            <Snackbar
                    open={showSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setShowSnackbar(false)}
                    message={snackbarMsg}
                />
        </>
    );
}