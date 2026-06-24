import express from 'express'
import LocationsController from '../controllers/locations.js'

const router = express.Router()

router.get('/', LocationsController.getAllLocations)

export default router