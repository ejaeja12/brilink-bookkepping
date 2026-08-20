import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminFeeRules } from '@/lib/adminFeeRules';
import { store } from '@/routes/transaction';
import { update } from '@/routes/transaction';
import type { Transaction } from '@/types/transaction';
import type { BankType } from '@/types/transaction';
import InputCurrency from '../input-currency';
import InputField from '../InputField';
import { toastSuccess, toastError } from '../toastNotif';
import { Button } from '../ui/button';

type Props = {
   editId?: string;
   onSuccessCallBack: () => void;
};
export function TabTarikTunai({ editId = '', onSuccessCallBack }: Props) {
   // Ambil data master Bank
   const { transaksi, bankData } = usePage<{
      transaksi: { data: Transaction[] };
      bankData: BankType[];
   }>().props;

   /**
    * Mencari data berdasarkan props editId
    * return : Transaction | undefined
    */
   const editData = editId !== '' ? transaksi.data.find((x: Transaction) => x.id === editId) : undefined;

   const [nominal, setNominal] = useState(editData?.nominal ? String(editData?.nominal) : '');
   const [bankValue, setBankValue] = useState(editData?.bank.id ?? '');
   const [namaRek, setNamaRek] = useState(editData?.namaRek ?? '');

   const { setData, post, put } = useForm({
      bank_id: '',
      nominal: '0',
      jenis_transaksi: 'tarik_tunai',
      nama_rekening: '',
      biaya_admin: 0,
   });

   function validateData(onValidate: () => void) {
      if (bankValue == '') {
         return toastError('Bank tidak boleh kosong');
      } else if (nominal == '') {
         return toastError('Nominal tidak boleh kosong');
      } else {
         return onValidate();
      }
   }

   function submit(e: React.FormEvent) {
      e.preventDefault();
      setData('nominal', nominal);
      setData('bank_id', bankValue);
      setData('nama_rekening', namaRek);

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
            {/*  */}
            <div className="flex justify-between">
               <Field>
                  <FieldLabel htmlFor="username">
                     Tujuan Dana <span className="text-red-600">*</span>
                  </FieldLabel>
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
               <InputField
                  label="Nama Pengirim"
                  placeHolder="Nama tujuan"
                  onChange={(e) => setNamaRek(e.target.value)}
               />
            </div>
            <InputCurrency required initialValue={nominal} label="Nominal" handleInput={setNominal} />

            <InputCurrency disabled displayValue={adminFeeRules(nominal)} label="Admin" />

            <Field>
               <Button onClick={submit}>Submit</Button>
            </Field>
         </FieldGroup>
      </FieldSet>
   );
}
