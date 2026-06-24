import { pool } from '../config/database.js'

const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events')
    res.status(200).json(result.rows)
  } catch (err) {
    console.error('⚠️ error fetching events', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getEventsByLocation = async (req, res) => {
  const { locationId } = req.params
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE location_id = $1',
      [locationId]
    )
    res.status(200).json(result.rows)
  } catch (err) {
    console.error('⚠️ error fetching events by location', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default { getAllEvents, getEventsByLocation }