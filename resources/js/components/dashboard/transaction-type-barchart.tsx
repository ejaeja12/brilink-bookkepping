import { usePage } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
export const description = 'A multiple bar chart';

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
   day: 'numeric',
   month: 'short',
   timeZone: 'Asia/Jakarta',
});
const chartConfig = {
   desktop: {
      label: 'Desktop',
      color: 'var(--chart-1)',
   },
   mobile: {
      label: 'Mobile',
      color: 'var(--chart-2)',
   },
} satisfies ChartConfig;

type TransactionType = {
   date: string;
   setor_tunai: number;
   tarik_tunai: number;
   transfer_bank: number;
};
type Props = {
   className?: string;
};
export default function TransactionTypeBarChart({ className = '' }: Props) {
   const transactionTypeCount = usePage<{ transactionTypeCount: TransactionType[] }>().props.transactionTypeCount;

   return (
      <Card className={`col-span-4 max-h-full w-full bg-card ${className}`}>
         <CardHeader>
            <CardTitle>Total Jenis Transaksi</CardTitle>
            <CardDescription>7 Hari terakhir</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <BarChart accessibilityLayer data={transactionTypeCount}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="date"
                     tickLine={false}
                     tickMargin={10}
                     axisLine={false}
                     tickFormatter={(value) => timeFormatter.format(new Date(value))}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Bar dataKey="tarik_tunai" fill="var(--color-mobile)" radius={4} />
                  <Bar dataKey="setor_tunai" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="pembayaran" fill="var(--color-chart-3)" radius={4} />
               </BarChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
      </Card>
   );
}
