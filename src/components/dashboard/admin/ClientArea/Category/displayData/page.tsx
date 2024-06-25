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

}

const DisplayCategory = () => {
  const [categories, setCategories] = useState<Client[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  

 

  async function deleteCategorytById(id: string) {
    const response = await fetch(`/api/category/delete/${id}/`, {
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
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {categories.map((category) => (
            <TableBody key={category.id}>
              <TableRow>
                <TableCell>n° {category.id}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                
                <TableCell>
                  <div className="flex">
                    <Link href={`/dashboard/administrator/client/${encodeURIComponent(category.id)}`}>
                      <img src="/iconWorkPlace/edit.svg" alt="" />
                    </Link>
                    <AlertDialogTrigger asChild style={{ marginLeft: '20px' }}>
                      <img
                        src="/iconWorkPlace/trash-2.svg"
                        alt=""
                        onClick={() => {
                          setShowDialog(true);
                         // setSelectedCategoryId(category.id);
                        }}
                      />
                    </AlertDialogTrigger>
                  </div>
             

                  //showDialog && selectedCategoryId === category.id &&
              
                 { (
                    <AlertDialogContent key={category.id}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Voulez-vous vraiment supprimer cette Catégorie ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible, voulez-vous vraiment la supprimer ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          //handleDelete(category.id);
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

export default DisplayCategory;
