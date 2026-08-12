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

export const bankColumn = ({
    actionEdit,
}: {
    actionEdit: (e: string) => void;
}): ColumnDef<BankData>[] => [
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
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            return (
                <div className="w-full">
                    <Badge
                        className={`w-1/2 ${row.getValue('status') === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'}`}
                    >
                        {statusBadge(row.getValue('status'))}
                    </Badge>
                </div>
            );
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
                        <DropdownMenuItem
                            onClick={() => {
                                actionEdit(row.getValue('id'));
                            }}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>
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
