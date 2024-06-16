import { MouseEventHandler, useEffect, useState } from "react";
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
interface Workplace {
  id: number;
  image: string; 
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
  valide?: boolean;
  alt?: string;
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteWorkplaceById } from "@/data/services/workplace";
import { prisma } from "@/lib/prisma";
import { id } from "date-fns/locale";
import Link from "next/link";

const DisplayWorkPlace = () => {
  const [workplaces, setWorkplaces] = useState<Workplace[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedWorkplaceId, setSelectedWorkplaceId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${window.location.origin}/api/post/get`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Workplace[]) => {
        console.log('Service fetched:', data);
        setWorkplaces(data);
      })
      .catch(error => console.error('Error fetching workplace', error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkplaceById(id);
      setWorkplaces(prevState => prevState.filter(item => item.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du poste de travail:', error);
    }
  };

  return (
    <div>
      <AlertDialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Tarif</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {workplaces.map((workplace) => (
            <TableBody key={workplace.id}>
              <TableRow>
                <TableCell>n° {workplace.id}</TableCell>
                <TableCell>{workplace.title}</TableCell>
                <TableCell>
                  <img
                    src={workplace.image} 
                    alt={workplace.alt || workplace.title}
                    style={{ width: '100px', height: 'auto', marginBottom: '5px' }}
                    className="rounded-lg"
                  />
                </TableCell>
                <TableCell>{workplace.weekPrice} €</TableCell>
                <TableCell>{workplace.stock}</TableCell>
                <TableCell>
                  <div className="flex">
                    <Link href={`/dashboard/administrator/workPlace/${encodeURIComponent(workplace.id)}`} ><img src="/iconWorkPlace/edit.svg" alt="" /></Link>
                    <AlertDialogTrigger asChild style={{marginLeft:'20px'}}>
                      <img src="/iconWorkPlace/trash-2.svg" alt="" onClick={() => {
                        setShowDialog(true);
                        setSelectedWorkplaceId(workplace.id);
                      }} />
                    </AlertDialogTrigger>
                  </div>
                  {showDialog && selectedWorkplaceId === workplace.id && (
                    <AlertDialogContent key={workplace.id}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Voulez-vous vraiment supprimer ce poste ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible, voulez-vous vraiment le supprimer ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          handleDelete(workplace.id);
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

export default DisplayWorkPlace;