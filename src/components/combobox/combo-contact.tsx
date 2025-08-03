import * as React from 'react';
import {
  CheckCircle2,
  ChevronsUpDown,
  Contact2,
  Phone,
  Search,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatCpfCnpj } from '@/services/utils/formats';
import { Input } from '../ui/input';

interface Option {
  id?: string;
  name: string;
  cpf: string;
  phone: string;
  value: string | number;
}

interface ComboProps {
  placeholder: string;
  options: Option[];
  filterkey: keyof Option;
  value: string;
  setId: (id: string) => void;
}

export function ComboboxContact({
  placeholder,
  options,
  filterkey,
  value,
  setId,
}: ComboProps) {
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = React.useState('');

  function handleChangeObject(id: string) {
    setId(id);
  }

  const filteredOptions =
    search === ''
      ? options
      : options.filter((option) =>
        String(option[filterkey])
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(search.toLowerCase().replace(/\s+/g, '')),
      );

  const selectedOption = options.find((option) => option.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between overflow-hidden"
        >
          {value && selectedOption
            ? `${selectedOption.name} - ${formatCpfCnpj(selectedOption.cpf)}`
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="absolute top-[-40px] min-w-[350px] p-0"
        align="end"
        style={{ zIndex: 9999 }}
      >
        <div className="flex flex-col gap-2 p-2 realative">
          <Input
            placeholder="Busque pelo CPF..."
            className="h-9"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />{' '}
          <Search className="absolute top-4 right-5 h-5 text-gray-400" />
          <div className="max-h-60 overflow-y-auto p-1">
            {filteredOptions.length === 0 && (
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-sm text-gray-500">
                  Nenhum resultado encontrado
                </span>
              </div>
            )}
            {filteredOptions.map((framework) => (
              <Button
                key={framework.cpf}
                className={cn("flex items-center relative h-auto w-full justify-start text-left p-2", value === framework.id && 'border border-gray-200')}
                variant="ghost"
                onClick={() => {
                  handleChangeObject(framework.id!);
                  setOpen(false);
                }}
              >
                <div className="flex flex-col gap-2 items-start justify-start">
                  <Contact2 />
                  <Phone />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <h3>{framework.name}</h3>
                  <span className="text-xs">
                    {formatCpfCnpj(framework.cpf)}
                  </span>
                </div>
                {/* <span className='text-xs'>{formatPhone(framework.phone)}</span> */}
                <CheckCircle2
                  className={cn(
                    'absolute right-5 top-5 text-lg',
                    value === framework.id ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
