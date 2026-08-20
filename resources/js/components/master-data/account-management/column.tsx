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

export type RoleType = {
   role_id: string;
   role_name: string;
};

export type UserRoleType = {
   id: string;
   name: string;
   email: string;
   status: 'active' | 'nonactive';
   roles: RoleType[];
};

export type BankData = {
   id: string;
   name: string;
   status: string;
};

function statusBadge(tr: string) {
   switch (tr) {
      case 'active':
         return 'Active';
      case 'nonactive':
         return 'Non Active';
      default:
         return 'Pembayaran';
   }
}

export const accountManagementColumn = ({
   actionEdit,
}: {
   actionEdit: (e: string) => void;
}): ColumnDef<UserRoleType>[] => [
   {
      accessorKey: 'id',
      // header: () => <div className="hidden w-0">ID</div>,
      // cell: () => <div className="hidden w-0">ID</div>,
   },
   {
      accessorKey: 'name',
      header: () => {
         return (
            <div className="flex w-full justify-center">
               <span className="w-1/4 font-semibold">Nama</span>
            </div>
         );
      },
      cell: ({ row }) => {
         return (
            <div className="flex w-full justify-center">
               <span className="w-1/4">{row.getValue('name')}</span>
            </div>
         );
      },
   },
   {
      accessorKey: 'roles',
      header: () => {
         return (
            <div className="flex w-full justify-center">
               <span className="w-1/4 font-semibold">Role</span>
            </div>
         );
      },
      cell: ({ row }) => {
         const role: RoleType[] = row.getValue('roles');

         return (
            <div className="flex w-full justify-center">
               <span className="w-1/4">{role.map((r) => r.role_name).join(', ')}</span>
            </div>
         );
      },
   },
   {
      accessorKey: 'status',
      header: () => {
         return (
            <div className="flex w-full justify-center">
               <span className="w-1/4 text-center font-semibold">Status</span>
            </div>
         );
      },
      cell: ({ row }) => {
         return (
            <div className="flex w-full justify-center">
               <Badge
                  variant={'outline'}
                  className={`border lg:w-1/4 ${row.getValue('status') === 'active' ? 'border-blue-500' : 'border-slate-500'}`}
               >
                  {statusBadge(row.getValue('status'))}
               </Badge>
            </div>
         );
      },
   },

   {
      id: 'actions',
      header: () => <div className="w-1/4 font-semibold">Actions</div>,
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
