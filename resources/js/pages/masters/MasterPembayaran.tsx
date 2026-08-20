import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '@/components/data_table/data-table';
import InputSearch from '@/components/data_table/input-search';
import DialogInput from '@/components/DialogInput';
import CreatePembayaranData from '@/components/master-data/pembayaran_master/CreatePembayaran';
import DeleteAction from '@/components/master-data/pembayaran_master/delete-action';
import { pembayaranColumn } from '@/components/master-data/pembayaran_master/PembayaranColumn.';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import datamasterPembayarans from '@/routes/datamaster-pembayarans';

export default function MasterPembayaran({ dataPembayaran }: { dataPembayaran: any }) {
   const [open, setOpen] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [editId, setEditId] = useState('');

   function handleEditDialog(id: string) {
      setOpen(true);
      setEditId(id);
   }
   function handleDelete(x: any) {
      setOpenDelete(true);
      setEditId(x);
      console.log(x);
   }

   function handleCloseDialog() {
      setOpen(false);
      setOpenDelete(false);
      setEditId('');
   }

   return (
      <>
         <Head title="Bank Data" />

         {/* Dialog Add Master Data : Bank */}

         {/* Table */}

         <Card className="w-full border-2 bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-xl">Data Jenis Pembayaran</CardTitle>
               <DialogInput
                  openState={open}
                  setCloseState={() => handleCloseDialog()}
                  trigger={
                     <Button onClick={() => setOpen(!open)} className="w-fit">
                        <Plus /> Jenis Pembayaran
                     </Button>
                  }
               >
                  <CreatePembayaranData editId={editId} onSuccessCallBack={() => handleCloseDialog()} />
               </DialogInput>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
               {/* Deffered itu fungsi bawaan inertia, lazy load data*/}

               <DataTable
                  columns={pembayaranColumn({
                     actionEdit: (e) => {
                        handleEditDialog(e);
                     },
                     onDelete: (e) => {
                        handleDelete(e);
                     },
                  })}
                  data={dataPembayaran}
                  filter={
                     <div className="flex w-fit flex-row gap-5">
                        <InputSearch onChanges={() => {}} />
                     </div>
                  }
               />
               <div className="flex items-center justify-end space-x-2 py-4">
                  <Button variant="outline" size="sm" onClick={() => {}} disabled={true}>
                     Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {}} disabled={true}>
                     Next
                  </Button>
               </div>
            </CardContent>
         </Card>
         {/* Delete Dialog */}
         <DialogInput openState={openDelete} setCloseState={handleCloseDialog}>
            <DeleteAction id={editId} handleCb={handleCloseDialog} />
         </DialogInput>
      </>
   );
}

MasterPembayaran.layout = {
   breadcrumbs: [
      {
         title: 'Master Data : Bank',
         href: datamasterPembayarans.index(),
      },
   ],
};
