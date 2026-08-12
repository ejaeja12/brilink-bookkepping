import { DataTable } from '@/components/data_table/data-table';
import InputSearch from '@/components/data_table/input-search';
import type { DateRange } from '@/components/date-picker';
import { DatePickerWithRange } from '@/components/date-picker';
import { columns } from '@/components/log-activity/column';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function LogActivity({ logactivity }: any) {
   function handleDate() {
      console.log('handleDate from log activity');
   }

   return (
      <div>
         <Card className="w-full border-2 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-xl">Log Activity</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
               {/* Deffered itu fungsi bawaan inertia, lazy load data*/}

               <DataTable
                  columns={columns}
                  data={logactivity.data}
                  filter={
                     <div className="flex w-fit flex-row gap-5">
                        <InputSearch onChanges={() => {}} />
                        <DatePickerWithRange onChange={handleDate}></DatePickerWithRange>
                     </div>
                  }
               />
               <div className="flex items-center justify-end space-x-2 py-4">
                  <Button variant="outline" size="sm" onClick={() => {}} disabled={true}>
                     Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {}} disabled={true}>
                     Next
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
