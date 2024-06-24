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

interface Formation {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  type: string;
  quantity: number;
  alt?: string;
}

const DisplayFormations = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFormationId, setSelectedFormationId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${window.location.origin}/api/formations/get`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Formation[]) => {
        console.log('Formations fetched:', data);
        setFormations(data);
      })
      .catch(error => console.error('Error fetching formations', error));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteFormationById(id);
      router.refresh();
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation:', error);
    }
  };

  async function deleteFormationById(id: string) {
    const response = await fetch(`/api/formations/delete/${id}/`, {
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
              <TableHead>Formation</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Tarif</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {formations.map((formation) => (
            <TableBody key={formation.id}>
              <TableRow>
                <TableCell>n° {formation.id}</TableCell>
                <TableCell>{formation.title}</TableCell>
                <TableCell>
                  <img
                    src={formation.image}
                    alt={formation.alt || formation.title}
                    style={{ width: '100px', height: 'auto', marginBottom: '5px' }}
                    className="rounded-lg"
                  />
                </TableCell>
                <TableCell>{formation.price} €</TableCell>
                <TableCell>{formation.quantity}</TableCell>
                <TableCell>
                  <div className="flex">
                    <Link href={`/dashboard/administrator/formation/${encodeURIComponent(formation.id)}`}>
                      <img src="/iconWorkPlace/edit.svg" alt="" />
                    </Link>
                    <AlertDialogTrigger asChild style={{ marginLeft: '20px' }}>
                      <img
                        src="/iconWorkPlace/trash-2.svg"
                        alt=""
                        onClick={() => {
                          setShowDialog(true);
                          setSelectedFormationId(formation.id);
                        }}
                      />
                    </AlertDialogTrigger>
                  </div>
                  {showDialog && selectedFormationId === formation.id && (
                    <AlertDialogContent key={formation.id}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Voulez-vous vraiment supprimer cette formation ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible, voulez-vous vraiment la supprimer ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          handleDelete(formation.id);
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

export default DisplayFormations;