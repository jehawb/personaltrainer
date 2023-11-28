import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'

// https://www.npmjs.com/package/react-big-calendar


export default function Calendar(props) {
    
    const localizer = dayjsLocalizer(dayjs);
    
    // States


    // REST API functions


    // Functions


    // Rendering

    return (
        <>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </>
    );
}