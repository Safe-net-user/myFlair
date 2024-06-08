import * as dotenv from 'dotenv';

import cloudinary from 'cloudinary';

dotenv.config({
  path: '@/../.env',
});

cloudinary.v2.config({
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export default cloudinary;
