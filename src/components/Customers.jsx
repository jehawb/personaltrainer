import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

export default function Customers() {

    // States

    const [customers, setCustomers] = useState([]);

    // Ag-Grid columns

    const columnDefs = [
        { headerName: "First Name", field: "firstname", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Last Name", field: "lastname", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Address", field: "streetaddress", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Postcode", field: "postcode", sortable: true, filter: true, floatingFilter: true },
        { headerName: "City", field: "city", sortable: true, filter: true, floatingFilter: true },
        { headerName: "e-mail", field: "email", sortable: true, filter: true, floatingFilter: true },   // I sure hope this application is not for public use
        { headerName: "Phone number", field: "phone" },
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