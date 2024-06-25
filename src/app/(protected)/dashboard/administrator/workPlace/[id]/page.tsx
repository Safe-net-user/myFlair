'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import "quill-paste-smart"
import 'react-quill/dist/quill.snow.css';

interface Post {
  id: number;
  title: string;
  description: string;
  durationWeekStartHour: number;
  durationWeekStartMinute: number;
  durationWeekEndHour: number;
  durationWeekEndMinute: number;
  durationSaturdayStartHour: number;
  durationSaturdayStartMinute: number;
  durationSaturdayEndHour: number;
  durationSaturdayEndMinute: number;
  weekPrice: string;
  saturdayPrice: string;
  stock: number;
  valide: boolean;
  alt: string | null;
}

const EditPost = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [durationWeekStartHour, setDurationWeekStartHour] = useState<number>(0);
  const [durationWeekStartMinute, setDurationWeekStartMinute] = useState<number>(0);
  const [durationWeekEndHour, setDurationWeekEndHour] = useState<number>(0);
  const [durationWeekEndMinute, setDurationWeekEndMinute] = useState<number>(0);
  const [durationSaturdayStartHour, setDurationSaturdayStartHour] = useState<number>(0);
  const [durationSaturdayStartMinute, setDurationSaturdayStartMinute] = useState<number>(0);
  const [durationSaturdayEndHour, setDurationSaturdayEndHour] = useState<number>(0);
  const [durationSaturdayEndMinute, setDurationSaturdayEndMinute] = useState<number>(0);
  const [weekPrice, setWeekPrice] = useState<string>('');
  const [saturdayPrice, setSaturdayPrice] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [valide, setValide] = useState<boolean>(true);
  const [alt, setAlt] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getWorkPlaceById/${params.id}`, {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${res.status}`);
        }
        const postData: Post = await res.json();
        setPost(postData);
        setTitle(postData.title);
        setDescription(postData.description);
        setDurationWeekStartHour(postData.durationWeekStartHour);
        setDurationWeekStartMinute(postData.durationWeekStartMinute);
        setDurationWeekEndHour(postData.durationWeekEndHour);
        setDurationWeekEndMinute(postData.durationWeekEndMinute);
        setDurationSaturdayStartHour(postData.durationSaturdayStartHour);
        setDurationSaturdayStartMinute(postData.durationSaturdayStartMinute);
        setDurationSaturdayEndHour(postData.durationSaturdayEndHour);
        setDurationSaturdayEndMinute(postData.durationSaturdayEndMinute);
        setWeekPrice(postData.weekPrice);
        setSaturdayPrice(postData.saturdayPrice);
        setStock(postData.stock);
        setValide(postData.valide);
        setAlt(postData.alt);
        console.log(setDescription(postData.description))
      } catch (error) {
        console.error('Erreur lors de la récupération du post :', error);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/post/edit/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        durationWeekStartHour,
        durationWeekStartMinute,
        durationWeekEndHour,
        durationWeekEndMinute,
        durationSaturdayStartHour,
        durationSaturdayStartMinute,
        durationSaturdayEndHour,
        durationSaturdayEndMinute,
        weekPrice,
        saturdayPrice,
        stock,
        valide,
        alt,
      }),
    });

    if (response.ok) {
      router.push('/');
    }
  };

  if (!post) {
    return <div className='flex flex-col justify-center items-center'>Chargement en cours...</div>;
  }

  return (
    <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div className="flex items-center justify-between space-y-2">

      <h2 className="text-2xl font-bold tracking-tight">Modification des Postes</h2>
      </div>
      <div style={{margin: '0 auto'}} className='flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit} style={{margin:'3%'}}>
        <div>
          <label>Titre</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Description</label>
          <br />

          <ReactQuill
            value={description}
            onChange={(value) => setDescription(value)}
            placeholder="Rédigez votre description..."
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
                            placeholder="MM"
                            required
                          />
                        </div>
                        </div>
        <br />
        <div>
          <label>Prix durant le Semaine</label>
          <Input
            type="number"
            value={post.weekPrice}
          //  onChange={(e) => setWeekPrice(parseInt(e.target.value))}
          />
        </div>
        <br />
        <div>
          <label>Prix durant le Samedi</label>
          <Input
            type="number"
            value={post.saturdayPrice}
           // onChange={(e) => setSaturdayPrice(parseInt(e.target.value))}
          />
        </div>
        <br />
        <div>
          <label>Stock</label>
          <Input
            type="number"
            value={stock}
         //   onChange={(e) => setStock(parseInt(e.target.value))}
          />
        </div>
        <br />
        <br />
        <Button type="submit">Enregistrer les modifications</Button>
      </form>
      <br />
      <br />
      </div>
    </div>

  );
};

export default EditPost;