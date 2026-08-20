import type { ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type PembayaranData = {
   id: string;
   name: string;
};

export const pembayaranColumn = ({ actionEdit }: { actionEdit: (e: string) => void }): ColumnDef<PembayaranData>[] => [
   {
      accessorKey: 'id',
      // header: () => <div className="hidden w-0">ID</div>,
      // cell: () => <div className="hidden w-0">ID</div>,
   },
   {
      accessorKey: 'name',
      header: 'Name',
   },

   {
      id: 'actions',
      header: () => <div className="">Actions</div>,
      cell: ({ row }) => {
         return (
            <Button size="icon" variant="ghost" className="py-1" onClick={() => actionEdit(row.getValue('id'))}>
               <Pencil />
            </Button>
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
