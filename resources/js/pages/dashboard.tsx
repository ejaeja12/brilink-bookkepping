import AdminFeeLineChart from '@/components/dashboard/adminfee-linechart';
import CardTotalNumber from '@/components/dashboard/card-total-number';
import RecentTransacation from '@/components/dashboard/recent-transaction-table';
import TotalTransactionBarChart from '@/components/dashboard/total-transaction-barchart';
import TransactionTypeBarChart from '@/components/dashboard/transaction-type-barchart';
import dashboard from '@/routes/dashboard';

export default function Dashboard({
   totalSumTransaction,
   recentTransaction,
   transactionCount,
   transactionTypeCount,
   adminFeeSum,
}: any) {
   return (
      <main className="flex min-h-screen flex-col gap-2">
         {/* Row 1 */}
         <section className="grid w-full grid-cols-12 justify-between gap-6">
            <div className="col-span-12 flex flex-col gap-7 lg:col-span-8">
               <CardTotalNumber className="" totalNumber={totalSumTransaction} />
               <div className="grid gap-2 lg:grid-cols-12 lg:gap-7">
                  <TotalTransactionBarChart className="col-span-6" transactionCount={transactionCount} />
                  <TransactionTypeBarChart className="col-span-6" transactionTypeCount={transactionTypeCount} />
               </div>
            </div>
            <RecentTransacation
               className="col-span-12 flex h-full lg:col-span-4"
               data={recentTransaction}
            ></RecentTransacation>
         </section>

         {/* Row 2 */}
         <section className="">
            <AdminFeeLineChart className="h-full" adminFee={adminFeeSum}></AdminFeeLineChart>
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
