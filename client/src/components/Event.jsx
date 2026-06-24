import React from 'react'
import '../css/Event.css'

const Event = ({ name, date, description }) => {
    const eventDate = new Date(date)
    const isPast = eventDate < new Date()
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <article className={`event-information ${isPast ? 'negative-time-remaining' : ''}`}>
            <span className='event-name-preview'>{name}</span>
            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{name}</h3>
                    <p>📅 {formattedDate}</p>
                    <p>{description}</p>
                    {isPast && <p>⚠️ This event has passed</p>}
                </div>
            </div>
        </article>
    )
}

export default Event