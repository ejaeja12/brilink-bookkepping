import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';

import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
   breadcrumbs = [],
   children,
}: {
   breadcrumbs?: BreadcrumbItem[];
   children: React.ReactNode;
}) {
   return (
      <div>
         <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <div className="p-2 min-[375px]:p-3 md:p-5">{children}</div>
         </AppLayoutTemplate>
      </div>
   );
}
