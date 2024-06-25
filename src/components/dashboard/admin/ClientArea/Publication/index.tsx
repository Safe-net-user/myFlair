'use client'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { ConfigProvider, Slider } from 'antd';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import '../Publication/global.css'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Publication() {
    const mark = {
        0: '0',
        50: '50',
        100: '100',
        150: '150',
        200: '200+'
    };

    interface Publication {
        id: string;
        name: string;
        imageProfil: string;
        ville: string;
        pays: string;
        prix: number;
        starRating: number;
        category: string;
        isAtHome: boolean;
    }

    const [publication, setPublication] = useState<Publication[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        // Fetch or set publications here
        setPublication(publicationData); // Replace with your actual data fetching logic
    }, []);

    const [sliderValue, setSliderValue] = useState([50, 150]);

    const handleSliderChange = (value: number[]) => {
        setSliderValue(value);
    };

    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value === "all" ? null : value);
    };

    const publicationData: Publication[] = [
        {
            id: '1',
            name: 'Milani Beauty',
            ville: 'Paris',
            pays: 'France',
            prix: 35,
            starRating: 4,
            imageProfil: 'https://media.istockphoto.com/id/1320651997/fr/photo/portrait-datelier-isolé-dune-jeune-femme-en-gros-plan.jpg?s=612x612&w=0&k=20&c=VlvYhvY75qMYbay0FI2sy4dQEbvb7w6zTlCDnEDAWbI=',
            category: 'Bien-être',
            isAtHome: false,
        },
        {
            id: '2',
            name: 'Milani Beauty',
            ville: 'Paris',
            pays: 'France',
            prix: 35,
            starRating: 4,
            imageProfil: '',
            category: '',
            isAtHome: true,
        },
        {
            id: '3',
            name: 'Milani Beauty',
            ville: 'Paris',
            pays: 'France',
            prix: 35,
            starRating: 4,
            imageProfil: '',
            category: 'Bien-être',
            isAtHome: false,
        },
        {
            id: '4',
            name: 'Milani Beauty',
            ville: 'Paris',
            pays: 'France',
            prix: 35,
            starRating: 4,
            imageProfil: '',
            category: 'Bien-être',
            isAtHome: false,
        },
        {
            id: '5',
            name: 'Milani Beauty',
            ville: 'Paris',
            pays: 'France',
            prix: 35,
            starRating: 4,
            imageProfil: '',
            category: 'Bien-être',
            isAtHome: false,
        },
        {
            id: '6',
            name: 'Milani Beauty',
            ville: 'Paris',
            pays: 'France',
            prix: 35,
            starRating: 4,
            imageProfil: '',
            category: 'Bien-être',
            isAtHome: false,
        }

    ];

    function ModelPublication({ publication }: { publication: Publication }) {
        return (
            <Card style={{ margin: 0 }} className=' min-w-[330px] rounded-md'>
                <div className='relative'>
                    <Image
                        src={'/nail-salon.webp'}
                        width={1000}
                        height={1000}
                        alt="Picture of the author"
                        className='rounded-md object-cover'
                    />
                    <button style={{ padding: '9px', background: '#F8F8F8' }} className='absolute text-sm top-2 left-2 rounded-md text-black'>{publication.category}</button>
                    <img style={{ width: '40px', height: '40px', border: 'solid 2px white' }} className='object-cover absolute bottom-2 right-2 rounded-full' src={publication.imageProfil} alt="" />
                </div>
                <br />
                <CardContent>
                    <div>{publication.name}</div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center' style={{ marginTop: '3%' }}>
                            <img src={'/iconService/map-pin-3.svg'} alt="map.icon" />
                            <span style={{ color: "#CECECE", marginLeft: '5px' }}>{publication.isAtHome ? (
                                <span style={{ color: "#CECECE" }}>À Domicile</span>
                            ) : (
                                <span style={{ color: "#CECECE" }}>{publication.ville}</span>
                            )},</span>
                            <span style={{ color: "#CECECE", marginLeft: '5px' }}>{publication.isAtHome ? (
                                <span style={{ color: "#CECECE" }}>{publication.ville}</span>
                            ) : (
                                <span style={{ color: "#CECECE" }}>{publication.pays}</span>
                            )}</span>
                        </div>
                        <div className='flex items-center' style={{ color: '#CECECE', marginTop: '3%', marginRight: '2px' }}><StarFilled style={{ color: '#F7F74A', fontSize: '24px', marginRight: '5px' }} /> {publication.starRating}/5</div>
                    </div>
                    <br />
                    <div className='flex justify-between'>
                        <span>A partir de <span style={{ fontWeight: '700', fontSize: '150%' }}>{publication.prix} €</span></span>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='rounded-md' style={{ backgroundColor: 'black', color: '#fff', padding: '9px' }}>Modifier</DropdownMenuTrigger>
                            <DropdownMenuContent style={{ backgroundColor: '#fff' }}>
                                <DropdownMenuItem style={{ backgroundColor: '#fff' }} className='flex'><Button variant="secondary">Compte</Button><Button style={{ marginLeft: '20px' }} className='secondary'>Publication</Button></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <TabsContent value='publication'>
            <div className="h-full flex-1 flex-col space-y-8 pl-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Gestion des Publications</h2>
                </div>
                <div className='flex'>
                    <div className='col-span-3 min-w-64 max-w-64'>
                        <div className="bg-gray-100 rounded p-4">
                            <h1>Rechercher</h1>
                            <Input className="w-full bg-white text-gray-700 mt-2" placeholder='Que recherchez-vous ?' type="text" />
                        </div>
                        <div className="bg-gray-100 rounded p-4 mt-4">
                            <h1>Lieux</h1>
                            <Input className="w-full bg-white text-gray-700 mt-2" placeholder='Indiquer un lieu' type="text" />
                        </div>
                        <div className="bg-gray-100 rounded p-4 mt-4">
                            <h1>Catégories de Services</h1>
                            <Select onValueChange={handleCategoryChange}>
                                <SelectTrigger className='w-full bg-white mt-2'>
                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                </SelectTrigger>
                                <SelectContent className='w-full bg-white'>
                                    <SelectGroup>
                                        <SelectLabel>Catégories</SelectLabel>
                                        <SelectItem value="all">Toutes</SelectItem>
                                        <SelectItem value="coiffures">Coiffures</SelectItem>
                                        <SelectItem value="soins">Soins de la Peau</SelectItem>
                                        <SelectItem value="estheticienne">Esthéticienne</SelectItem>
                                        <SelectItem value="massages">Massages</SelectItem>
                                        <SelectItem value="bien-etre">Bien-être</SelectItem>
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
                                    components: {
                                        Slider: { dotActiveBorderColor: '#000', handleActiveColor: '#000', handleColor: '#000', trackBg: '#000', trackHoverBg: '#000', handleColorDisabled: '#000' },
                                    },
                                }}
                            >
                                <Slider style={{ width: '95%' }} className=" mt-4" marks={mark} step={5} max={200} range defaultValue={[50, 150]} onChange={handleSliderChange} />
                            </ConfigProvider>
                            <span className="block mt-2">Prix: {sliderValue[0]} € - {sliderValue[1]} €</span>
                        </div>
                        <button className="bg-black rounded text-white text-lg mt-4 w-full py-3">Rechercher</button>
                    </div>
                    <div style={{marginLeft:'2%'}}>
                    <div className="grid grid-cols-custom gap-7">
                        {publication.map(pub => (
                            <ModelPublication key={pub.id} publication={pub} />
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </TabsContent>
    )
}
