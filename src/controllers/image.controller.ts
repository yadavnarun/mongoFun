import { Request, Response } from 'express';
import { imagesInput } from '../schemas/image.schema';
import { createImage } from '../services/image.service';
import { log } from '../utils';

export async function createImageHandler(
  req: Request<{}, {}, imagesInput>,
  res: Response,
) {
  const { page, limit } = req.body;

  try {
    const response = await createImage(page, limit);
    return res.status(201).send(response);
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(e);
    // if (e.code === 11000) {
    //   return res.status(409).send('images already exists');
    // }
  }
}
