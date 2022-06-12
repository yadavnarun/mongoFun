// * routes creating and updating images

import express from 'express';
import { createImageHandler } from '../controllers/image.controller';
import validateResource from '../middlewares/validateResource';
import { imagesSchema } from '../schemas/image.schema';

const router = express.Router();

// creating grayscale images
router.get('/api/images', validateResource(imagesSchema), createImageHandler);

export default router;
