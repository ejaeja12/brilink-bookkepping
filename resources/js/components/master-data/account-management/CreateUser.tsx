import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputField from '@/components/InputField';
import { toastError, toastSuccess } from '@/components/toastNotif';
import { Button } from '@/components/ui/button';
import { FieldSet, FieldTitle, FieldGroup, Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import datamasterAkun from '@/routes/datamaster-akun';

type Props = {
   editId?: number;
   onSuccessCallBack?: () => void;
};

type UserType = {
   id: number;
   name: string;
   email: string;
   roles: Array<{ role_name: string }>;
   password: string;
   status: string;
};

export default function CreateUser({ editId = 0, onSuccessCallBack = () => {} }: Props) {
   //    const [editId, setEditId] = useState('');
   const { users } = usePage<{ users: UserType[] }>().props;

   function getDataById() {
      // mencari data berdasarkan props editId

      if (editId !== 0) {
         const theUser = users.find((item: any) => item.id === editId);

         return theUser;
      }
   }

   const { post, setData, data, put, errors } = useForm({
      name: getDataById()?.name ?? '',
      email: getDataById()?.email ?? '',
      password: getDataById()?.password ?? '',
      role: getDataById()?.roles[0].role_name ?? '',
      status: getDataById()?.status ?? 'active',
   });

   function validate(val: string, onSuccess: () => void) {
      if (val === '') {
         toastError('Name harus diisi');
      } else {
         onSuccess();
      }
   }

   function handleSubmit() {
      // console.log('Submit');
      if (editId !== 0) {
         validate(
            data.name,

            () =>
               put(datamasterAkun.update.url(editId), {
                  onSuccess: () => {
                     toastSuccess(JSON.stringify(data));
                     onSuccessCallBack();
                  },
                  onError: () => {
                     toastError(JSON.stringify(errors));
                  },
               }),
         );
      } else {
         validate(
            data.name,

            () =>
               post(datamasterAkun.store.url(), {
                  onSuccess: () => {
                     toastSuccess('Bank berhasil ditambahkan');
                     onSuccessCallBack();
                  },
                  onError: () => {
                     toastError(JSON.stringify(errors));
                  },
               }),
         );
      }
   }

   return (
      <>
         <FieldSet>
            <FieldTitle className="mb-3 text-xl font-bold">Create User</FieldTitle>
            <FieldGroup>
               {editId === 0 && (
                  <>
                     {/* name */}
                     <InputField
                        label="Name"
                        placeHolder="Nama Lengkap"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                     />
                     {/* email*/}
                     <InputField
                        label="Email"
                        placeHolder="Email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                     />
                     {/* password */}
                     <InputField
                        label="Password"
                        placeHolder="Password"
                        value={data.password}
                        password
                        onChange={(e) => setData('password', e.target.value)}
                     />
                  </>
               )}
               <div className="flex w-full flex-row justify-between gap-12">
                  {/* role */}
                  <Field className="w-full">
                     <FieldTitle>Role</FieldTitle>
                     <Select
                        disabled={editId === 1}
                        value={data.role}
                        onValueChange={(e) => setData('role', e)}
                        required
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Pilih Role" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectItem value="super-admin">Super Admin</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </Field>

                  {/* Status */}
                  <Field className="w-full">
                     <FieldTitle>Status</FieldTitle>
                     <Select
                        disabled={editId === 1}
                        value={data.status}
                        onValueChange={(e) => setData('status', e)}
                        required
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="nonactive">Non Active</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </Field>
               </div>
               <Field className="md:mt-5">
                  <Button onClick={handleSubmit}>Submit</Button>
               </Field>
            </FieldGroup>
         </FieldSet>
      </>
   );
}
