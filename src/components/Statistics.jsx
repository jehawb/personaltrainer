import React from "react";
import { BarChart, Bar, XAxis } from "recharts";
import { useEffect, useState } from "react";

// Documentation for recharts
// https://recharts.org/en-US

export default function Statistics() {

    // States

    const [trainings, setTrainings] = useState([]);

    // REST API functions

    const REST_URL = "http://traineeapp.azurewebsites.net/gettrainings";

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData);
            })
            .catch(error => console.error(error));
    }

    // Functions

    const trainingsData = [];   // TODO: Check if this should be state

    // Go though trainings and check if activity has already been added to trainingsData creating a new object in trainingsData or adding the activitys duration to the pool
    trainings.forEach(training => {
        // Checks trainingsData "groups" if one already has a "group" with the name of the activity and returns it's index
        const i = trainingsData.findIndex(group => group.name === training.activity);

        if (i !== -1) {
            // Activity found in trainingsData
            trainingsData[i].duration += training.duration;
        } else {
            // Activity not found in trainingsData
            trainingsData.push({ name: training.activity, duration: training.duration });
        }
    });

    // Rendering

    return (
        <>
            <h1>Total activity time in minutes &#128202;</h1>

            <BarChart width={1200} height={600} data={trainingsData}>
                <XAxis dataKey="name" fill="black" angle={45} height={100} dy={50} />
                <Bar dataKey="duration" fill="CornflowerBlue" label={{ enableBackground: true, fill: 'white', fontSize: 25, position: 'center' }} />
            </BarChart>
        </>
    );
}
