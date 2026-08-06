import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import CardStatistic from '@/components/card_statistic';
import { columns } from '@/components/data_table/columns';
import { DataTable } from '@/components/data_table/data-table';
import InputSearch from '@/components/data_table/input-search';
import { DatePickerWithRange, type DateRange } from '@/components/date-picker';
import DialogInput from '@/components/DialogInput';
import FieldsEditTransaction from '@/components/input_transaction/FieldsEditTransaction';
import TabsCreateTransaction from '@/components/input_transaction/TabsCreateTransaction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/hooks/useFormatCurrency';
import transaction from '@/routes/transaction';

export default function Transaksi({ transaksi }: { transaksi: any }) {
   const [open, setOpen] = useState(false);
   const [editId, setEditId] = useState('');

   // tes search

   const { get, setData, data } = useForm({
      search: '',
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date()),
   });

   const { statistic } = usePage<{ statistic: any }>().props;

   useEffect(() => {
      const timeOut = setTimeout(() => {
         get(transaction.index.url(), { preserveState: true, only: ['transaksi'] });
      }, 500);

      return () => clearTimeout(timeOut);
   }, [data]);

   function formatDate(date: Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
   }

   function handleEditTogle(x: any) {
      setOpen(true);
      setEditId(x);
      console.log(x);
   }

   function handleCloseDialog() {
      setOpen(false);
      setEditId('');
   }

   function handleSearch(e: string) {
      setData('search', e);
   }

   function handleDate(e: DateRange) {
      if (e !== undefined) {
         setData('startDate', formatDate(e.from!));
         setData('endDate', formatDate(e.to!));
      }
   }

   return (
      <>
         <Head title="Dashboard" />
         <div className="flex flex-col gap-8">
            <div className="grid grid-cols-12 gap-4">
               <CardStatistic title="Saldo Keluar" content={formatRupiah(statistic.saldo_keluar)}></CardStatistic>
               <CardStatistic title="Saldo Masuk" content={formatRupiah(statistic.saldo_masuk)}></CardStatistic>
               <CardStatistic title="Admin Fee" content={formatRupiah(statistic.biaya_admin)}></CardStatistic>
            </div>

            {/* Table */}
            <Card className="w-full border-2 bg-white">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl">Transaksi</CardTitle>
                  <DialogInput
                     openState={open}
                     setCloseState={() => handleCloseDialog()}
                     trigger={
                        <Button onClick={() => setOpen(true)} size={'lg'} className="w-fit">
                           <Plus /> Buat Transaksi
                        </Button>
                     }
                  >
                     {editId !== '' ? (
                        <FieldsEditTransaction dataId={editId} cb={() => handleCloseDialog()} />
                     ) : (
                        <TabsCreateTransaction callBack={() => setOpen(false)} />
                     )}
                  </DialogInput>
               </CardHeader>
               <CardContent className="flex flex-col gap-5">
                  {/* Modal transaction */}
                  <div className="flex w-fit flex-row gap-5">
                     <InputSearch onChanges={(e) => handleSearch(e)} />
                     <DatePickerWithRange onChange={handleDate}></DatePickerWithRange>
                  </div>
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

Transaksi.layout = {
   breadcrumbs: [
      {
         title: 'Dashboard',
         href: transaction.index(),
      },
   ],
};
