import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'

// https://www.npmjs.com/package/react-big-calendar

const localizer = dayjsLocalizer(dayjs)

export default function Calendar(props) {

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