import { Input } from '../ui/input';

type Props = {
   onChanges?: (e: string) => void;
};

export default function InputSearch({ onChanges }: Props) {
   return <Input placeholder="Search..." className="max-w-xl" onChange={(e) => onChanges?.(e.target.value)} />;
}
