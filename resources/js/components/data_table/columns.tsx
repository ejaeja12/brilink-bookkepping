import { usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal, TrashIcon } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
   Popover,
   PopoverContent,
   PopoverDescription,
   PopoverHeader,
   PopoverTitle,
   PopoverTrigger,
} from '@/components/ui/popover';
// import {
//    DropdownMenu,
//    DropdownMenuContent,
//    DropdownMenuItem,
//    DropdownMenuLabel,
//    DropdownMenuSeparator,
//    DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
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
   user: { id: number; name: string };
   nama_rekening: string;
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

export const columns = ({
   onEdit,
   onDelete = (x: any) => {},
   isSuperAdmin = false,
}: {
   onEdit: (x: any) => void;
   onDelete: (x: any) => void;
   isSuperAdmin?: boolean;
}): ColumnDef<Payment>[] => [
   {
      accessorKey: 'id',
   },
   {
      accessorKey: 'transaksi',
      header: 'Transaksi',
      cell: ({ row }) => (
         <>
            <Popover>
               <PopoverTrigger>
                  <span className="hover:text-foreground! hover:underline">{row.getValue('transaksi')}</span>
               </PopoverTrigger>
               <PopoverContent align="start" className="bg-background">
                  <PopoverHeader>
                     <PopoverDescription className="text-foreground">
                        Created By : {row.original.user.name}
                     </PopoverDescription>
                  </PopoverHeader>
               </PopoverContent>
            </Popover>
         </>
      ),
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
   {
      id: 'actions',
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
         return (
            <div className="flex justify-center">
               <Button size="icon" variant="ghost" className="py-1" onClick={() => onEdit(row.getValue('id'))}>
                  <Pencil />
               </Button>
               {isSuperAdmin && (
                  <Button size="icon" variant="ghost" className="py-1" onClick={() => onDelete(row.getValue('id'))}>
                     <TrashIcon className="text-red-400" />
                  </Button>
               )}
            </div>
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
