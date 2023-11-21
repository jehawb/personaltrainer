import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";
import moment from 'moment/moment';
import { useEffect, useState } from "react";

export default function Trainings() {

    // States

    const [trainings, setTrainings] = useState([]);

    // Ag-Grid columns

    const columnProperties = {
        sortable: true,
        filter: true,
        floatingFilter: true
    }

    const columnDefs = [
        { headerName: "Activity", field: "activity", ...columnProperties },
        {
            headerName: "Date",
            field: "date",
            valueFormatter: params => {
                return params.value ? moment(params.value).format('DD / MM / YYYY') : '';
            },
            ...columnProperties
        },
        { headerName: "Duration", field: "duration", ...columnProperties },
    ]

    // REST API functions

    const REST_URL = "http://traineeapp.azurewebsites.net/api/trainings";

    useEffect(() => getTrainings(), []);    // Call getTrainings when rendering the component first time

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData:" + responseData.content);
                setTrainings(responseData.content);
            })
            .catch(error => console.error(error));
    }

    // Functions


    // Rendering

    return (
        <>
            <h1>&#128170; Train, train, train! &#128642;</h1>

            <div className="ag-theme-material" style={{ height: '700px', width: '100%', padding: '0%', margin: 'auto' }} >
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </>
    );
}