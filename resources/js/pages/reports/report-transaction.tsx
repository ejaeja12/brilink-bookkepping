import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useHttp } from '@inertiajs/react';
import { FileDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { columns } from '@/components/data_table/columns';
import { DataTable } from '@/components/data_table/data-table';
import InputSearch from '@/components/data_table/input-search';
import type { DateRange } from '@/components/date-picker';
import { DatePickerWithRange } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { exportPdf } from '@/lib/export-pdf-transaction';
import reporttransaction from '@/routes/reporttransaction';

export default function ReportTransaction({ transaksi }: { transaksi: any }) {
   const [search, setSearch] = useState('');
   const [dayFilter, setDayFilter] = useState({
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date()),
   });

   const { setData, get } = useHttp({
      search: '',
      startdate: '',
      enddate: '',
   });

   useEffect(() => {
      const x: Record<string, any> = {};

      if (search !== '') {
         x['search'] = search;
      }

      if (dayFilter.startDate !== '' && dayFilter.endDate !== '') {
         x['startdate'] = dayFilter.startDate;
         x['enddate'] = dayFilter.endDate;
      }

      const timeOut = setTimeout(() => {
         router.get(reporttransaction.index.url(), x, {
            preserveState: true,
            preserveScroll: true,
            only: ['transaksi'],
         });
      }, 300);

      return () => clearTimeout(timeOut);
   }, [search, dayFilter]);

   function formatDate(date: Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
   }

   function handleEditTogle() {}

   function handleDate(e: DateRange) {
      if (e !== undefined) {
         setDayFilter({
            startDate: formatDate(e.from!),
            endDate: formatDate(e.to!),
         });
      }
   }

   function handleSearch(e: string) {
      setSearch(e);
   }

   function handleGeneratePdf() {
      setData('search', search);
      setData('startdate', dayFilter.startDate);
      setData('enddate', dayFilter.endDate);
      get(reporttransaction.createReport.url(), {
         onSuccess: (response: any) => {
            if (response?.data) {
               exportPdf(response?.data, `${dayFilter.startDate} - ${dayFilter.endDate}`);
            }
         },
      });
   }

   return (
      <>
         <Head title="Dashboard" />
         <div className="flex flex-col gap-8">
            {/* Table */}
            <Card className="w-full border-2 bg-card">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl">Transaksi</CardTitle>
                  <Button variant={'secondary'} onClick={() => handleGeneratePdf()}>
                     <FileDown />
                     export
                  </Button>
               </CardHeader>
               <CardContent className="flex flex-col gap-5">
                  {/* Modal transaction */}

                  <DataTable
                     columns={columns({
                        onEdit: () => handleEditTogle(),
                     })}
                     data={transaksi.data}
                     filter={
                        <div className="flex w-fit flex-row gap-5">
                           <InputSearch onChanges={(e) => handleSearch(e)} />
                           <DatePickerWithRange onChange={handleDate}></DatePickerWithRange>
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
               </CardContent>
            </Card>
         </div>
      </>
   );
}

ReportTransaction.layout = {
   breadcrumbs: [
      {
         title: 'Dashboard',
         href: reporttransaction.index(),
      },
   ],
};
