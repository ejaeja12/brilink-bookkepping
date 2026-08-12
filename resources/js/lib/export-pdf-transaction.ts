import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatRupiah } from '@/hooks/useFormatCurrency';

interface Transaction {
   transaksi: string;
   jenis_transaksi: string;
   nominal: number;
   biaya_layanan: number;
   biaya_admin: number;
   created_at: string;
}

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
   day: 'numeric',
   month: 'long',
   year: 'numeric',
   hour: '2-digit',
   minute: '2-digit',
   timeZone: 'Asia/Jakarta', // atau 'UTC'
});

export function exportPdf(data: Transaction[], periode: string) {
   const doc = new jsPDF();

   // Header
   doc.setFontSize(14);
   doc.text('Laporan Pembukuan', 14, 15);
   doc.setFontSize(10);
   doc.text(`Periode: ${periode}`, 14, 21);

   autoTable(doc, {
      startY: 26,
      head: [['Transaksi', 'Jenis Transaksi', 'Nominal', 'Biaya Layanan', 'Biaya Admin', 'Tanggal']],
      body: data.map((t) => [
         t.transaksi,
         t.jenis_transaksi,
         formatRupiah(t.nominal),
         formatRupiah(t.biaya_layanan),
         formatRupiah(t.biaya_admin),
         timeFormatter.format(new Date(t.created_at)),
      ]),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 9 },
      columnStyles: { 0: { cellWidth: 40 } },
      didDrawPage: (data) => {
         const totalPages = doc.internal.pages.length - 1;

         for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(
               `Halaman ${i} dari ${totalPages}`,
               doc.internal.pageSize.width - 35,
               doc.internal.pageSize.height - 10,
            );
         }
      },
   });

   // Total di akhir tabel
   const finalY = (doc as any).lastAutoTable.finalY || 26;
   doc.setFontSize(9);

   doc.save(`laporan-pembukuan-${periode}.pdf`);
}
