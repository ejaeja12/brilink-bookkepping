import { usePage } from '@inertiajs/react';
import type { Transaction } from '@/types/transaction';
import { TabPembayaran } from './TabPembayaran';
import { TabSetorTunai } from './TabSetorTunai';
import { TabTarikTunai } from './TabTarikTunai';

type Props = {
   dataId: string;
   cb: () => void;
};

export default function FieldsEditTransaction({ dataId, cb }: Props) {
   const { transaksi } = usePage<{ transaksi: { data: Transaction[] } }>().props;

   const jenisTransaksiById = transaksi.data.find((x: Transaction) => x.id === dataId)?.jenis_transaksi;

   switch (jenisTransaksiById) {
      case 'pembayaran':
         return <TabPembayaran editId={dataId} onSuccessCallBack={cb}></TabPembayaran>;
      case 'setor_tunai':
         return <TabSetorTunai editId={dataId} onSuccessCallBack={cb}></TabSetorTunai>;
      case 'tarik_tunai':
         return <TabTarikTunai editId={dataId} onSuccessCallBack={cb}></TabTarikTunai>;
      default:
         return 'Loh kok iso';
   }
}
