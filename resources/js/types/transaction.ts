export type BankType = {
    id: string;
    name: string;
};

export type PembayaranType = {
    id: string;
    name: string;
};

export type Transaction = {
    id: string;
    transaksi: string;
    jenis_transaksi: string;
    jenis_pembayaran?: string;
    bank: BankType;
    nominal: number;
    biaya_layanan: number;
    biaya_admin: number;
    created_at: string;
};
