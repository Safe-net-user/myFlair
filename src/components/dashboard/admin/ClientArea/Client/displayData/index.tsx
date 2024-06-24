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

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  status: string;
  subscription?: string;
  registrationDate: string;
}

const DisplayClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${window.location.origin}/api/clients/get`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Client[]) => {
        console.log('Clients fetched:', data);
        setClients(data);
      })
      .catch(error => console.error('Error fetching clients', error));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteClientById(id);
      router.refresh();
    } catch (error) {
      console.error('Erreur lors de la suppression du client:', error);
    }
  };

  async function deleteClientById(id: string) {
    const response = await fetch(`/api/clients/delete/${id}/`, {
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
              <TableHead>Nom & Prénom</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Numéro de téléphone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Abonnement</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {clients.map((client) => (
            <TableBody key={client.id}>
              <TableRow>
                <TableCell>n° {client.id}</TableCell>
                <TableCell>{`${client.firstName} ${client.lastName}`}</TableCell>
                <TableCell>{`${client.addressLine1}, ${client.addressLine2 || ''}, ${client.city}, ${client.postalCode}`}</TableCell>
                <TableCell>{client.phoneNumber}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.status}</TableCell>
                <TableCell>{client.subscription || '-'}</TableCell>
                <TableCell>{client.registrationDate}</TableCell>
                <TableCell>
                  <div className="flex">
                    <Link href={`/dashboard/administrator/client/${encodeURIComponent(client.id)}`}>
                      <img src="/iconWorkPlace/edit.svg" alt="" />
                    </Link>
                    <AlertDialogTrigger asChild style={{ marginLeft: '20px' }}>
                      <img
                        src="/iconWorkPlace/trash-2.svg"
                        alt=""
                        onClick={() => {
                          setShowDialog(true);
                          setSelectedClientId(client.id);
                        }}
                      />
                    </AlertDialogTrigger>
                  </div>
                  {showDialog && selectedClientId === client.id && (
                    <AlertDialogContent key={client.id}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Voulez-vous vraiment supprimer ce client ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible, voulez-vous vraiment le supprimer ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          handleDelete(client.id);
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

export default DisplayClients;
