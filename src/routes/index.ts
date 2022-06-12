// * all the routes available

import express from 'express';
import image from './images.routes';

const router = express.Router();

// route for ping
router.get('/healthcheck', (_, res) => res.sendStatus(200));

// routes creating and updating user data
router.use(image);

export default router;
