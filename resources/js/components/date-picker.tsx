import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Props = {
   onChange?: (date: DateRange) => void | undefined;
};

export type { DateRange };

export function DatePickerWithRange({ onChange = undefined }: Props) {
   const [date, setDate] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(),
   });

   function handleOnChange(date: DateRange | undefined) {
      setDate(date);

      if (date !== undefined && onChange !== undefined) {
         onChange(date);
      }
   }

   return (
      <Field className="mx-auto w-60">
         <Popover>
            <PopoverTrigger asChild>
               <Button variant="outline" id="date-picker-range" className="justify-start px-2.5 font-normal">
                  <CalendarIcon data-icon="inline-start" />
                  {date?.from ? (
                     date.to ? (
                        <>
                           {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                        </>
                     ) : (
                        format(date.from, 'LLL dd, y')
                     )
                  ) : (
                     <span>Pick a date</span>
                  )}
               </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
               <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={handleOnChange}
                  numberOfMonths={2}
               />
            </PopoverContent>
         </Popover>
      </Field>
   );
}
