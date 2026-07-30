import { Dialog, DialogContent } from '@/components/ui/dialog';

type Props = {
   children: React.ReactNode;
   trigger?: React.ReactNode;
   openState: boolean;
   setCloseState: () => void;
};

export default function DialogInput({
   children,
   trigger,
   openState,

   setCloseState,
}: Props) {
   return (
      <Dialog open={openState} onOpenChange={setCloseState}>
         {trigger}
         <DialogContent>{children}</DialogContent>
      </Dialog>
   );
}
