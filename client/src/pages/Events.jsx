import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const data = await EventsAPI.getAllEvents()
                setEvents(data)
            } catch (err) {
                console.error('error fetching events', err)
            }
        })()
    }, [])

    return (
        <div>
            <h2>All Events</h2>
            {events.map((event) => (
                <Event
                    key={event.id}
                    name={event.name}
                    date={event.date}
                    description={event.description}
                />
            ))}
        </div>
    )
}

export default Events