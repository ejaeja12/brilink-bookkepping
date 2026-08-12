import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Props = {
   className?: string;
};
export default function CardTotalNumber({ className = '' }: Props) {
   return (
      <Card className={`col-span-4 w-full bg-white ${className}`}>
         <CardHeader>
            <CardTitle>Card Total Number</CardTitle>
         </CardHeader>
         <CardContent className="grid h-full w-full grid-cols-2 items-center justify-between lg:grid-cols-3">
            <div className="col-span-1 flex flex-col">
               <span className="text-[0.8rem] font-bold lg:text-lg">Saldo Masuk</span>
               <span className="text-[0.8rem] lg:text-lg">Rp. 1.000.000</span>
            </div>
            <div className="col-span-1 flex flex-col">
               <span className="text-[0.8rem] font-bold lg:text-lg">Saldo Masuk</span>
               <span className="text-[0.8rem] lg:text-lg">Rp. 1.000.000</span>
            </div>
            <div className="col-span-1 flex flex-col">
               <span className="text-[0.8rem] font-bold lg:text-lg">Saldo Masuk</span>
               <span className="text-[0.8rem] lg:text-lg">Rp. 1.000.000</span>
            </div>
         </CardContent>
      </Card>
   );
}
