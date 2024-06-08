import type { UploadApiResponse } from 'cloudinary';

import cloudinary from '@/lib/cloudinary';

export const upload = (file: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onerror = (error) => console.log(error);

  return new Promise((resolve) => {
    reader.onload = async () => {
      if (!reader.result) return;

      cloudinary.v2.uploader
        .upload(reader.result as string, {
          upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
        })
        .then((response: UploadApiResponse) => resolve(response.url));
    };
  });
};
