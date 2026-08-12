import { DataTable } from '@/components/data_table/data-table';
import { columns } from '@/components/log-activity/column';

export default function LogActivity({ logactivity }: any) {
   return (
      <div>
         <DataTable columns={columns} data={logactivity.data}></DataTable>
      </div>
   );
}
