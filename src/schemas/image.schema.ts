import { number, object, TypeOf } from 'zod';

export const imagesSchema = object({
  body: object({
    page: number({
      required_error: 'Page is required',
      description: 'Page number',
    }).min(0, 'Page must be >= 0'),
    limit: number({
      required_error: 'Page is required',
      description: 'Page number',
    }).min(1, 'Page must be >= 1'),
  }),
});

export type imagesInput = TypeOf<typeof imagesSchema>['body'];
