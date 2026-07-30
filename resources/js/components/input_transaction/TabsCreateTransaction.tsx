import { TabPembayaran } from '@/components/input_transaction/TabPembayaran';
import { TabSetorTunai } from '@/components/input_transaction/TabSetorTunai';
import { TabTarikTunai } from '@/components/input_transaction/TabTarikTunai';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TabsCreateTransaction({ callBack }: { callBack: () => void }) {
   return (
      <Tabs defaultValue="setor" className="w-full">
         <TabsList className="h-16! w-full gap-12" variant={'line'}>
            <TabsTrigger
               value="setor"
               className="rounded-3xl border-slate-400! after:opacity-0! hover:bg-slate-200 data-[state=active]:bg-blue-100!"
            >
               Setor
            </TabsTrigger>
            <TabsTrigger
               value="tarik"
               className="rounded-3xl border-slate-400! after:opacity-0! hover:bg-slate-200 data-[state=active]:bg-blue-100!"
            >
               Tarik
            </TabsTrigger>
            <TabsTrigger
               value="pembayaran"
               className="rounded-3xl border-slate-400! after:opacity-0! hover:bg-slate-200 data-[state=active]:bg-blue-100!"
            >
               Pembayaran
            </TabsTrigger>
         </TabsList>
         <TabsContent value="setor">
            <TabSetorTunai onSuccessCallBack={() => callBack()} />
         </TabsContent>
         <TabsContent value="tarik">
            <TabTarikTunai onSuccessCallBack={() => callBack()} />
         </TabsContent>
         <TabsContent value="pembayaran">
            <TabPembayaran onSuccessCallBack={() => callBack()} />
         </TabsContent>
      </Tabs>
   );
}
