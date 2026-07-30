import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { columns } from '@/components/data_table/columns';
import { DataTable } from '@/components/data_table/data-table';
import DialogInput from '@/components/DialogInput';
import FieldsEditTransaction from '@/components/input_transaction/FieldsEditTransaction';
import TabsCreateTransaction from '@/components/input_transaction/TabsCreateTransaction';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

export default function Dashboard({ transaksi }: { transaksi: any }) {
   const [open, setOpen] = useState(false);
   const [editId, setEditId] = useState('');

   function handleEditTogle(x: any) {
      setOpen(true);
      setEditId(x);
      console.log(x);
   }

   function handleCloseDialog() {
      setOpen(false);
      setEditId('');
   }

   return (
      <>
         <Head title="Dashboard" />

         {/* Modal transaction */}

         <DialogInput
            openState={open}
            setCloseState={() => handleCloseDialog()}
            trigger={
               <Button onClick={() => setOpen(true)} size={'lg'} className="w-sm">
                  Tambah Bank
               </Button>
            }
         >
            {editId !== '' ? (
               <FieldsEditTransaction dataId={editId} cb={() => handleCloseDialog()} />
            ) : (
               <TabsCreateTransaction callBack={() => setOpen(false)} />
            )}
         </DialogInput>

         {/* Table */}
         <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
            <div className="container mx-auto py-10">
               <DataTable
                  columns={columns({
                     onEdit: (columnData) => handleEditTogle(columnData),
                  })}
                  data={transaksi.data}
               />
            </div>
         </div>
      </>
   );
}

Dashboard.layout = {
   breadcrumbs: [
      {
         title: 'Dashboard',
         href: dashboard(),
      },
   ],
};
