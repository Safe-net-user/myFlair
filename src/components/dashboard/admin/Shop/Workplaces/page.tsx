'use client';

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TabsContent } from '@/components/ui/tabs';
import ReactQuill from 'react-quill';
import "quill-paste-smart"
import 'react-quill/dist/quill.snow.css';
import { Cloudinary } from '@cloudinary/url-gen';
import { Input } from '@/components/ui/input';
import DisplayWorkPlace from './displayData/page';
import { secondsToMilliseconds } from 'date-fns';
interface Post {
  image: string;
  title: string;
  description: string;
  durationWeekStartHour: string;
  durationWeekStartMinute: string;
  durationWeekEndHour: string;
  durationWeekEndMinute: string;
  durationSaturdayStartHour: string;
  durationSaturdayStartMinute: string;
  durationSaturdayEndHour: string;
  durationSaturdayEndMinute: string;
  weekPrice: string;
  saturdayPrice: string;
  stock: number;
  valide?: boolean | undefined;
  alt?: string;
  [key: string]: string | boolean | number | undefined;
}

const AddPost = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState();
  const [isLoading, setIsLoading] = useState(false); 
  const [posts, setPosts] = useState<Post[]>([
    {
      title: "",
      weekPrice: "",
      saturdayPrice: "",
      stock: 0,
      valide: true,
      description: "",
      durationWeekStartHour: "",
      durationWeekStartMinute: "",
      durationWeekEndHour: "",
      durationWeekEndMinute: "",
      durationSaturdayStartHour: "",
      durationSaturdayStartMinute: "",
      durationSaturdayEndHour: "",
      durationSaturdayEndMinute: "",
      image: "",
      alt: ""
    }
  ]);

  const addPost = () => {
    setPosts([...posts, {
      title: "",
      weekPrice: "",
      saturdayPrice: "",
      stock: 0,
      valide: true,
      description: "",
      durationWeekStartHour: "",
      durationWeekStartMinute: "",
      durationWeekEndHour: "",
      durationWeekEndMinute: "",
      durationSaturdayStartHour: "",
      durationSaturdayStartMinute: "",
      durationSaturdayEndHour: "",
      durationSaturdayEndMinute: "",
      image: "",
      alt: ""
    }]);
  };

  const handlePostChange = (index: number, key: string, value: any) => {
    const newPosts = [...posts];
    
    newPosts[index][key] = value;
    setPosts(newPosts);
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
    handlePostChange(0, 'image', '');
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
        handlePostChange(0, 'image', imageUrl);
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true); 
    try {
      const postData = posts[0];
      const response = await axios.post('/api/post', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        toast.success('Poste créé avec succès');
        setTimeout(() => {
          router.push('/');
        }, 4800); 
      } else {
        toast.error('Erreur lors de la création du poste');
        console.log('Erreur lors de la création du poste:', response.data);
      }
    } catch (error) {
      toast.error('Erreur lors de la création du poste');
      console.error('Erreur:', error);
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
      handlePostChange(0, 'image', imageUrl);
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error);
    }
  };

  const cld = new Cloudinary({ cloud: { cloudName: process.env.CLOUDINARY_CLOUDNAME } });
  var myImageUrl = cld.image().toURL();

  return (
    <div>
    <TabsContent value="workplaces" className="space-y-4">
      <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          
          <h2 className="text-2xl font-bold tracking-tight">Postes</h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>Ajouter</Button>
            </DialogTrigger>
       
       
            <DialogContent className="max-h-screen overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Poste</DialogTitle>
                <br />
                <DialogDescription>
                  {posts.map((post, index) => (
                    <div key={index}>
                      <div>
                        <label>Titre du poste</label>
                        <br />
                        <br />
                        <Input
                          className="rounded outline-none"
                          type="text"
                          value={post.title}
                          onChange={(e) => handlePostChange(index, 'title', e.target.value)}
                          placeholder="Exemple: Salle de réunion"
                          required
                        />
                      </div>
                      <br />
                      <div>
                        <label>Prix durant la semaine</label>
                        <br />
                        <br />
                        <Input
                          className=" rounded outline-none"
                          type="number"
                          value={post.weekPrice}
                          onChange={(e) => handlePostChange(index, 'weekPrice', e.target.value)}
                          onWheel={(e) => e.currentTarget.blur()}
                          placeholder="Ex: 50"
                          required
                        />
                      </div>
                      <br />
                      <div>
                        <label>Prix le Samedi</label>
                        <br />
                        <br />
                        <Input
                          className=" rounded outline-none"
                          type="number"
                          value={post.saturdayPrice}
                          onChange={(e) => handlePostChange(index, 'saturdayPrice', e.target.value)}
                          onWheel={(e) => e.currentTarget.blur()}
                          placeholder="Ex: 75"
                          required
                        />
                      </div>
                      <br />
                      <div>
                        <label>Heures d'ouverture en semaine</label>
                        <br />
                        <br />
                        <div className="flex space-x-2 items-center">
                          <Input
                            className="text-lg rounded outline-none"
                            type="number"
                            min="0"
                            max="23"
                            value={post.durationWeekStartHour}
                            onWheel={(e) => e.currentTarget.blur()}
                            onChange={(e) => handlePostChange(index, 'durationWeekStartHour', parseInt(e.target.value))}
                            placeholder="HH"
                            required
                          />
                          <span>h</span>
                          <Input
                            className="text-lg rounded outline-none"
                            type="number"
                            min="0"
                            max="59"
                            onWheel={(e) => e.currentTarget.blur()}
                            value={post.durationWeekStartMinute}
                            onChange={(e) => handlePostChange(index, 'durationWeekStartMinute', parseInt(e.target.value))}
                            placeholder="MM"
                            required
                          />
                          <span>à</span>
                          <Input
                            className="text-lg rounded outline-none"
                            type="number"
                            min="0"
                            max="23"
                            value={post.durationWeekEndHour}
                            onWheel={(e) => e.currentTarget.blur()}
                            onChange={(e) => handlePostChange(index, 'durationWeekEndHour', parseInt(e.target.value))}
                            placeholder="HH"
                            required
                          />
                          <span>h</span>
                          <Input
                            className="text-lg rounded outline-none"
                            type="number"
                            min="0"
                            max="59"
                            value={post.durationWeekEndMinute}
                            onWheel={(e) => e.currentTarget.blur()}
                            onChange={(e) => handlePostChange(index, 'durationWeekEndMinute', parseInt(e.target.value))}
                            placeholder="MM"
                            required
                          />
                        </div>
                      </div>
                      <br />
                      <div>
                        <label>Heures d'ouverture le samedi</label>
                        <br />
                        <br />
                        <div className="flex space-x-2 items-center">
                          <Input
                            className="text-lg rounded outline-none"
                            type="number"
                            min="0"
                            max="23"
                            value={post.durationSaturdayStartHour}
                            onWheel={(e) => e.currentTarget.blur()}
                            onChange={(e) => handlePostChange(index, 'durationSaturdayStartHour', parseInt(e.target.value))}
                            placeholder="HH"
                            required
                          />
                          <span>h</span>
                          <Input
                            className="text-lg rounded outline-none"
                            type="number"
                            min="0"
                            max="59"
                            value={post.durationSaturdayStartMinute}
                            onWheel={(e) => e.currentTarget.blur()}
                            onChange={(e) => handlePostChange(index, 'durationSaturdayStartMinute', parseInt(e.target.value))}
                            placeholder="MM"
                            required
                          />
                          <span>à</span>
                          <Input
                            className="text-lg rounded outline-none"
                            type="number"
                            min="0"
                            max="23"
                            value={post.durationSaturdayEndHour}
                            onWheel={(e) => e.currentTarget.blur()}
                            onChange={(e) => handlePostChange(index, 'durationSaturdayEndHour', parseInt(e.target.value))}
                            placeholder="HH"
                            required
                          />
                          <span>h</span>
                          <Input
                            className="text-lg rounded outline-none"
                            type="number"
                            min="0"
                            max="59"
                            value={post.durationSaturdayEndMinute}
                            onWheel={(e) => e.currentTarget.blur()}
                            onChange={(e) => handlePostChange(index, 'durationSaturdayEndMinute', parseInt(e.target.value))}
                            placeholder="MM"
                            required
                          />
                        </div>
                      </div>
                      <br />
                      <div>
  <label>Stock</label>
  <br />
  <br />
  <Input
  onWheel={(e) => e.currentTarget.blur()}
                        type="number"
                        value={post.stock}
                        onChange={(e) => handlePostChange( index,'stock', parseInt(e.target.value))}
                        required
                        placeholder='Ex: 10'
                      />
</div>
<br/>
                      <div style={{ width: "100%", height: "1px", background: "#EAEAEA" }}></div>
                      <br />
                      <div>
                        <div>Description</div>
                        <br />
                        <ReactQuill
                          value={post.description}
                          onChange={(value) => handlePostChange(index, 'description', value)}
                          placeholder="Rédiger votre description..."
                          
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
                      <br />
                    </div>
                  ))}
                  <br />
                  <Button className='flex items-end justify-end' type="submit" onClick={handleSubmit}>Ajouter</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <DisplayWorkPlace/>
      </div>
    </TabsContent>
     <ToastContainer />
    </div>
  );
}

export default AddPost;
