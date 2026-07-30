import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from './ui/field';

type InputFieldProps = {
    hidden?: boolean;
    label: string;
    value: string;
    className?: string;
    disabled?: boolean;
    placeHolder?: string;
    onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
};
export default function InputField({
    hidden = false,
    label,
    value,
    className = '',
    disabled = false,
    placeHolder = '',
    onChange = undefined,
}: InputFieldProps) {
    return (
        <>
            <Field hidden={hidden}>
                <FieldLabel htmlFor="username">{label}</FieldLabel>

                <Input
                    id="username"
                    disabled={disabled}
                    type="text"
                    hidden={hidden}
                    value={value}
                    className={`h-fit text-2xl! ${className}`}
                    placeholder={placeHolder}
                    onChange={onChange}
                />
            </Field>
        </>
    );
}
