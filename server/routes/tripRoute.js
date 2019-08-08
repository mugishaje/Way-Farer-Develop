import express from 'express';
import tripController from '../controllers/tripController';

const router = express.Router();

router.get('/trips', tripController.viewTrips);

export default router;