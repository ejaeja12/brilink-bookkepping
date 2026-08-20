import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { toastSuccess } from '@/components/toastNotif';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/hooks/useFormatCurrency';
import transaction from '@/routes/transaction';
import type { Transaction } from '@/types/transaction';

type Props = {
   id: string;
   handleCb: () => void;
};

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
   day: 'numeric',
   month: 'long',
   year: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
   timeZone: 'Asia/Jakarta', // atau 'UTC'
});

export default function DeleteAction({ id, handleCb }: Props) {
   const { transaksi } = usePage<{
      transaksi: { data: Transaction[] };
   }>().props;

   const deleteData = id !== '' ? transaksi.data.find((x: Transaction) => x.id === id) : undefined;
   function handleDelete() {
      router.delete(transaction.destroy.url(id), {
         onSuccess: () => {
            handleCb();
            toastSuccess('Transaction deleted successfully');
         },
      });
   }

   return (
      <>
         <main className="flex flex-col gap-12 p-12 pb-5">
            <div className="text-center">
               {deleteData &&
                  `${deleteData.transaksi}, Nominal : ${formatRupiah(deleteData.nominal)}, Tanggal Transaksi :  ${timeFormatter.format(new Date(deleteData.created_at))}`}
            </div>

            <div className="flex w-full justify-center">Anda yakin ingin menghapus transaksi?</div>
            <div className="flex w-full justify-center gap-8">
               <Button onClick={handleCb}>Cancel</Button>
               <Button onClick={handleDelete} className="bg-red-400">
                  Delete
               </Button>
            </div>
         </main>
      </>
   );
}
