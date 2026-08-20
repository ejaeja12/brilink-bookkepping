import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import {
   BanknoteIcon,
   FileText,
   Landmark,
   HandCoinsIcon,
   LibraryBigIcon,
   LayoutDashboardIcon,
   UserPen,
} from 'lucide-react';
import { useEffect } from 'react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { useSidebar } from '@/components/ui/sidebar';

import {
   Sidebar,
   SidebarContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/ui/sidebar';
import dashboard from '@/routes/dashboard';
import datamasterAkun from '@/routes/datamaster-akun';
import datamasterBanks from '@/routes/datamaster-banks';
import datamasterPembayarans from '@/routes/datamaster-pembayarans';
import reporttransaction from '@/routes/reporttransaction';
import transaction from '@/routes/transaction';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
   {
      title: 'Dashboard',
      href: dashboard.index(),
      icon: LayoutDashboardIcon,
   },
   {
      title: 'Transaksi',
      href: transaction.index(),
      icon: BanknoteIcon,
   },
];
const reportNavItems: NavItem[] = [
   {
      title: 'Laporan Transaksi',
      href: reporttransaction.index(),
      icon: FileText,
   },
];
const masterDataItems: NavItem[] = [
   {
      title: 'Bank',
      href: datamasterBanks.index(),
      icon: Landmark,
   },
   {
      title: 'Pembayaran',
      href: datamasterPembayarans.index(),
      icon: HandCoinsIcon,
   },
   {
      title: 'Manajemen Akun',
      href: datamasterAkun.index(),
      icon: UserPen,
   },
];

const logActivity: NavItem[] = [
   {
      title: 'Log Activity',
      href: '/log-activity',
      icon: LibraryBigIcon,
   },
];

export function AppSidebar() {
   const { setOpenMobile, isMobile } = useSidebar();

   useEffect(() => {
      return router.on('navigate', () => {
         if (isMobile) {
            setOpenMobile(false);
         }
      });
   }, [isMobile]);

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
            <NavMain
               items={mainNavItems}
               reportItems={reportNavItems}
               masterItems={masterDataItems}
               logActivity={logActivity}
            />
         </SidebarContent>
      </Sidebar>
   );
}
