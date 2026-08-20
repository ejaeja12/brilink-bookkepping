import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

type Props = {
   items?: NavItem[];
   reportItems?: NavItem[];
   masterItems?: NavItem[];
   logActivity?: NavItem[];
};

export function NavMain({ items = [], reportItems = [], masterItems = [], logActivity = [] }: Props) {
   const { isCurrentUrl } = useCurrentUrl();

   const { auth } = usePage<{ auth: any }>().props;
   const isRoleSuperAdmin = auth.role && auth?.role?.includes('super-admin');

   return (
      <SidebarGroup className="px-2 py-0">
         <SidebarGroupLabel>Platform</SidebarGroupLabel>
         <SidebarMenu>
            {items.map((item) => (
               <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isCurrentUrl(item.href)} tooltip={{ children: item.title }}>
                     <Link href={item.href} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
         <SidebarGroupLabel>Report</SidebarGroupLabel>
         <SidebarMenu>
            {reportItems.map((item) => (
               <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isCurrentUrl(item.href)} tooltip={{ children: item.title }}>
                     <Link href={item.href} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
         <SidebarGroupLabel>Log</SidebarGroupLabel>
         <SidebarMenu>
            {logActivity?.map((item) => (
               <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isCurrentUrl(item.href)} tooltip={{ children: item.title }}>
                     <Link href={item.href} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
         {/* master Data */}
         {isRoleSuperAdmin && (
            <>
               <SidebarGroupLabel>Master</SidebarGroupLabel>
               <SidebarMenu>
                  {masterItems?.map((item) => (
                     <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                           asChild
                           isActive={isCurrentUrl(item.href)}
                           tooltip={{ children: item.title }}
                        >
                           <Link href={item.href} prefetch>
                              {item.icon && <item.icon />}
                              <span>{item.title}</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  ))}
               </SidebarMenu>
            </>
         )}
      </SidebarGroup>
   );
}
