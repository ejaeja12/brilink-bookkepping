import { usePage } from '@inertiajs/react';
import { formatRupiah } from '@/hooks/useFormatCurrency';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type TotalNumberProps = {
   totalTransaction: number;
   saldoMasuk: number;
   saldoKeluar: number;
   totalAdminFee: number;
};

type Props = {
   className?: string;
};
export default function CardTotalNumber({ className = '' }: Props) {
   const totalNumber = usePage<{ totalNumber: TotalNumberProps }>().props.totalSumTransaction;

   return (
      <Card className={`col-span-4 w-full bg-white ${className}`}>
         <CardHeader>
            <CardTitle>Card Total Number</CardTitle>
         </CardHeader>
         <CardContent className="grid h-full w-full grid-cols-2 items-center justify-between lg:grid-cols-4">
            <div className="col-span-1 flex flex-col">
               <span className="text-center text-[0.8rem] font-bold lg:text-lg">Total Transakis</span>
               <span className="text-center text-[0.8rem] lg:text-lg">{totalNumber.totalTransaction}</span>
            </div>
            <div className="col-span-1 flex flex-col">
               <span className="text-center text-[0.8rem] font-bold lg:text-lg">Saldo Keluar</span>
               <span className="text-center text-[0.8rem] lg:text-lg">{formatRupiah(totalNumber.saldoKeluar)}</span>
            </div>
            <div className="col-span-1 flex flex-col">
               <span className="text-center text-[0.8rem] font-bold lg:text-lg">Saldo Masuk</span>
               <span className="text-center text-[0.8rem] lg:text-lg">{formatRupiah(totalNumber.saldoMasuk)}</span>
            </div>
            <div className="col-span-1 flex flex-col">
               <span className="text-center text-[0.8rem] font-bold lg:text-lg">Admin Fee</span>
               <span className="text-center text-[0.8rem] lg:text-lg">{formatRupiah(totalNumber.totalAdminFee)}</span>
            </div>
         </CardContent>
      </Card>
   );
}
