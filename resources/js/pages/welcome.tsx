import { Head, Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import dashboard from '@/routes/dashboard';
import type { Auth } from '@/types';

export default function Welcome() {
   const { auth } = usePage<{ auth: Auth }>().props;

   if (auth.user) {
      router.visit(dashboard.index());
   } else {
      router.visit(login());
   }

   return (
      <>
         <Head title="Welcome" />
         <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
            <Spinner className="size-21 text-foreground/50" />
         </div>
      </>
   );
}
