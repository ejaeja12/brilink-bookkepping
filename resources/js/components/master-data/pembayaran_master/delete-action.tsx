import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { toastSuccess } from '@/components/toastNotif';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/hooks/useFormatCurrency';
import datamasterPembayarans from '@/routes/datamaster-pembayarans';

type dataPembayaranType = {
   id: string;
   name: string;
};

type Props = {
   id: string;
   handleCb: () => void;
};

export default function DeleteAction({ id, handleCb }: Props) {
   const { dataPembayaran } = usePage<{
      dataPembayaran: dataPembayaranType[];
   }>().props;

   const deleteData = id !== '' ? dataPembayaran.find((x: dataPembayaranType) => x.id === id) : undefined;
   function handleDelete() {
      router.delete(datamasterPembayarans.destroy.url(id), {
         onSuccess: () => {
            handleCb();
            toastSuccess('Transaction deleted successfully');
         },
      });
   }

   return (
      <>
         <main className="flex flex-col gap-12 p-12 pb-5">
            <div className="text-center">{deleteData && `Nama Pembayaran :  ${deleteData.name}`}</div>

            <div className="flex w-full justify-center">Anda yakin ingin menghapus pembayaran ini?</div>
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
