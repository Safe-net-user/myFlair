'use client';
import { TabsContent } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  dureeRDV: string;
  domicile: boolean;
  image: string;
}

export default function ServicesTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [sortOption, setSortOption] = useState<string>('');

  useEffect(() => {
    fetch('/api/service', {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Service[]) => {
        console.log('Services fetched:', data);
        setServices(data);
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    
    let sortedServices = [...services];
  
    switch (selectedOption) {
      case 'recent':
        // Ajustez le tri selon vos besoins
        break;
      case 'a-z':
        sortedServices.sort((a, b) => {
          // Compare les titres des services
          return a.title.localeCompare(b.title);
        });
        break;
      case 'categorie':
        sortedServices.sort((a, b) => {
          // Compare les catégories des services
          return a.category.localeCompare(b.category);
        });
        break;
      case 'prix':
        sortedServices.sort((a, b) => {
          // Compare les prix des services, en supposant que les prix sont des nombres
          return parseFloat(a.price) - parseFloat(b.price);
        });
        break;
      default:
        break;
    }
  
    setServices(sortedServices);
  };
  
  return (
    <TabsContent value="services" className="space-y-4">
      <div className="hidden h-full flex-1 space-y-8 p-8 md:flex items-start justify-between">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
        </div>
      </div>
      <div className="flex items-end justify-start space-y-4">
        <div className="flex flex-col justify-start items-start">
          <p style={{ marginRight: '4%' }}>Trier par :</p>
          <br />
          <div style={{ width: '150px' }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Trier</InputLabel>
              <Select value={sortOption} label="Trier" onChange={handleSortChange}>
                <MenuItem value={'recent'}>Récent</MenuItem>
                <MenuItem value={'a-z'}>Titre A-Z</MenuItem>
                <MenuItem value={'categorie'}>Categorie</MenuItem>
                <MenuItem value={'prix'}>Prix</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Link className="cursor-pointer" style={{ marginLeft: '20px' }} href={'/dashboard/professional/service/addService'}>
          <button className="bg-black text-white flex items-center rounded text-lg cursor-pointer" style={{ padding: '6px' }}>
            <img className='flex items-center' style={{ marginRight: '10px', marginTop: '-5px', marginBottom: '-5px' }} src="/iconService/plus-2.svg" />Ajouter un service
          </button>
        </Link>
      </div>
      <div>
        {services.length > 0 ? (
          <ul>
           {services.map(service => (
  <div key={service.id} style={{border:'solid 2px #ECECEC', padding:'25px', marginTop:'5%'}} className="flex justify-between items-start rounded">
    <div className="flex flex-col justify-start items-start" style={{width:'70%'}}>
      <div className='flex'>
      <button style={{background:'#ECECEC'}} className="text-lg rounded py-2 px-4">{service.category}</button>
      {service.domicile === true &&(
        <button style={{color:'#2DB742', background:'#ABEAB5'}}>Service à domicile</button>
      )}
      </div>
      <br/>
      <h1>{service.title}</h1>
      <br/>
      <p>{service.description}</p>
    </div>
    <div className="flex flex-col items-end justify-between p-4">
     
      <h1 style={{fontSize:'250%'}} className="font-bold">{service.price} €</h1>
      <span style={{ color:'#EAEAEA'}}>Durée {service.dureeRDV}</span>
      <Link href={'/dashboard_pro/services/modifierService'}>
        <button style={{width:'150px'}} className="cursor-pointer bg-black text-lg text-white rounded py-3 px-6 mt-4">Modifier</button>
      </Link>
      <br />
      <Link href={'/dashboard_pro/services/modifierService'}>
        <button style={{background:'#EAEAEA', width:'150px'}} className="cursor-pointer text-lg  text-black rounded py-3 px-6 mt-4">Supprimer</button>
      </Link>
    </div>
  </div>
))}
          </ul>
        ) : (
          <p>Aucun service disponible.</p>
        )}
      </div>
    </TabsContent>
  );
}
