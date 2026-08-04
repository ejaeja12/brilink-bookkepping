import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from './ui/field';

type InputFieldProps = {
   hidden?: boolean;
   label: string;
   className?: string;
   initialValue?: string | number;
   displayValue?: string | number | undefined;
   disabled?: boolean;
   placeHolder?: string;
   handleInput?: ((e: string) => void) | undefined;
};

const formatRupiah = (number: string) => {
   return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(parseInt(number));
};

/**
 * mengembalikan value berupa angka (nominal) tanpa character2 selain angka dalam bentuk string
 * @param str
 * @returns string
 */
const removeNonDigits = (str: string | number) => {
   str = String(str);
   const formatted = str.replace(/[^0-9]/g, '');

   if (formatted === null || formatted === '') {
      return '0';
   }

   return formatted;
};

export default function InputCurrency({
   hidden = false,
   label,
   initialValue = '0',
   displayValue = undefined,
   className = '',
   disabled = false,
   placeHolder = '',
   handleInput = undefined,
}: InputFieldProps) {
   const [nominal, setNominal] = useState(String(initialValue));
   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setNominal(e.target.value);

      if (handleInput !== undefined) {
         handleInput(removeNonDigits(e.target.value));
      }
   }

   return (
      <>
         <Field hidden={hidden}>
            <FieldLabel htmlFor="username">{label}</FieldLabel>
            <Input
               id="username"
               disabled={disabled}
               type="text"
               hidden={hidden}
               maxLength={14}
               value={formatRupiah(removeNonDigits(displayValue ?? nominal))}
               className={`h-fit text-2xl! ${className}`}
               placeholder={placeHolder}
               onChange={handleChange}
            />
            <input type="hidden" />
         </Field>
      </>
   );
}
