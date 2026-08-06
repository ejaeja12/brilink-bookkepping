import type { ColumnDef } from '@tanstack/react-table';

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
   day: 'numeric',
   month: 'long',
   year: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
   timeZone: 'Asia/Jakarta',
});

export type activity = {
   user: string;
   activity: string;
   description: string;
   created_at: string;
};

export const columns: ColumnDef<activity>[] = [
   {
      accessorKey: 'id',
   },
   {
      accessorKey: 'user',
      header: 'User',
   },
   {
      accessorKey: 'activity',
      header: 'Activity',
   },
   {
      accessorKey: 'description',
      header: 'Description',
   },

   {
      accessorKey: 'created_at',
      header: 'Tanggal',
      cell: ({ row }) => {
         return <div className="w-full">{timeFormatter.format(new Date(row.getValue('created_at')))}</div>;
      },
   },
];
