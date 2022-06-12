import axios from 'axios';
import { Picsum } from 'picsum-photos';
import { log } from '../utils';
import ImageModel, { Image } from '../models/image.model';

export async function createImage(page: number, limit: number) {
  try {
    // get the response
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`,
    );

    // to find the last grayimage_id
    const lastId: any = await ImageModel.find().limit(1).sort({ $natural: -1 });
    const lId: any = lastId[0] ? lastId[0].grayimage_id : 0;

    let ids: string[] = [];
    response.data?.forEach((element: any) => {
      ids.push(element?.id);
    });

    // find if Id already exists and assign -1 to it
    const exists = await ImageModel.find({ id: { $in: ids } });

    exists?.forEach((element: any) => {
      ids[ids.findIndex((val) => val === element?.id)] = '-1';
    });

    let idx = 1;
    let out: Image[] = [];
    response.data?.forEach((image: any, index: number) => {
      if (ids[index] !== '-1') {
        const newUrl = Picsum.url({
          blur: 2,
          cache: false,
          grayscale: true,
          height: 200,
          id: image?.id,
          jpg: true,
          width: 300,
        });

        out.push({
          ...response.data[index],
          grayimage_url: newUrl,
          grayimage_id: lId + idx,
        });
        idx++;
      }
    });

    // bulk write new objects
    const writes = await ImageModel.bulkWrite(
      out.map((doc) => {
        return {
          insertOne: { document: doc },
        };
      }),
      { ordered: true },
    );

    log.info(writes);

    return [...out, ...exists];
  } catch (e: any) {
    log.error(e);
    return e;
  }
}
