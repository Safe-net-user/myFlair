'use client';

import Image from 'next/image';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from '@radix-ui/react-icons';

import { upload } from '@/data/cloudinary';

import { SubmitButton } from '@/components/button';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const ImageUploader = ({
  callback,
}: Readonly<{ callback: (arg0: string) => void }>) => {
  const onDrop = useCallback(async (files: File[]) => {
    if (files!.length > 0) {
      if (files![0].size > 2_097_152) {
        setError('Cette image est trop lourde. Vous êtes limité à 2MB !');
      } else {
        setError('');
        prepareUpload(files![0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(false);

  async function prepareUpload(file: File) {
    if (!file) return;

    setPending(true);

    const url = await upload(file);

    callback(url);
    setImage(url);

    setPending(false);
    setUploadedImage(true);
  }

  async function closeDialog() {
    setImage('');
    setPending(false);
    setUploadedImage(false);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="inline-flex w-[200px] items-center justify-center whitespace-nowrap rounded-md bg-primary text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <div className="flex h-9 items-center justify-center border-r px-3">
              <UploadIcon className="h-4 w-4" />
            </div>
            <p className="mx-auto flex items-center rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1">
              Ajouter une image
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une image</DialogTitle>
          </DialogHeader>

          <div
            {...getRootProps()}
            className="flex w-full items-center justify-center"
          >
            <label
              className="dark:hover:bg-bray-800 relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-6 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              htmlFor="dropzone"
            >
              {pending && (
                <div className="text-center">
                  <p className="text-sm font-semibold">
                    Ajout d&apos;une image
                  </p>
                  <p className="text-xs text-gray-400">
                    Ne raffraîchissez pas la page pendant l&apos;ajout.
                  </p>
                </div>
              )}

              {!pending && !uploadedImage && (
                <div className="text-center">
                  <UploadIcon className=" mx-auto h-4 w-4" />
                  <p className="text-sm font-semibold">Traînez une image</p>
                  <p className="text-xs text-gray-400">
                    Cliquez pour ajouter une image.
                  </p>
                </div>
              )}

              {uploadedImage && !pending && (
                <div className="text-center">
                  <AspectRatio ratio={16 / 9}>
                    <Image src={image} alt={image} fill />
                  </AspectRatio>
                  <p className="text-sm font-semibold">Image ajoutée</p>
                  <p className="text-xs text-gray-400">
                    Cliquez pour ajouter une image.
                  </p>
                </div>
              )}

              {error && (
                <p className="text-sm font-semibold text-red-500">{error}</p>
              )}
            </label>

            <Input
              {...getInputProps()}
              className="hidden"
              accept="image/png, image/jpeg"
              type="file"
              disabled={pending || !uploadedImage}
            />
          </div>

          <DialogFooter>
            <DialogClose onClick={closeDialog}>
              <Button className="w-[200px]" variant="outline">
                Annuler
              </Button>
            </DialogClose>

            <DialogClose>
              <SubmitButton
                className="w-[200px]"
                disabled={!!error || pending || !uploadedImage}
                pending={pending}
              >
                Sauvegarder
              </SubmitButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {image && <Image src={image} alt="Image" width={200} height={0} />}
    </>
  );
};
