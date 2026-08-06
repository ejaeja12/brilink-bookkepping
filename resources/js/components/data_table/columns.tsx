import type { ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatRupiah } from '@/hooks/useFormatCurrency';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
   day: 'numeric',
   month: 'long',
   year: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
   timeZone: 'Asia/Jakarta', // atau 'UTC'
});

export type Payment = {
   jenis_transaksi: string;
   nominal: number;
   biaya_layanan: number;
   biaya_admin: number;
   created_at: string;
};

function transactionBadge(tr: string) {
   switch (tr) {
      case 'tarik_tunai':
         return 'Tarik Tunai';
      case 'setor_tunai':
         return 'Setor Tunai';
      default:
         return 'Pembayaran';
   }
}

export const columns = ({ onEdit }: { onEdit: (x: any) => void }): ColumnDef<Payment>[] => [
   {
      accessorKey: 'id',
   },
   {
      accessorKey: 'transaksi',
      header: 'Transaksi',
   },
   {
      accessorKey: 'jenis_transaksi',
      header: 'Jenis Transaksi',
      cell: ({ row }) => {
         return (
            <div className="w-full">
               <Badge
                  className={`w-1/2 ${row.getValue('jenis_transaksi') === 'tarik_tunai' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}
               >
                  {transactionBadge(row.getValue('jenis_transaksi'))}
               </Badge>
            </div>
         );
      },
   },
   {
      accessorKey: 'nominal',
      header: () => <div className="">Nominal</div>,
      cell: ({ row }) => {
         return (
            <div
               className={`${row.getValue('jenis_transaksi') == 'tarik_tunai' ? 'text-green-600' : 'text-black'} font-semibold`}
            >
               {row.getValue('jenis_transaksi') == 'tarik_tunai' ? '+ ' : '- '}
               {formatRupiah(row.getValue('nominal'))}
            </div>
         );
      },
   },
   {
      accessorKey: 'biaya_layanan',
      header: 'Biaya Layanan',
      cell: ({ row }) => {
         return (
            <div className={`${row.getValue('biaya_layanan') == null && 'font-semibold'}`}>
               {row.getValue('biaya_layanan') == null ? '-' : formatRupiah(row.getValue('biaya_layanan'))}
            </div>
         );
      },
   },
   {
      accessorKey: 'biaya_admin',
      header: 'Biaya Admin',
      cell: ({ row }) => {
         return (
            <div className={`${row.getValue('biaya_admin') == null && 'font-semibold'}`}>
               {row.getValue('biaya_admin') == null ? '-' : formatRupiah(row.getValue('biaya_admin'))}
            </div>
         );
      },
   },
   {
      accessorKey: 'created_at',
      header: 'Tanggal Transaksi',
      cell: ({ row }) => {
         return <div className="w-full">{timeFormatter.format(new Date(row.getValue('created_at')))}</div>;
      },
   },
   {
      id: 'actions',
      cell: ({ row }) => {
         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                     <span className="sr-only">Open menu</span>
                     <MoreHorizontal className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(row.getValue('id'))}>Edit</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         );
      },
   },
   // {
   //     accessorKey: 'email',
   //     header: ({ column }) => {
   //         return (
   //             <Button
   //                 variant="ghost"
   //                 onClick={() =>
   //                     column.toggleSorting(column.getIsSorted() === 'asc')
   //                 }
   //             >
   //                 Email
   //                 <ArrowUpDown className="ml-2 h-4 w-4" />
   //             </Button>
   //         );
   //     },
   // },
   // {
   //     accessorKey: 'amount',
   //     header: () => <div className="text-right">Amount</div>,
   //     cell: ({ row }) => {
   //         const amount = parseFloat(row.getValue('amount'));
   //         const formatted = new Intl.NumberFormat('en-US', {
   //             style: 'currency',
   //             currency: 'USD',
   //         }).format(amount);

   //         return <div className="text-right font-medium">{formatted}</div>;
   //     },
   // },
];
