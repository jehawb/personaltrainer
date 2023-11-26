import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import { useEffect, useState } from "react";

// Documentation for this .csv exporter
// https://www.npmjs.com/package/react-csv 

export default function CSVExport() {

    // States

    const [customers, setCustomers] = useState([]);

    // REST API functions

    useEffect(() => getCustomers(), []);
    
    // TODO: Use single fetch and send customer list from parent to here as a prop instead of calling API again
    // Parent currently uses /api/customers which does not return a nice single array liks /getcustomers does

    const getCustomers = () => {
        fetch("https://traineeapp.azurewebsites.net/getcustomers")
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData);
            })
            .catch(error => console.error(error));
    }

    // Functions

    console.log(customers);

    const headers = [
        // { label: "Id", key: "id" },  // Omitting headers filters out the attributes from the data
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "email" },
        { label: "Phone number", key: "phone" },
        { label: "Street address", key: "streetaddress" },
        { label: "City", key: "city" },
        { label: "Post code", key: "postcode" },
      ];

    // Rendering

    return (
        <>
            <CSVLink data={customers} headers={headers}>
                <Button>Export to CSV</Button>
            </CSVLink>
        </>
    );
}