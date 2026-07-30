import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormatCurrency, formatRupiah } from '@/hooks/useFormatCurrency';
import { adminFeeRules } from '@/lib/adminFeeRules';
import { store } from '@/routes/transaction';
import { update } from '@/routes/transaction';
import type { Transaction } from '@/types/transaction';
import type { BankType } from '@/types/transaction';
import InputField from '../InputField';
import { toastSuccess, toastError } from '../toastNotif';
import { Button } from '../ui/button';

type Props = {
   editId?: string;
   onSuccessCallBack: () => void;
};

export function TabSetorTunai({ editId = '', onSuccessCallBack }: Props) {
   // Ambil data master Bank
   const { transaksi, bankData } = usePage<{
      transaksi: { data: Transaction[] };
      bankData: BankType[];
   }>().props;

   /**
    * Mencari data berdasarkan props editId
    * @return {Transaction | undefined}
    */
   const editData = editId !== '' ? transaksi.data.find((x: Transaction) => x.id === editId) : undefined;

   const [formattedNominal, setFormattedNominal, rawValueNominal] = useFormatCurrency(editData?.nominal ?? 0);
   const [formattedServiceFee, setFormattedServiceFee, rawValueServiceFee] = useFormatCurrency(
      editData?.biaya_layanan ?? 0,
   );
   const [bankValue, setBankValue] = useState(editData?.bank.id ?? '');

   const { setData, post, put } = useForm({
      bank_id: '',
      nominal: 0,
      jenis_transaksi: 'setor_tunai',
      biaya_layanan: 0,
      biaya_admin: 0,
   });

   function validateData(onValidate: () => void) {
      if (bankValue == '') {
         return toastError('Bank tidak boleh kosong');
      } else if (rawValueNominal == 0) {
         return toastError('Nominal tidak boleh kosong');
      } else {
         return onValidate();
      }
   }

   function submit(e: React.FormEvent) {
      e.preventDefault();
      setData('nominal', rawValueNominal);
      setData('biaya_layanan', rawValueServiceFee);
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
      <form>
         <FieldSet className="flex w-full py-8">
            <FieldGroup className="w-full">
               <Field>
                  <FieldLabel htmlFor="username">Pilih Sumber Dana</FieldLabel>
                  <Select value={bankValue} onValueChange={setBankValue} required>
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
                  label="Nominal"
                  value={formattedNominal}
                  placeHolder="sd"
                  onChange={(e) => {
                     setFormattedNominal(e.target.value);
                  }}
               />

               <InputField
                  label="Biaya Layanan"
                  value={formattedServiceFee}
                  placeHolder="sd"
                  onChange={(e) => {
                     setFormattedServiceFee(e.target.value);
                  }}
               />

               <InputField label="Biaya Admin" disabled value={formatRupiah(adminFeeRules(rawValueNominal))} />

               <Field>
                  <Button onClick={submit}>Submit</Button>
               </Field>
            </FieldGroup>
         </FieldSet>
      </form>
   );
}
