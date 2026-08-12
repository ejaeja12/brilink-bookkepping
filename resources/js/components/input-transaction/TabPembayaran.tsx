import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputCurrency from '@/components/input-currency';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminFeeRules } from '@/lib/adminFeeRules';
import { store } from '@/routes/transaction';
import { update } from '@/routes/transaction';
import type { Transaction } from '@/types/transaction';
import type { BankType, PembayaranType } from '@/types/transaction';
import InputField from '../InputField';
import { toastSuccess, toastError } from '../toastNotif';
import { Button } from '../ui/button';

type Props = {
   editId?: string;
   onSuccessCallBack: () => void;
};

export function TabPembayaran({ editId = '', onSuccessCallBack }: Props) {
   const { transaksi, bankData, pembayaranData } = usePage<{
      transaksi: { data: Transaction[] };
      bankData: BankType[];
      pembayaranData: PembayaranType[];
   }>().props;

   /**
    * Mencari data berdasarkan props editId
    * return : Transaction | undefined
    */
   const editData = editId !== '' ? transaksi.data.find((x: Transaction) => x.id === editId) : undefined;

   const [nominal, setNominal] = useState(editData?.nominal ? String(editData?.nominal) : '');
   const [biayaLayanan, setBiayaLayanan] = useState(editData?.biaya_layanan ? String(editData?.biaya_layanan) : '');
   const [jenisPembayaran, setJenisPembayaran] = useState(editData?.jenis_pembayaran ?? '');
   const [bankValue, setBankValue] = useState(editData?.bank.id ?? '');

   const [fieldJenisPembayaran, setFieldJenisPembayaran] = useState(
      editData
         ? pembayaranData.some((item) => item.name === editData.jenis_pembayaran)
            ? editData.jenis_pembayaran
            : 'lainnya'
         : '',
   );

   // Ambil data master bank

   const listJenisPembayaran = [
      ...pembayaranData,
      {
         id: 'lainnya',
         name: 'lainnya',
      },
   ];

   const { setData, post, put, processing } = useForm({
      bank_id: '',
      nominal: '0',
      jenis_transaksi: 'pembayaran',
      jenis_pembayaran: '',
      biaya_layanan: '0',
      biaya_admin: 0,
   });

   function validateData(onValidate: () => void) {
      if (bankValue == '') {
         return toastError('Bank tidak boleh kosong');
      } else if (nominal == '') {
         return toastError('Nominal tidak boleh kosong');
      } else if (jenisPembayaran === '') {
         return toastError('Jenis Pembayaran tidak boleh kosong');
      } else {
         onValidate();
      }
   }
   function submit(e: React.FormEvent) {
      e.preventDefault();
      setData('nominal', nominal);
      setData('biaya_layanan', biayaLayanan);
      setData('jenis_pembayaran', jenisPembayaran);
      setData('bank_id', bankValue);
      validateData(() => {
         if (editId !== '') {
            put(update.url(editId), {
               onFinish: () => {
                  toastSuccess('Transaksi berhasil diubah');
                  onSuccessCallBack();
               },
            });
         } else {
            post(store.url(), {
               onSuccess: () => {
                  onSuccessCallBack();
                  toastSuccess('Transaksi berhasil ditambahkan');
               },
            });
         }
      });
   }

   return (
      <FieldSet className="flex w-full py-8">
         <FieldGroup className="w-full">
            <div className="flex w-full flex-row">
               {/* Sumber Dana */}
               <Field>
                  <FieldLabel htmlFor="username">Sumber Dana</FieldLabel>

                  <Select value={bankValue} onValueChange={(e) => setBankValue(e)} required>
                     <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Sumber Dana" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           {bankData.map((item) => (
                              <SelectItem key={item.id} value={item.id.toString()}>
                                 {item.name}
                              </SelectItem>
                           ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </Field>

               {/* Pembayaran */}
               <Field>
                  <FieldLabel htmlFor="username">Jenis Pembayaran</FieldLabel>
                  <Select
                     value={fieldJenisPembayaran}
                     onValueChange={(e) => {
                        setJenisPembayaran(e === 'lainnya' ? '' : e);
                        setFieldJenisPembayaran(e);
                     }}
                  >
                     <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Jenis Pembayaran" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           {listJenisPembayaran.map((item) => (
                              <SelectItem key={item.name} value={item.name}>
                                 {item.name}
                              </SelectItem>
                           ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </Field>
            </div>

            <InputField
               hidden={fieldJenisPembayaran !== 'lainnya'}
               label="Jenis Pembayaran"
               value={jenisPembayaran}
               className="h-fit text-xl!"
               placeHolder="Jenis Pembayaran Lainnya"
               onChange={(e) => setJenisPembayaran(e.target.value)}
            />

            <InputCurrency initialValue={nominal} label="Nominal" handleInput={setNominal} />

            <InputCurrency initialValue={biayaLayanan} label="Biaya Layanan" handleInput={setBiayaLayanan} />

            <InputCurrency disabled displayValue={adminFeeRules(nominal)} label="Admin" />

            <Field>
               <Button disabled={processing} onClick={submit}>
                  Submit
               </Button>
            </Field>
         </FieldGroup>
      </FieldSet>
   );
}
