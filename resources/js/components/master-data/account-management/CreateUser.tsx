import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import InputField from '@/components/InputField';
import { toastError, toastSuccess } from '@/components/toastNotif';
import { Button } from '@/components/ui/button';
import { FieldSet, FieldTitle, FieldGroup, Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import datamasterAkun from '@/routes/datamaster-akun';

type Props = {
   editId?: string;
   onSuccessCallBack?: () => void;
};

type UserType = {
   id: string;
   name: string;
   email: string;
   password: string;
   status: string;
};

export default function CreateUser({ editId = '', onSuccessCallBack = () => {} }: Props) {
   // const [editId, setEditId] = useState('');
   const { bankData } = usePage<{ bankData: UserType[] }>().props;
   function getDataById() {
      // mencari data berdasarkan props editId

      if (editId !== '') {
         const theBank = bankData.find((item: any) => item.id === editId);

         return theBank;
      }
   }

   console.log('bankData', bankData);
   console.log('editId', getDataById());

   const { post, setData, data, put, errors } = useForm({
      name: getDataById()?.name ?? '',
      email: getDataById()?.email ?? '',
      password: getDataById()?.password ?? '',
      role: 'admin',
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
      if (editId !== '') {
         validate(
            data.name,

            () =>
               put(datamasterAkun.update.url(editId), {
                  onFinish: () => {
                     toastSuccess(JSON.stringify(data));
                     onSuccessCallBack();
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
               {/* role */}
               <InputField label="Role" value={data.role} onChange={(e) => setData('role', e.target.value)} />
               <Field>
                  <Label>Status</Label>
                  <Switch
                     onCheckedChange={() => setData('status', data.status === 'active' ? 'nonactive' : 'active')}
                     checked={data.status === 'active'}
                  ></Switch>
               </Field>
               <Field>
                  <Button onClick={handleSubmit}>Submit</Button>
               </Field>
            </FieldGroup>
         </FieldSet>
      </>
   );
}
