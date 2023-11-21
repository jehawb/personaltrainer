import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

export default function Customers() {

    // States

    const [customers, setCustomers] = useState([]);

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
        { headerName: "e-mail", field: "email", ...columnProperties },   // I sure hope this application is not for public use
        { headerName: "Phone number", field: "phone", ...columnProperties },
    ]

    // REST API functions

    const REST_URL = "http://traineeapp.azurewebsites.net/api/customers";

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

    // Functions


    // Rendering

    return (
        <>
            <h1>&#127939; Customers! &#129336;</h1>

            <div className="ag-theme-material" style={{ height: '700px', width: '100%', padding: '0%', margin: 'auto' }} >
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </>
    );
}