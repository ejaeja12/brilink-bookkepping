import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { columns } from '@/components/data_table/columns';
import { DataTable } from '@/components/data_table/data-table';
import DialogInput from '@/components/DialogInput';
import FieldsEditTransaction from '@/components/input_transaction/FieldsEditTransaction';
import TabsCreateTransaction from '@/components/input_transaction/TabsCreateTransaction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
         <div className="flex flex-col gap-8">
            <div className="grid grid-cols-12 gap-4">
               <Card className="col-span-4 h-36" />
               <Card className="col-span-4 h-36" />
               <Card className="col-span-4 h-36" />
            </div>

            {/* Table */}
            <Card className="w-full border-2 bg-white">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl">Transaksi</CardTitle>
               </CardHeader>
               <CardContent className="flex flex-col gap-5">
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
                  <DataTable
                     columns={columns({
                        onEdit: (columnData) => handleEditTogle(columnData),
                     })}
                     data={transaksi.data}
                  />
               </CardContent>
            </Card>
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
