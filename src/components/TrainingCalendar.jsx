import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'
import { useEffect, useState } from "react";

// https://www.npmjs.com/package/react-big-calendar


export default function TrainingCalendar() {

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

    const dataForCalendar = (trainingsData) => {
        return trainingsData.map((training) => {

            const startDate = dayjs(training.date);
            const endDate = startDate.add(training.duration, 'minute');

            // This second return returns every converted row of data from mapping
            return {
                id: training.id,
                title: training.activity,
                start: startDate.toDate(),
                end: endDate.toDate()
            }
        })
    }

    // Rendering

    const localizer = dayjsLocalizer(dayjs);
    const events = dataForCalendar(trainings);

    return (
        <>
            <h1> &#128197; Training Calendar</h1>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="agenda"
                style={{ height: 800 }}
            />
        </>
    );
}