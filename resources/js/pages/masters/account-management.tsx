import { Plus } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '@/components/data_table/data-table';
import DialogInput from '@/components/DialogInput';
import type { UserRoleType } from '@/components/master-data/account-management/column';
import { accountManagementColumn } from '@/components/master-data/account-management/column';
import CreateUser from '@/components/master-data/account-management/CreateUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AccountManagement({ users }: { users: UserRoleType[] }) {
   const [open, setOpen] = useState(false);
   const [editId, setEditId] = useState(0);

   function handleEditDialog(id: number) {
      setOpen(true);
      setEditId(id);
   }

   function handleCloseDialog() {
      setOpen(false);
      setEditId(0);
   }

   return (
      <>
         <Card className="w-full border-2 bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-xl">Data User</CardTitle>

               <DialogInput
                  openState={open}
                  setCloseState={() => handleCloseDialog()}
                  trigger={
                     <Button onClick={() => setOpen(true)} className="w-fit">
                        <Plus />
                        Tambah User
                     </Button>
                  }
               >
                  <CreateUser editId={editId} onSuccessCallBack={() => handleCloseDialog()} />
               </DialogInput>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-1 md:p-5">
               {/* Deffered itu fungsi bawaan inertia, lazy load data*/}

               <DataTable
                  columns={accountManagementColumn({ actionEdit: (e) => handleEditDialog(e) })}
                  data={users}
               ></DataTable>
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
      </>
   );
}
