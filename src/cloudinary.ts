import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../config/constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'spaceragga',
      api_key: '672611623279293',
      api_secret: '-P9MB7y4LOyPeqQjqGD8OqqslQ8',
    });
  },
};
