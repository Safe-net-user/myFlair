"use client";

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReactQuill from 'react-quill';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import DisplayServices from './displayData/page';
import Link from 'next/link';

interface Service {
  image: string;
  alt?: string;
  title: string;
  description: string;
  price: number;
  type: string;
  sales: number;
  quantity: number;
  [key: string]: string | boolean | number | undefined;
}

const AddService = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState<Service>({
    image: '',
    alt: '',
    title: '',
    description: '',
    price: 0,
    type:'',
    sales:0,
    quantity: 0,
  });
  const [images, setImages] = useState<File[]>([]);

  const handleServiceChange = (key: keyof Service, value: any) => {
    setService((prevService) => ({
      ...prevService,
      [key]: value,
    }));
  };

  const handleDelete = () => {
    setImages([]);
    handleServiceChange('image', '');
  };

  const uploadImage = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary environment variables are not properly configured.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      try {
        const imageUrl = await uploadImage(files[0]);
        setImages([files[0]]);
        handleServiceChange('image', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleTypeChange = (value: string) => {
    handleServiceChange('type', value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/serviceAdditionnel/create', service, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        toast.success('Service ajouté avec succès');
        setTimeout(() => {
          router.push('/dashboard/professional');
        }, 2000);
      } else {
        toast.error('Erreur lors de l\'ajout du service');
        console.log('Error adding service:', response.data);
      }
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du service');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 1) {
      console.log("Vous ne pouvez sélectionner qu'une seule image.");
      return;
    }
    try {
      const imageUrl = await uploadImage(files[0]);
      setImages(files);
      handleServiceChange('image', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <TabsContent value="services" className="space-y-4">
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Services</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Ajouter</Button>
              </DialogTrigger>
              <DialogContent className="max-h-screen overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Ajouter un service</DialogTitle>
                  <DialogDescription>
                    <div>
                      <div>
                        <label>Titre du service</label>
                        <br />
                        <br />
                        <Input
                          className="rounded outline-none"
                          type="text"
                          value={service.title}
                          onChange={(e) => handleServiceChange('title', e.target.value)}
                          placeholder="Ex: Location de sèche-cheveux"
                          required
                        />
                      </div>
                      <br />
                      <label>Prix</label>
                      <br />
                      <br />
                      <Input
                        className='rounded outline-none'
                        type='number'
                        value={service.price}
                        onChange={(e) => handleServiceChange('price', e.target.value)}
                        placeholder='Ex: 25'
                        required
                      />
                      <br />
                      <label>Type de location</label>
                      <br />
                      <br />
                      <Select onValueChange={handleTypeChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup >
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="day">par Jour</SelectItem>
                            <SelectItem value="piece">par Pièce</SelectItem>
                            <SelectItem value="page">par Page</SelectItem>   
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <br />
                      <label>Stocks</label>
                      <br />
                      <br />
                      <Input
                        type="number"
                        onChange={(e) => handleServiceChange('quantity', e.target.value)}
                        required
                        placeholder='Ex: 10'
                      />
                      <br />
                      <div>
                        <label>Description</label>
                        <br />
                        <br />
                        <ReactQuill
                          value={service.description}
                          onChange={(value) => handleServiceChange('description', value)}
                          placeholder="Rédiger votre description..."
                        />
                      </div>
                      <br />
                      <div>
                        <label>Image</label>
                        <br />
                        <br />
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDrop={handleDrop}
                          onDragOver={e => e.preventDefault()}
                          style={{
                            cursor: 'pointer',
                            width: '100%',
                            height: '100px',
                            border: '2px dashed #aaa',
                            borderRadius: '5px',
                            textAlign: 'center',
                            padding: '20px',
                            marginBottom: '20px'
                          }}
                        >
                          <p className="flex items-center justify-center">Cliquez ou glissez et déposez des fichiers ici</p>
                          <p className="text-sm">Formats pris en charge: JPEG, PNG, JPG et SVG</p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg, image/png, image/jpg, image/svg"
                          style={{ display: 'none' }}
                          onChange={handleFileInputChange}
                        />
                        {images.length > 0 && (
                          <div>
                            {images.map((file, index) => (
                              <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  style={{ width: '100px', height: 'auto', marginBottom: '5px' }}
                                  className="rounded-lg"
                                />

                                <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                                  <button className="rounded-full" style={{ padding: '5px', background: 'red' }} onClick={handleDelete}>
                                    <img src="/iconService/trashWhite.svg" alt="Delete" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button type="button" onClick={handleSubmit}>Ajouter</Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            
          </div>
          <DisplayServices/>
        </div>
      </TabsContent>
      
    </div>
  );
};

export default AddService;