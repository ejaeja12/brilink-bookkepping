import type { ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal } from 'lucide-react';
import { Pencil } from 'lucide-react';
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
      accessorKey: 'bank.name',
      header: 'Bank',
   },
   {
      accessorKey: 'nama_rekening',
      header: 'Nama Nasabah',
   },
   {
      accessorKey: 'jenis_transaksi',
      header: 'Jenis Transaksi',
      cell: ({ row }) => {
         return (
            <div className="w-full">
               <Badge
                  variant={'outline'}
                  className={`w-full border md:w-3/4 lg:w-20 ${row.getValue('jenis_transaksi') === 'tarik_tunai' ? 'border-green-500 text-foreground' : 'border-blue-500'}`}
               >
                  {transactionBadge(row.getValue('jenis_transaksi'))}
               </Badge>
            </div>
         );
      },
   },
   {
      accessorKey: 'jenis_pembayaran',
      header: 'Jenis Pembayaran',
      cell: ({ row }) => {
         return (
            <div className="flex w-full justify-center">
               {row.getValue('jenis_pembayaran') == null ? '-' : row.getValue('jenis_pembayaran')}
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
               className={`${row.getValue('jenis_transaksi') == 'tarik_tunai' ? 'text-green-600' : 'text-foreground'} font-semibold`}
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
