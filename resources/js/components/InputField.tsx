import { EyeIcon, EyeClosedIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from './ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

type InputFieldProps = {
   hidden?: boolean;
   label: string;
   value?: string | undefined;
   password?: boolean;
   className?: string;
   required?: boolean;
   disabled?: boolean;
   placeHolder?: string;
   onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
};
export default function InputField({
   hidden = false,
   label,
   password = false,
   value = undefined,
   className = '',
   required = false,
   disabled = false,
   placeHolder = '',
   onChange = undefined,
}: InputFieldProps) {
   const [visible, setVisible] = useState(false);

   return (
      <>
         <Field hidden={hidden}>
            <FieldLabel htmlFor="username">
               {label} {required && <span className="text-red-600">*</span>}
            </FieldLabel>

            {password ? (
               <InputGroup className={`h-fit bg-background! text-xl! ${className}`}>
                  <InputGroupInput
                     id="username"
                     disabled={disabled}
                     type={visible ? 'text' : 'password'}
                     hidden={hidden}
                     value={value}
                     placeholder={placeHolder}
                     onChange={onChange}
                  />
                  <InputGroupAddon onClick={() => setVisible(!visible)} align="inline-end">
                     <div>{visible ? <EyeIcon /> : <EyeClosedIcon />}</div>
                  </InputGroupAddon>
               </InputGroup>
            ) : (
               <Input
                  id="username"
                  disabled={disabled}
                  type="text"
                  hidden={hidden}
                  value={value}
                  className={`text-md! py-1 ${className}`}
                  placeholder={placeHolder}
                  onChange={onChange}
               />
            )}
         </Field>
      </>
   );
}
