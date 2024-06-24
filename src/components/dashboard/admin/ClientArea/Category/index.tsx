'use client'
import { TabsContent } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { UndoIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Cloudinary } from '@cloudinary/url-gen';
import axios from 'axios';
import { Toast } from '@/components/ui/toast';
import { toast } from 'react-toastify';

interface Category {
    title: string;
    image: string;
    key: string;
}
import { useRouter } from 'next/navigation';
export default function Category() {
    const [categories, setCategories] = useState<Category[]>([
        {
            title:'',
            image:'',
            key:'',
        }
    ]);

  const router = useRouter();
  

    
  const handleSubmit = async () => {

    try {
      
      const response = await axios.post('/api/clients/add', categories, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        toast.success('Nouvelle catégorie ajouté avec succès');
        setTimeout(() => {
          router.push('/dashboard/clients');
        }, 2000);
      } else {
        toast.error('Erreur lors de l\'ajout de la catégorie');
        console.log('Error adding client:', response.data);
      }
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de la catégorie');
      console.error('Error:', error);
    } finally {
    
    }
  };


    const handleCategoryChange = (index: number, key: keyof Category, value: any) => {
        const newCategories = [...categories];
        newCategories[index][key] = value;
        setCategories(newCategories);
    };

    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDelete = () => {
        setImages([]);
        handleCategoryChange(0, 'image', '');
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
                handleCategoryChange(0, 'image', imageUrl);
            } catch (error) {
                console.error('Erreur lors du téléchargement de l\'image:', error);
            }
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
            handleCategoryChange(0, 'image', imageUrl);
        } catch (error) {
            console.error("Erreur lors du téléchargement de l'image:", error);
        }
    };

    const cld = new Cloudinary({ cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME } });
    var myImageUrl = cld.image().toURL();

    return (
        <TabsContent value='category' className='space-y-4'>
            <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
                <div className='flex items-center justify-between space-y-2'>
                    <h2 className='text-2xl font-bold tracking-tight'>Catégories</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Ajouter</Button>
                        </DialogTrigger>

                        <DialogContent className='max-h-screen overflow-y-scroll'>
                            <DialogHeader>
                                <DialogTitle>Catégorie</DialogTitle>
                                <br />
                                <DialogDescription>
                                    {categories.map((category, index) => (
                                        <div key={index}>
                                            <div>
                                                <label>Titre de la Catégorie</label>
                                                <br />
                                                <br />
                                                <Input
                                                className='rounded outline-none'
                                                type='text'
                                                value={category.title}
                                                onChange={(e) => handleCategoryChange(index, 'title', e.target.value)}
                                                placeholder='Exemple: Coiffure'
                                                required
                                                />
                                            </div>
                                            <br />
                                            <div>
                                                <label>Image</label>
                                                <br />
                                                <br />
                                                <div
                                                    onClick={handleClick}
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
                                                    <p className="text-sm">Formats pris en charge: JPEG, PNG, JPG, WebP et SVG</p>
                                                </div>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/jpeg, image/png, image/jpg, image/svg, image/webp"
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
                                        </div>
                                    ))}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </TabsContent>
    )
}
