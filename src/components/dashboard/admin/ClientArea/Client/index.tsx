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

interface NewClient {
    name: string;
    firstName: string;
    nameOfSociety: string;
    image: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    phone: string;
    email: string;
    status: string;
    billingAddress: {
      company: string;
      firstName: string;
      lastName: string;
      address: string;
    };
  }

const AddClient = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newClient, setNewClient] = useState<NewClient>({
    name: '',
    firstName: '',
    nameOfSociety: '',
    image: '',
    address: {
        street:'',
        city:'',
        postalCode:'',
        country:'',
    },
    phone: '',
    email: '',
    status: '',

    billingAddress: {
      company: '',
      firstName: '',
      lastName: '',
      address: '',
    },
  });
  const [images, setImages] = useState<File[]>([]);

  const handleClientChange = (key: keyof NewClient, value: any) => {
    if (key === 'billingAddress') {
      setNewClient((prevNewClient) => ({
        ...prevNewClient,
        billingAddress: {
          ...prevNewClient.billingAddress,
          [value.field]: value.value,
        },
      }));
    } else {
      setNewClient((prevNewClient) => ({
        ...prevNewClient,
        [key]: value,
      }));
    }
  };

  const handleDelete = () => {
    setImages([]);
    handleClientChange('image', '');
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
        handleClientChange('image', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };


  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Example POST request, adjust endpoint and payload structure as needed
      const response = await axios.post('/api/clients/add', newClient, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        toast.success('Nouveau client ajouté avec succès');
        setTimeout(() => {
          router.push('/dashboard/clients');
        }, 2000);
      } else {
        toast.error('Erreur lors de l\'ajout du client');
        console.log('Error adding client:', response.data);
      }
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du client');
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
      handleClientChange('image', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <TabsContent value="clientList" className="space-y-3">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Ajouter un Client</Button>
              </DialogTrigger>
              <DialogContent className="max-h-screen overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Ajouter un client</DialogTitle>
                  <br />
                  <DialogDescription>
                    <div>
                      <label>Nom du client</label>
                      <br />
                      <br />
                      <Input
                        className="rounded outline-none"
                        type="text"
                        value={newClient.name}
                        onChange={(e) => handleClientChange('name', e.target.value)}
                        placeholder="Nom du client"
                        required
                      />
                      <br />
                      <label>Prénom du client</label>
                      <br />
                      <br />
                      <Input
                        className="rounded outline-none"
                        type="text"
                        value={newClient.firstName}
                        onChange={(e) => handleClientChange('name', e.target.value)}
                        placeholder="Prénom du client"
                        required
                      />
                      <br />
                      <label htmlFor="">Nom de la société</label>
                      <br /><br />
                      <Input
                        className="rounded outline-none"
                        type="text"
                        value={newClient.nameOfSociety}
                        onChange={(e) => handleClientChange('name', e.target.value)}
                        placeholder="Nom de la société"
                        required
                      />
                      <br />
                      
                      <label>Adresse</label>
                      <br /><br />
                      <Input
                        type="text"
                        onChange={(e) => handleClientChange('address', { field: 'street', value: e.target.value })}
                        value={newClient.address.street}
                        placeholder="Rue"
                        required
                      />
                      <br />
                      <Input
                        type="text"
                        onChange={(e) => handleClientChange('address', { field: 'city', value: e.target.value })}
                        value={newClient.address.city}
                        placeholder="Ville"
                        required
                      />
                      <br />
                      <Input
                        type="text"
                        onChange={(e) => handleClientChange('address', { field: 'postalCode', value: e.target.value })}
                        value={newClient.address.postalCode}
                        placeholder="Code postal"
                        required
                      />
                      <br />
                      <Input
                        type="text"
                        onChange={(e) => handleClientChange('address', { field: 'country', value: e.target.value })}
                        value={newClient.address.country}
                        placeholder="Pays"
                        required
                      />
                      <br />
                      <br />
                      <label>Téléphone</label>
                      <br />
                      <br />
                      <Input
                        type="tel"
                        onChange={(e) => handleClientChange('phone', e.target.value)}
                        value={newClient.phone}
                        placeholder="Numéro de téléphone"
                        required
                      />
                      <br />
                      <label>Email</label>
                      <br />
                      <br />
                      <Input
                        type="email"
                        onChange={(e) => handleClientChange('email', e.target.value)}
                        value={newClient.email}
                        placeholder="Adresse email"
                        required
                      />
                      <br />
                      <label>Statut</label>
                      <br />
                      <br />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup >
                            <SelectLabel>Statut</SelectLabel>
                            <SelectItem value="personal">Personel</SelectItem>
                            <SelectItem value="professional">Professionel</SelectItem>
                            <SelectItem value="administrator">Administrateur</SelectItem>   
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <br />
                      <div>
                        <label>Adresse de facturation</label>
                        <br />
                        <br />
                        <Input
                          type="text"
                          onChange={(e) => handleClientChange('billingAddress', { field: 'company', value: e.target.value })}
                          value={newClient.billingAddress.company}
                          placeholder="Nom de la société"
                        />
                        <br />
                        <Input
                          type="text"
                          onChange={(e) => handleClientChange('billingAddress', { field: 'firstName', value: e.target.value })}
                          value={newClient.billingAddress.firstName}
                          placeholder="Prénom"
                        />
                        <br />
                        <Input
                          type="text"
                          onChange={(e) => handleClientChange('billingAddress', { field: 'lastName', value: e.target.value })}
                          value={newClient.billingAddress.lastName}
                          placeholder="Nom"
                        />
                        <br />
                        <Input
                          type="text"
                          onChange={(e) => handleClientChange('billingAddress', { field: 'address', value: e.target.value })}
                          value={newClient.billingAddress.address}
                          placeholder="Adresse"
                        />
                      </div>
                      <br />
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
                    <Button type="button" onClick={handleSubmit}>Ajouter</Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </TabsContent>
    </div>
  );
};

export default AddClient;
