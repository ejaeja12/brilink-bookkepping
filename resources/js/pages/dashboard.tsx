import { Deferred } from '@inertiajs/react';
import AdminFeeLineChart from '@/components/dashboard/adminfee-linechart';
import CardTotalNumber from '@/components/dashboard/card-total-number';
import RecentTransacation from '@/components/dashboard/recent-transaction-table';
import TotalTransactionBarChart from '@/components/dashboard/total-transaction-barchart';
import TransactionTypeBarChart from '@/components/dashboard/transaction-type-barchart';
import dashboard from '@/routes/dashboard';

export default function Dashboard() {
   return (
      <main className="flex min-h-screen flex-col gap-2">
         {/* Row 1 */}
         <section className="grid w-full grid-cols-12 justify-between gap-6">
            <div className="col-span-12 flex flex-col gap-7 lg:col-span-8">
               <Deferred data={'totalSumTransaction'} fallback={<div>Loading...</div>}>
                  <CardTotalNumber className="" />
               </Deferred>
               <div className="grid gap-2 lg:grid-cols-12 lg:gap-7">
                  <Deferred data="transactionCount" fallback={<div>Loading...</div>}>
                     <TotalTransactionBarChart className="col-span-6" />
                  </Deferred>
                  <Deferred data={'transactionTypeCount'} fallback={<div>Loading...</div>}>
                     <TransactionTypeBarChart className="col-span-6" />
                  </Deferred>
               </div>
            </div>
            <Deferred data={'recentTransaction'} fallback={<div>Loading...</div>}>
               <RecentTransacation className="col-span-12 flex h-full lg:col-span-4"></RecentTransacation>
            </Deferred>
         </section>

         {/* Row 2 */}
         <section className="">
            <Deferred data={'adminFeeSum'} fallback={<div>Loading...</div>}>
               <AdminFeeLineChart className="h-full"></AdminFeeLineChart>
            </Deferred>
         </section>
      </main>
   );
}

Dashboard.layout = {
   breadcrumbs: [
      {
         title: 'Dashboard',
         href: dashboard.index(),
      },
   ],
};
