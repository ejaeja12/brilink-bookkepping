import AdminFeeLineChart from '@/components/dashboard/adminfee-linechart';
import BankBarChart from '@/components/dashboard/bank-barchart';
import CardTotalNumber from '@/components/dashboard/card-total-number';
import RecentTransacation from '@/components/dashboard/recent-transaction-table';
import TransactionTypeBarChart from '@/components/dashboard/transaction-type-barchart';
import dashboard from '@/routes/dashboard';

export default function Dashboard() {
   return (
      <main className="flex min-h-screen flex-col gap-2">
         {/* Row 1 */}
         <section className="grid w-full grid-cols-12 justify-between gap-6">
            <div className="col-span-12 flex flex-col gap-7 lg:col-span-8">
               <CardTotalNumber className=""></CardTotalNumber>
               <div className="grid gap-2 lg:grid-cols-12 lg:gap-7">
                  <TransactionTypeBarChart className="col-span-6"></TransactionTypeBarChart>
                  <BankBarChart className="col-span-6"></BankBarChart>
               </div>
            </div>
            <RecentTransacation className="col-span-12 flex h-full lg:col-span-4"></RecentTransacation>
         </section>

         {/* Row 2 */}
         <section className="">
            <AdminFeeLineChart className="h-full"></AdminFeeLineChart>
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
