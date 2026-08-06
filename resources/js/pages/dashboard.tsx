import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import dashboard from '@/routes/dashboard';

export default function Dashboard() {
   const { get } = useForm({
      name: 'John Doe',
   });

   function handleSubmit() {
      get(dashboard.index.url());
   }

   return (
      <>
         <h1>Dashboard</h1>
         <Button onClick={() => handleSubmit()}>tes param</Button>
      </>
   );
}

Dashboard.layout = {
   breadcrumbs: [
      {
         title: 'Dashboard',
         href: dashboard.index(),
      },
   ],
};
