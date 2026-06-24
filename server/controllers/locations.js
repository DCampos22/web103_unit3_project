import { pool } from '../config/database.js'

const getAllLocations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations')
    res.status(200).json(result.rows)
  } catch (err) {
    console.error('⚠️ error fetching locations', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default { getAllLocations }