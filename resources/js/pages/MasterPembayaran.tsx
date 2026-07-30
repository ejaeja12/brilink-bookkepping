import { Head } from '@inertiajs/react';
import { useState } from 'react';

import { DataTable } from '@/components/data_table/data-table';

import DialogInput from '@/components/DialogInput';
import CreatePembayaranData from '@/components/master_data/pembayaran_master/CreatePembayaran';
import { pembayaranColumn } from '@/components/master_data/pembayaran_master/PembayaranColumn.';
import { Button } from '@/components/ui/button';

import masterBanks from '@/routes/master-banks';

export default function MasterPembayaran({ dataPembayaran }: { dataPembayaran: any }) {
   const [open, setOpen] = useState(false);
   const [editId, setEditId] = useState('');

   function handleEditDialog(id: string) {
      setOpen(true);
      setEditId(id);
   }

   function handleCloseDialog() {
      setOpen(false);
      setEditId('');
   }

   return (
      <>
         <Head title="Bank Data" />

         {/* Dialog Add Master Data : Bank */}
         <DialogInput
            openState={open}
            setCloseState={() => handleCloseDialog()}
            trigger={
               <Button onClick={() => setOpen(!open)} size={'lg'} className="w-sm">
                  Tambah Bank
               </Button>
            }
         >
            <CreatePembayaranData editId={editId} onSuccessCallBack={() => handleCloseDialog()} />
         </DialogInput>

         {/* Table */}
         <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
            <div className="container mx-auto py-10">
               <DataTable
                  columns={pembayaranColumn({
                     actionEdit: (e) => {
                        handleEditDialog(e);
                     },
                  })}
                  data={dataPembayaran}
               />
            </div>
         </div>
      </>
   );
}

MasterPembayaran.layout = {
   breadcrumbs: [
      {
         title: 'Master Data : Bank',
         href: masterBanks.index(),
      },
   ],
};
