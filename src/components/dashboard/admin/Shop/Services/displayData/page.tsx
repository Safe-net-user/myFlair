'use client';

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdditionalService {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  type: string;
  quantity: number;
  alt?: string;
}

const DisplayServices = () => {
  const [services, setServices] = useState<AdditionalService[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const router = useRouter()
  useEffect(() => {
    fetch(`${window.location.origin}/api/serviceAdditionnel/get`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: AdditionalService[]) => {
        console.log('Services fetched:', data);
        setServices(data);
      })
      .catch(error => console.error('Error fetching services', error));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteServiceById(id);
      router.refresh()
     
    } catch (error) {
      console.error('Erreur lors de la suppression du service:', error);
    }
  };
  async function deleteServiceById(id: string) {
    const response = await fetch(`/api/serviceAdditionnel/delete/${id}/`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
  
    return response.json();

  }
  
  return (
    <div>
      <AlertDialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Tarif</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {services.map((service) => (
            <TableBody key={service.id}>
              <TableRow>
                <TableCell>n° {service.id}</TableCell>
                <TableCell>{service.title}</TableCell>
                <TableCell>
                  <img
                    src={service.image}
                    alt={service.alt || service.title}
                    style={{ width: '100px', height: 'auto', marginBottom: '5px' }}
                    className="rounded-lg"
                  />
                </TableCell>
                <TableCell>{service.price} €</TableCell>
                <TableCell>{service.quantity}</TableCell>
                <TableCell>
                  <div className="flex">
                    <Link href={`/dashboard/administrator/service/${encodeURIComponent(service.id)}`}>
                      <img src="/iconWorkPlace/edit.svg" alt="" />
                    </Link>
                    <AlertDialogTrigger asChild style={{ marginLeft: '20px' }}>
                      <img
                        src="/iconWorkPlace/trash-2.svg"
                        alt=""
                        onClick={() => {
                          setShowDialog(true);
                          setSelectedServiceId(service.id);
                        }}
                      />
                    </AlertDialogTrigger>
                  </div>
                  {showDialog && selectedServiceId === service.id && (
                    <AlertDialogContent key={service.id}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Voulez-vous vraiment supprimer ce service ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible, voulez-vous vraiment le supprimer ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          handleDelete(service.id);
                          setShowDialog(false);
                        }}>
                          Valider
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </AlertDialog>
    </div>
  );
};

export default DisplayServices;

