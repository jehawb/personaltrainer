import { Button, Snackbar } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';

export default function Trainings() {

    // States

    const [trainings, setTrainings] = useState([]);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);

    // Ag-Grid columns

    const columnProperties = {
        sortable: true,
        filter: true,
        // floatingFilter: true,
        width: 150,
    }

    const columnDefs = [
        {
            headerName: "Activity",
            field: "activity",
            ...columnProperties
        },
        {
            headerName: "Date",
            field: "date",
            valueFormatter: params => {
                return params.value ? dayjs(params.value).format('DD / MM / YYYY') : '';
            },
            ...columnProperties
        },
        {
            headerName: "Duration",
            field: "duration",
            ...columnProperties,
            width: 120
        },
        {
            headerName: "Customer",
            field: "customer",
            valueGetter: (params) => {
                if (params.data.customer == null) {
                    return "";
                } else {
                    return params.data.customer.lastname + ', ' + params.data.customer.firstname;
                }
            },
            ...columnProperties, 
            width: 200
        },
        // {
        //     cellRenderer: params => <EditTraining editTraining={editTraining} training={params.data} />,
        //     width: 100
        // },   // NOT IMPLEMENTED
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    color="error"
                    onClick={() =>
                        window.confirm("Are you sure you want to delete a training from the database?") ? deleteTraining(params) : null}>
                    Delete
                </Button>,
            width: 100
        },
    ]

    // REST API functions

    const REST_URL = "https://traineeapp.azurewebsites.net/gettrainings";

    useEffect(() => getTrainings(), []);    // Call getTrainings when rendering the component first time

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                // console.log("responseData:" + responseData);
                setTrainings(responseData);
            })
            .catch(error => console.error(error));
    }

    const addTraining = (training) => {
        console.log(training);
        fetch("https://traineeapp.azurewebsites.net/api/trainings", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    setSnackbarMsg("New training added");
                    setShowSnackbar(true);
                    getTrainings();
                } else {
                    alert("Something went wrong when trying to add a new training.");
                }
            })
            .catch(err => console.error(err));
    }

    // const editTraining = (training, link) => {
    //     // NOT IMPLEMENTED
    //     console.log(training);
    //     console.log(link);
    // }

    const deleteTraining = (params) => {
        console.log("https://traineeapp.azurewebsites.net/api/trainings/" + params.data.id);
        fetch("https://traineeapp.azurewebsites.net/api/trainings/" + params.data.id, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    setSnackbarMsg("Training deleted");
                    setShowSnackbar(true);
                    getTrainings();
                } else {
                    alert("Something went wrong when trying to delete a training");
                }
            })
            .catch(error => console.error(error));
    }

    // Functions


    // Rendering

    return (
        <>
            <h1>&#128170; Train, train, train! &#128642;</h1>

            <AddTraining addTraining={addTraining} />

            <div className="ag-theme-material" style={{ height: '600px', width: '100%', padding: '0%', margin: 'auto' }} >
                <AgGridReact
                    rowData={trainings}
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