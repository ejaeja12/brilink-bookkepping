import { useState } from 'react';

type LeType = [string, (x: string) => void, number];

export const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};

/**
 *
 * @param initValue
 * @returns
 */

export function useFormatCurrency(initValue: number = 0): LeType {
    const [rawValue, setRawValue] = useState<number>(initValue);

    const removeNonDigits = (str: string) => {
        const x = str.replace(/[^0-9]/g, '');
        console.log(x);

        if (x === null || x === '') {
            return 0;
        }

        return parseInt(x);
    };

    const setFormattedValue = (inputValue: string) => {
        setRawValue(removeNonDigits(inputValue));
    };
    const formattedValue: string = formatRupiah(rawValue);

    return [formattedValue, setFormattedValue, rawValue];
}
