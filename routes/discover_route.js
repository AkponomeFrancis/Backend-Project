// routes/discoverRoutes.js
import express from 'express'
const router = express.Router();
import { discoverMovies } from '../controllers/discoverController.js'

router.get('/', discoverMovies); 

export default router;
