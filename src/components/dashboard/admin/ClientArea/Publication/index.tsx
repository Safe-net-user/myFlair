'use client'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { ConfigProvider, Slider } from 'antd';
import { useEffect, useState } from 'react';

export default function Publication(){
    const mark = {
        0: '0',
        50: '50',
        100: '100',
        150: '150',
        200: '200+'
    };
    //publication = Service des Pro
    interface Publication {
        id: string;
        title: string;
        image: string;
        imagePro: string;
        rate: number;
        description: string;
        category: string;
        price: string;
        dureeRDV:string;
        userId: string;
        domicile:boolean;
    }
    const [publication, setPublication] = useState<Publication[]>([]);
    const [category, setCategory] = useState<Publication[]>([]);
    useEffect(() => {

    })

    const [sliderValue, setSliderValue] = useState([50, 150]);
    const handleSliderChange = (value: number[]) => {
        setSliderValue(value);
    };

    const handleTypeChange = (value: string) => {
        setCategory;
      };
    return(
        <TabsContent value='publication'>
             <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Gestion des Publications</h2>
                </div>
                <div className='grid grid-cols-6 gap-4 '>
                    <div className='col-span-2 min-w-64'>
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
                            <Select onValueChange={handleTypeChange}>
                                <SelectTrigger className='w-full bg-white mt-2'>
                                    <SelectValue placeholder="Sélectionner un type" />
                                </SelectTrigger>
                                <SelectContent className='w-full bg-white'>
                                    <SelectGroup>
                                        <SelectLabel>Catégories</SelectLabel>
                                        <SelectItem value="day">Coiffures</SelectItem>
                                        <SelectItem value="day">Soins de la Peaux</SelectItem>
                                        <SelectItem value="day">Esthéticienne</SelectItem>
                                        <SelectItem value="day">Massages</SelectItem>
                                        <SelectItem value="day">Bien-être</SelectItem>
                                    
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
                                <Slider style={{width:'95%'}} className=" mt-4" marks={mark} step={5} max={200} range defaultValue={[50, 150]} onChange={handleSliderChange} />
                            </ConfigProvider>
                            <span className="block mt-2">Prix: {sliderValue[0]} € - {sliderValue[1]} €</span>
                        </div>
                        <button className="bg-black rounded text-white text-lg mt-4 w-full py-3">Rechercher</button>
                    </div>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 col-span-4'>
                        
                    </div>
                </div>
             </div>
        </TabsContent>
    )
}