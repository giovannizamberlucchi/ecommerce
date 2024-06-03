'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import classes from './index.module.scss';
import { Chevron } from '../icons/Chevron';
import { useMemo, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  // className?: string;
  options: Option[];
  defaultValue?: Option;
  placeholder?: string;
  renderOption?: (option: Option) => React.ReactNode;
  onChange?: (option: Option) => void;
};

export const Select: React.FC<SelectProps> = ({ options, defaultValue, placeholder, renderOption, onChange }) => {
  const [activeOption, setActiveOption] = useState<Option | null>(
    defaultValue && typeof defaultValue === 'object' ? defaultValue : null,
  );
  const label = useMemo(() => activeOption?.label || placeholder, [defaultValue, activeOption, placeholder]);

  const handleChange = (option: Option) => {
    setActiveOption(option);
    onChange?.(option);
  };

  return (
    <Listbox value={activeOption} onChange={handleChange}>
      <ListboxButton className={classes.button}>
        <p className={classes.title}>{label}</p>

        <Chevron className={classes.chevron} />
      </ListboxButton>

      <ListboxOptions anchor="bottom" className={classes.items}>
        {options.map((option) => (
          <ListboxOption key={option.value} value={option.value}>
            {renderOption ? renderOption(option) : option.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
