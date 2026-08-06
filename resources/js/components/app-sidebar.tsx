import { Link } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';

import { NavMain } from '@/components/nav-main';

import {
   Sidebar,
   SidebarContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/ui/sidebar';
import dashboard from '@/routes/dashboard';
import banks from '@/routes/master-banks';
import masterPembayarans from '@/routes/master-pembayarans';
import transaction from '@/routes/transaction';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
   {
      title: 'Dashboard',
      href: dashboard.index(),
      icon: LayoutGrid,
   },
   {
      title: 'Transaksi',
      href: transaction.index(),
      icon: LayoutGrid,
   },
];

const masterDataItems: NavItem[] = [
   {
      title: 'Bank Data',
      href: banks.index(),
      icon: LayoutGrid,
   },
   {
      title: 'Pembayaran Data',
      href: masterPembayarans.index(),
      icon: LayoutGrid,
   },
];

const logActivity: NavItem[] = [
   {
      title: 'Log Activity',
      href: '/log-activity',
      icon: LayoutGrid,
   },
];

export function AppSidebar() {
   return (
      <Sidebar collapsible="icon" variant="inset">
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                     <Link href={dashboard.index()} prefetch>
                        <AppLogo />
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>

         <SidebarContent>
            <NavMain items={mainNavItems} masterItems={masterDataItems} logActivity={logActivity} />
         </SidebarContent>
      </Sidebar>
   );
}
