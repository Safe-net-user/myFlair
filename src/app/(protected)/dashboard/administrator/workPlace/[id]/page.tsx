'use client';

import { METHODS } from 'http';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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
        const res = await fetch(`/api/post/edit/${params.id}`, {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const postData: Post = await res.json(); // Parse response as JSON
        setPost(postData); // Update state with post data
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
      } catch (error) {
        console.error('Error fetching post:', error);
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
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Duration Week Start Hour</label>
            <input
              type="number"
              value={durationWeekStartHour}
              onChange={(e) => setDurationWeekStartHour(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Duration Week Start Minute</label>
            <input
              type="number"
              value={durationWeekStartMinute}
              onChange={(e) => setDurationWeekStartMinute(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Duration Week End Hour</label>
            <input
              type="number"
              value={durationWeekEndHour}
              onChange={(e) => setDurationWeekEndHour(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Duration Week End Minute</label>
            <input
              type="number"
              value={durationWeekEndMinute}
              onChange={(e) => setDurationWeekEndMinute(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Duration Saturday Start Hour</label>
            <input
              type="number"
              value={durationSaturdayStartHour}
              onChange={(e) => setDurationSaturdayStartHour(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Duration Saturday Start Minute</label>
            <input
              type="number"
              value={durationSaturdayStartMinute}
              onChange={(e) => setDurationSaturdayStartMinute(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Duration Saturday End Hour</label>
            <input
              type="number"
              value={durationSaturdayEndHour}
              onChange={(e) => setDurationSaturdayEndHour(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Duration Saturday End Minute</label>
            <input
              type="number"
              value={durationSaturdayEndMinute}
              onChange={(e) => setDurationSaturdayEndMinute(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Week Price</label>
            <input
              type="text"
              value={weekPrice}
              onChange={(e) => setWeekPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Saturday Price</label>
            <input
              type="text"
              value={saturdayPrice}
              onChange={(e) => setSaturdayPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Valide</label>
            <input
              type="checkbox"
              checked={valide}
              onChange={(e) => setValide(e.target.checked)}
            />
          </div>
          <div>
            <label>Alt</label>
            <input
              type="text"
              value={alt || ''}
              onChange={(e) => setAlt(e.target.value)}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  };
  
  export default EditPost;