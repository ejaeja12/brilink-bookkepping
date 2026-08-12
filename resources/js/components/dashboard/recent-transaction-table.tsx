import { Link } from '@inertiajs/react';
import transaction from '@/routes/transaction';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Props = {
   className?: string;
};

export default function RecentTransacation({ className = '' }: Props) {
   return (
      <Card className={`col-span-4 w-full gap-1 bg-white ${className}`}>
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
         <CardContent className="mt-0 flex flex-col gap-2 overflow-auto p-3 min-[1024px]:max-h-[24rem] min-[1280px]:max-h-[26rem] min-[1500px]:max-h-[30rem] xl:p-4 xl:py-2">
            <div className="flex flex-col gap-4 rounded-lg border border-slate-300 p-3 xl:p-5 xl:py-3">
               <div className="flex flex-col">
                  <span className="text-[0.9rem]">Tarik Tunai Rp. 1.000.000 ke BRI</span>
                  <span className="text-[0.8rem] text-slate-500">kamis 30 juli, pukul 15:00</span>
               </div>

               <div className="flex w-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                     <span className="text-[0.8rem]">Biaya layanan</span>
                     <span className="text-[0.8rem]">Rp. 2.000</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[0.8rem]">admin fee</span>
                     <span className="text-end text-[0.8rem]">Rp. 3.000</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-slate-300 p-3 xl:p-5 xl:py-3">
               <div className="flex flex-col">
                  <span className="text-[0.9rem]">Pembayaran BRIVA VIA GOPAY - Rp.1000.000</span>
                  <span className="text-[0.8rem] text-slate-500">kamis 30 juli, pukul 15:00</span>
               </div>

               <div className="flex w-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                     <span className="text-[0.8rem]">Biaya layanan</span>
                     <span className="text-[0.8rem]">Rp. 2.000</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[0.8rem]">admin fee</span>
                     <span className="text-end text-[0.8rem]">Rp. 3.000</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-slate-300 p-3 xl:p-5 xl:py-3">
               <div className="flex flex-col">
                  <span className="text-[0.9rem]">Pembayaran BRIVA VIA GOPAY - Rp.1000.000</span>
                  <span className="text-[0.8rem] text-slate-500">kamis 30 juli, pukul 15:00</span>
               </div>

               <div className="flex w-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                     <span className="text-[0.8rem]">Biaya layanan</span>
                     <span className="text-[0.8rem]">Rp. 2.000</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[0.8rem]">admin fee</span>
                     <span className="text-end text-[0.8rem]">Rp. 3.000</span>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg border border-slate-300 p-3 xl:p-5 xl:py-3">
               <div className="flex flex-col">
                  <span className="text-[0.9rem]">Pembayaran BRIVA VIA GOPAY - Rp.1000.000</span>
                  <span className="text-[0.8rem] text-slate-500">kamis 30 juli, pukul 15:00</span>
               </div>

               <div className="flex w-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                     <span className="text-[0.8rem]">Biaya layanan</span>
                     <span className="text-[0.8rem]">Rp. 2.000</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[0.8rem]">admin fee</span>
                     <span className="text-end text-[0.8rem]">Rp. 3.000</span>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
