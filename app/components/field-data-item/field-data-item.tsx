import { getRandomStyle } from '@/app/helpers';
import { useClickOutside, useDisclosure } from '@/app/hooks';
import { useState } from 'react';
import { DropDown } from '../drop-down';
import { DataFieldModel } from '@/app/type';
import { useQueryGenerationContext } from '@/app/contexts';

export interface FieldDataItemProps {
  field: DataFieldModel;
}

export function FieldDataItem(props: FieldDataItemProps) {
  const { field } = props;
  const { value } = field;

  const fieldsOption = [`sum(${value})`, `count(${value})`, 'none'] as const;

  const [style] = useState<string>(() => {
    const randomStyle = getRandomStyle();
    return randomStyle;
  });

  const { handleSetFieldsWithLabel } = useQueryGenerationContext();

  const [labelDisplay, setLabelDisplay] = useState<string>(value);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const boxRef = useClickOutside<HTMLDivElement>(() => onClose());

  function handleDisplayLabel(option: string) {
    if (labelDisplay === option) return;
    if (option === 'none') {
      setLabelDisplay(value);
      handleSetFieldsWithLabel(field);
      onClose();
      return;
    }
    console.log(isOpen);

    setLabelDisplay(option);
    handleSetFieldsWithLabel({ label: option, value });
    onClose();
  }

  return (
    <div className="relative " ref={boxRef}>
      <div className="flex text-center" onClick={onOpen}>
        <button
          title={labelDisplay}
          className={`${style} max-w-[150px] truncate`}
        >
          {labelDisplay}
        </button>
      </div>

      {isOpen && (
        <div className="fixed   z-10  mt-2 min-w-[200px] max-w-[300px]">
          <DropDown title="Aggregation">
            {fieldsOption.map((option, index) => {
              const isSelected = option === labelDisplay;
              return (
                <li key={index}>
                  <button
                    title={option}
                    type="button"
                    className={`${
                      isSelected ? 'bg-gray-100' : 'bg-white'
                    }   inline-flex w-full whitespace-nowrap  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                    onClick={() => handleDisplayLabel(option)}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </DropDown>
        </div>
      )}
    </div>
  );
}
