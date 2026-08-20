import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { formatRupiah } from '@/hooks/useFormatCurrency';
import transaction from '@/routes/transaction';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type RecentTransaction = {
   transaksi: string;
   biaya_layanan: number;
   biaya_admin: number;
   nominal: number;
   created_at: string;
};

type Props = {
   className?: string;
};
const timeFormatter = new Intl.DateTimeFormat('id-ID', {
   day: 'numeric',
   month: 'long',
   year: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
   timeZone: 'Asia/Jakarta', // atau 'UTC'
});
export default function RecentTransacation({ className = '' }: Props) {
   const data = usePage<{ recentTransaction: RecentTransaction[] }>().props.recentTransaction;

   return (
      <Card className={`col-span-4 w-full gap-1 bg-card ${className}`}>
         <CardHeader className="flex w-full flex-row justify-between">
            <CardTitle className="content-center">
               <span>Recent Transaction</span>
            </CardTitle>
            <Link href={transaction.index.url()}>
               <Button className="py-0" size={'sm'}>
                  <span className="">See all</span>
               </Button>
            </Link>
         </CardHeader>
         <CardContent className="mt-0 flex flex-col gap-2 overflow-auto p-3 min-[1024px]:max-h-[22rem] min-[1280px]:max-h-[24rem] min-[1500px]:max-h-[28rem] xl:p-4 xl:py-2">
            {data !== undefined &&
               data.map((val) => (
                  <div className="flex flex-col gap-4 rounded-lg border-2 border-border p-3 xl:p-5 xl:py-3">
                     <div className="flex flex-col">
                        <span className="text-[0.9rem]">{`${val.transaksi} sebesar ${formatRupiah(val.nominal)}`}</span>
                        <span className="text-[0.8rem] text-slate-500">
                           {timeFormatter.format(new Date(val.created_at))}
                        </span>
                     </div>

                     <div className="flex w-full flex-col justify-between">
                        <div className="flex items-center justify-between">
                           <span className="text-[0.8rem]">Biaya layanan</span>
                           <span className="text-[0.8rem]">{formatRupiah(val.biaya_layanan)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-[0.8rem]">admin fee</span>
                           <span className="text-end text-[0.8rem]">{formatRupiah(val.biaya_admin)}</span>
                        </div>
                     </div>
                  </div>
               ))}
         </CardContent>
      </Card>
   );
}
