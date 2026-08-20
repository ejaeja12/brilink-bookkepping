import { usePage } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
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
   count: {
      label: 'Count',
      color: 'var(--chart-desktop)',
   },
} satisfies ChartConfig;

type TransactionCountType = {
   date: string;
   count: number;
};
type Props = {
   className?: string;
};
export default function TotalTransactionBarChart({ className = '' }: Props) {
   const transactionCount = usePage<{ transactionCount: TransactionCountType[] }>().props.transactionCount;

   return (
      <Card className={`col-span-4 w-full bg-card ${className}`}>
         <CardHeader>
            <CardTitle>Total Transaksi</CardTitle>
            <CardDescription>7 Hari terakhir</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <BarChart
                  accessibilityLayer
                  data={transactionCount}
                  margin={{
                     top: 20,
                  }}
               >
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="date"
                     tickLine={false}
                     tickMargin={11}
                     axisLine={false}

                     tickFormatter={(value) => timeFormatter.format(new Date(value))}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Bar dataKey="count" fill="var(--chart-1)" radius={4}>
                     <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                  </Bar>
               </BarChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
      </Card>
   );
}
