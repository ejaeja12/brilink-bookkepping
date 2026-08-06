import { Input } from '../ui/input';

type Props = {
   onChanges?: (e: string) => void;
};

export default function InputSearch({ onChanges }: Props) {
   return <Input placeholder="Search..." className="min-w-sm" onChange={(e) => onChanges?.(e.target.value)} />;
}
