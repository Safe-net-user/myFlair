'use client'
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

interface BusinessBooster {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  period: string;
  quantity: number;
  alt?: string;
}

const DisplayBusinessBoosters = () => {
  const [businessBoosters, setBusinessBoosters] = useState<BusinessBooster[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedBoosterId, setSelectedBoosterId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${window.location.origin}/api/businessBooster/get`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: BusinessBooster[]) => {
        console.log('Business Boosters fetched:', data);
        setBusinessBoosters(data);
      })
      .catch(error => console.error('Error fetching business boosters', error));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBusinessBoosterById(id);
      router.refresh();
    } catch (error) {
      console.error('Erreur lors de la suppression du Business Booster:', error);
    }
  };

  async function deleteBusinessBoosterById(id: string) {
    const response = await fetch(`/api/businessBooster/delete/${id}/`, {
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
              <TableHead>Business Booster</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Tarif</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {businessBoosters.map((booster) => (
            <TableBody key={booster.id}>
              <TableRow>
                <TableCell>n° {booster.id}</TableCell>
                <TableCell>{booster.title}</TableCell>
                <TableCell>
                  <img
                    src={booster.image}
                    alt={booster.alt || booster.title}
                    style={{ width: '100px', height: 'auto', marginBottom: '5px' }}
                    className="rounded-lg"
                  />
                </TableCell>
                <TableCell>{booster.price} €</TableCell>
                <TableCell>{booster.quantity}</TableCell>
                <TableCell>
                  <div className="flex">
                    <Link href={`/dashboard/administrator/businessBooster/${encodeURIComponent(booster.id)}`}>
                      <img src="/iconWorkPlace/edit.svg" alt="" />
                    </Link>
                    <AlertDialogTrigger asChild style={{ marginLeft: '20px' }}>
                      <img
                        src="/iconWorkPlace/trash-2.svg"
                        alt=""
                        onClick={() => {
                          setShowDialog(true);
                          setSelectedBoosterId(booster.id);
                        }}
                      />
                    </AlertDialogTrigger>
                  </div>
                  {showDialog && selectedBoosterId === booster.id && (
                    <AlertDialogContent key={booster.id}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Voulez-vous vraiment supprimer ce Business Booster ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible, voulez-vous vraiment le supprimer ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          handleDelete(booster.id);
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

export default DisplayBusinessBoosters;