import { usePage } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
export const description = 'A multiple bar chart';

const chartData = [
   { month: 'January', desktop: 186 },
   { month: 'February', desktop: 305 },
   { month: 'March', desktop: 237 },
   { month: 'April', desktop: 73 },
   { month: 'May', desktop: 209 },
   { month: 'June', desktop: 214 },
   { month: 'June', desktop: 214 },
];
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
      <Card className={`col-span-4 w-full bg-white ${className}`}>
         <CardHeader>
            <CardTitle>Bar Chart - Multiple</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
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

                     tickFormatter={(value) => value.slice(0, 5)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Bar dataKey="count" fill="var(--chart-1)" radius={4}>
                     <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                  </Bar>
               </BarChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
         </CardFooter>
      </Card>
   );
}
