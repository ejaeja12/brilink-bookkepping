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
import { dashboard } from '@/routes';
import banks from '@/routes/master-banks';
import masterPembayarans from '@/routes/master-pembayarans';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
   {
      title: 'Dashboard',
      href: dashboard(),
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

export function AppSidebar() {
   return (
      <Sidebar collapsible="icon" variant="inset">
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                     <Link href={dashboard()} prefetch>
                        <AppLogo />
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>

         <SidebarContent>
            <NavMain items={mainNavItems} masterItems={masterDataItems} />
         </SidebarContent>
      </Sidebar>
   );
}
