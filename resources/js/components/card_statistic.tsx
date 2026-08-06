import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
   title: string;
   content: string;
};

export default function CardStatistic({ title, content }: Props) {
   return (
      <Card className="col-span-4 bg-white">
         <CardHeader>
            <CardTitle>{title}</CardTitle>
         </CardHeader>
         <CardContent className="">{content}</CardContent>
      </Card>
   );
}
