import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { router, Deferred } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import CardStatistic from '@/components/card_statistic';
import { columns } from '@/components/data_table/columns';
import { DataTable } from '@/components/data_table/data-table';
import InputSearch from '@/components/data_table/input-search';
import DialogInput from '@/components/DialogInput';
import FieldsEditTransaction from '@/components/input-transaction/FieldsEditTransaction';
import TabsCreateTransaction from '@/components/input-transaction/TabsCreateTransaction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { formatRupiah } from '@/hooks/useFormatCurrency';
import transaction from '@/routes/transaction';

export default function Transaksi({ transaksi }: { transaksi: any }) {
   const [open, setOpen] = useState(false);
   const [editId, setEditId] = useState('');
   const [search, setSearch] = useState('');
   const [dayFilter, setDayFilter] = useState('');

   const { statistic } = usePage<{ statistic: any }>().props;

   useEffect(() => {
      const x: Record<string, any> = {};

      if (search !== '') {
         x['search'] = search;
      }

      if (dayFilter !== '') {
         x['days'] = dayFilter;
      }

      const timeOut = setTimeout(() => {
         router.get(transaction.index.url(), x, {
            preserveState: true,
            preserveScroll: true,
            only: ['transaksi', 'statistic'],
         });
      }, 300);

      return () => clearTimeout(timeOut);
   }, [search, dayFilter]);

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
      setSearch(e);
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
                  {/* Deffered itu fungsi bawaan inertia, lazy load data*/}
                  <Deferred data="transaksi" fallback={<div>Loading...</div>}>
                     {transaksi && (
                        <>
                           <DataTable
                              columns={columns({
                                 onEdit: (columnData) => handleEditTogle(columnData),
                              })}
                              data={transaksi.data}
                              filter={
                                 <div className="flex w-fit flex-row gap-5">
                                    <InputSearch onChanges={(e) => handleSearch(e)} />
                                    <Select value={dayFilter} onValueChange={(e) => setDayFilter(e)} required>
                                       <SelectTrigger className="w-full max-w-48">
                                          <SelectValue placeholder="Today" />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectGroup>
                                             <SelectItem value="">Today</SelectItem>
                                             <SelectItem value="3d">3 Hari</SelectItem>
                                             <SelectItem value="w">1 Minggu</SelectItem>
                                             <SelectItem value="m">1 Bulan</SelectItem>
                                          </SelectGroup>
                                       </SelectContent>
                                    </Select>
                                 </div>
                              }
                           />
                           <div className="flex items-center justify-end space-x-2 py-4">
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() =>
                                    router.get(transaksi.links.prev, {}, { preserveState: true, preserveScroll: true })
                                 }
                                 disabled={transaksi.links.prev === null ? true : false}
                              >
                                 Previous
                              </Button>
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() =>
                                    router.get(transaksi.links.next, {}, { preserveState: true, preserveScroll: true })
                                 }
                                 disabled={transaksi.links.next === null ? true : false}
                              >
                                 Next
                              </Button>
                           </div>
                        </>
                     )}
                  </Deferred>
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
