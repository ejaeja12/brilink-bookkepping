import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
   className?: string;
};
export function CardSkeleton({ className = '' }: Props) {
   return (
      <Card className={`w-full ${className}`}>
         <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
         </CardHeader>
         <CardContent>
            <Skeleton className="aspect-video max-h-48 w-full" />
         </CardContent>
      </Card>
   );
}
