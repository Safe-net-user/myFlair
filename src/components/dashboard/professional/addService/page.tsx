'use client'
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Switch } from '@mui/material';
import { Cloudinary } from '@cloudinary/url-gen'
const { convert } = require('html-to-text');
interface Service {
  title: string;
  category: string;
  price: string;
  description: string;
  dureeRDV: string;
  domicile: boolean;
  image: string;
  [key: string]: string | boolean;
}

const AjouterUnService = () => {
  const [services, setServices] = useState<Service[]>([
    {
      title: "",
      category: "",
      price: "",
      description: "",
      dureeRDV: "",
      domicile: false,
      image: ""
    }
  ]);

  const addService = () => {
    setServices([...services, { title: "", category: "", price: "", description: "", dureeRDV: "", domicile: false, image: "" }]);
  };

  const handleServiceChange = (index: number, key: string, value: any) => {
    const newServices = [...services];
    newServices[index][key] = value;
    setServices(newServices);
  };

  const handleChange = (event: SelectChangeEvent<string>, index: number) => {
    handleServiceChange(index, 'dureeRDV', event.target.value);
  };

  const [images, setImages] = useState<File[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = () => {
    setImages([]);
    setSelectedImageIndex(null);
    handleServiceChange(0, 'image', '');
  };

  const uploadImage = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Les variables d\'environnement Cloudinary ne sont pas correctement configurées.');
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
      console.error('Erreur lors du téléchargement de l\'image:', error);
      throw error; 
    }
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImages([files[0]]);
      try {
        const imageUrl = await uploadImage(files[0]);
        const newServices = [...services];
        newServices[0].image = imageUrl;
        setServices(newServices);
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('Données envoyées:', services[0]);

      const servicesWithConvertedDescription = services.map((service) => ({
        ...service,
        description: convert(service.description),
      }));

      const serviceData = {
        ...servicesWithConvertedDescription[0],
      };

      const response = await fetch('/api/service/addService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        console.log('Service créé avec succès');
      } else {
        const errorData = await response.json();
        console.log('Erreur lors de la création du service:', errorData);
      }
    } catch (error) {
      console.error('Erreur:', error);
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
      handleServiceChange(0, 'image', imageUrl);
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error);
    }
  };

  const cld = new Cloudinary({ cloud: { cloudName: process.env.CLOUDINARY_CLOUDNAME } });
  var myImageUrl = cld.image().toURL();


  // verif si les valeurs sont bien remplie ou null
  const verifValues =() => {
    
  }
  return (
    <div style={{ paddingRight: "5%", paddingLeft: '5%', width: '100%' }}>
      <br />
      <div>
        <span style={{ fontSize: '140%' }}>Ajouter un service</span>
      </div>
      <br />
      <div style={{ width: "100%", height: "1px", background: "#EAEAEA" }}></div>
      <br />
      {services.map((service, index) => (
        <div key={index}>
          <div>
            <label>Titre du service</label>
            <input
              className="text-lg rounded outline-none"
              style={{
                width: "100%",
                padding: "5px",
                border: "solid 2px #EAEAEA",
                marginTop: "2%"
              }}
              type="text"
              value={service.title}
              onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
              placeholder="Exemple: Coloration cheveux"
              required
            />
          </div>
          <br />
          <div className="flex">
            <div className="flex flex-col">
             <div>
                Catégorie
                <br />
                <br />
                
                <input
                  className="text-lg rounded outline-none"
                  style={{
                    width: "100%",
                    padding: "5px",
                    border: "solid 2px #EAEAEA",
                    marginTop: "2%"
                    
                    
                  }}
                  type="text"
                  value={service.category}
                  onChange={(e) => handleServiceChange(index, 'category', e.target.value)}
                  required
                  placeholder='Exemple: Coloration + Shampoing + Brushing'
                 
                />
               </div>
               
              
              <br />
              <div>
                Tarifs
                <br />
                <br />
                <div className='flex items-end'>
                  <input
                    className="text-lg rounded outline-none"
                    style={{
                    width: "105%",
                    padding: "5px",
                    border: "solid 2px #EAEAEA",
                    marginTop: "2%"
                    }}
                    type="text"
                    value={service.price}
                    onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                    required
                    placeholder=""
                  />
                  <span style={{fontSize:'180%', marginLeft:'2%'}}>€</span>
                </div>
              </div>
              </div>
            <br />
            <div className="flex flex-col" style={{ marginLeft: '20%' }}>
              <div className="flex flex-col">
                <label>Service à domicile ?</label>
                <span style={{ fontSize: '70%' }}>
                  Ce service bénéficiera des services à domicile que vous fournissez
                </span>
                <div style={{ marginTop: "5px" }}>
                  <Switch checked={service.domicile} onChange={(e) => handleServiceChange(index, 'domicile', e.target.checked)} />
                </div>
              </div>
              <br />
              <div className="flex flex-col" style={{ width: '200px' }}>
                <div>Durée</div>
                <br />
              
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Durée</InputLabel>
                  <Select
                    value={service.dureeRDV}
                    label="Durée"
                    onChange={(e) => handleChange(e, index)}
                  >
                    <MenuItem value="15">15 minutes</MenuItem>
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="45">45 minutes</MenuItem>
                    <MenuItem value="60">1 heure</MenuItem>
                    <MenuItem value="75">1h 15 minutes</MenuItem>
                    <MenuItem value="90">1 heure 30 minutes</MenuItem>
                    <MenuItem value="105">1 heure 45 minutes</MenuItem>
                    <MenuItem value="120">2 heures</MenuItem>
                    <MenuItem value="135">2 heures 15 minutes</MenuItem>
                    <MenuItem value="150">2 heures 30 minutes</MenuItem>
                    <MenuItem value="165">2 heures 45 minutes</MenuItem>
                    <MenuItem value="180">3 heures</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <br />
          <div style={{ width: "100%", height: "1px", background: "#EAEAEA" }}></div>
          <br />
          <div>
            <div>Description</div>
            <br />
            <ReactQuill
              value={service.description}
              onChange={(value) => handleServiceChange(index, 'description', value)}
              placeholder="Décrivez votre service ici..."
            />
          </div>
          <br />
          
        </div>
      ))}
      <u><p className="text-base" style={{ fontWeight: '700', cursor: 'pointer' }} onClick={addService}>+ Ajouter un autre service</p></u>
      <br />
      <div className="flex justify-end">
        <Link href={'/dashboard/professional'}>
      <button className=" text-white text-lg rounded" style={{ padding: '9px', paddingLeft: '30px', paddingRight: '30px', color:'#D6D6D6' }}>

          Annuler
        </button>
        </Link>
        <button type="submit" className="bg-black text-white text-lg rounded" style={{ padding: '9px', paddingLeft: '30px', paddingRight: '30px' }} onClick={handleSubmit}>
          Publier
        </button>
      </div>
      <br />
    </div>
  );
};

export default AjouterUnService;