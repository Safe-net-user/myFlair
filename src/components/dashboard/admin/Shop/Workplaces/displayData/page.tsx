import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
const DisplayWorkPlace=()=>{
    return(
        <div>
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
  <TableBody>
    <TableRow>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  </TableBody>
</Table>
        </div>
    )

}
export default DisplayWorkPlace