'use client'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { ConfigProvider, Slider } from 'antd';
import { useState } from 'react';

export default function Publication(){
    const mark = {
        0: '0',
        250: '250',
        500: '500',
        750: '750',
        1000: '1000'
    };

    // Définir l'état local pour stocker les valeurs du Slider
    const [sliderValue, setSliderValue] = useState([250, 750]);

    // Fonction de rappel pour mettre à jour l'état des valeurs du Slider
    const handleSliderChange = (value: number[]) => {
        setSliderValue(value);
    };
    return(
        <TabsContent value='publication'>
             <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Gestion des Publications</h2>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <div className="bg-gray-100 rounded p-4">
                            <h1>Rechercher</h1>
                            <Input className="w-full bg-white text-gray-700 mt-2" placeholder='Que recherchez-vous ?' type="text" />
                        </div>
                        <div className="bg-gray-100 rounded p-4 mt-4">
                            <h1>Lieux</h1>
                            <Input className="w-full bg-white text-gray-700 mt-2" placeholder='Indiquer un lieux' type="text" />
                        </div>
                        <div className="bg-gray-100 rounded p-4 mt-4">
                            <h1>Catégories de Services</h1>
                            <Select>
                                <SelectTrigger className='w-full bg-white mt-2'>
                                    <SelectValue placeholder="Sélectionner un type" />
                                </SelectTrigger>
                                <SelectContent className='w-full bg-white'>
                                    <SelectGroup>
                                        <SelectLabel>Catégories</SelectLabel>
                                        <SelectItem value="day">Coiffures</SelectItem>
                                        <SelectItem value="piece">Etc</SelectItem>
                                        <SelectItem value="page">A remplacer par un .map et afficher les differents services possible dans la bdd</SelectItem>   
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="bg-gray-100 rounded p-4 mt-4">
                            <h1>Prix</h1>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimaryBorderHover: '#000'
                                    },
                                    components:  {
                                        Slider: { dotActiveBorderColor: '#000', handleActiveColor: '#000', handleColor:'#000', trackBg:'#000', trackHoverBg:'#000', handleColorDisabled:'#000' },
                                    },
                                }}
                            >
                                <Slider style={{width:'95%'}} className=" mt-4" marks={mark} step={5} max={1000} range defaultValue={[250, 750]} onChange={handleSliderChange} />
                            </ConfigProvider>
                            <span className="block mt-2">Prix: {sliderValue[0]} € - {sliderValue[1]} €</span>
                        </div>
                        <button className="bg-black rounded text-white text-lg mt-4 w-full py-3">Rechercher</button>
                    </div>
                </div>
             </div>
        </TabsContent>
    )
}
