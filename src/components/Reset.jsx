// TODO: Button to reset the database
// Send a POST request to https://traineeapp.azurewebsites.net/reset

import { Button } from '@mui/material';

export default function Reset() {

    // States


    // Functions

    const reset = () => {
        fetch("http://traineeapp.azurewebsites.net/reset", { method: "POST" })
            .then(response => {
                if (response.ok) {
                    console.log("Database reseted");
                } else {
                    alert("Something went wrong when trying to reset the database");
                }
            })
            .catch(error => console.error(error));
    }

    // Return

    return (
        <>
            <Button onClick={reset}>Reset Database</Button>
        </>
    );

}