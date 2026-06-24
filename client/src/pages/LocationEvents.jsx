import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = ({ index }) => {
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations()
                const currentLocation = locationsData[index - 1]
                setLocation(currentLocation)

                const eventsData = await EventsAPI.getEventsByLocation(currentLocation.id)
                setEvents(eventsData)
            } catch (err) {
                console.error('error fetching location events', err)
            }
        })()
    }, [index])

    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>{location?.name}</h2>
                    <p>{location?.neighborhood}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            date={event.date}
                            description={event.description}
                        />
                    ) : <h2>No events scheduled at this location yet!</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents