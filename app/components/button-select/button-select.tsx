'use client';

export interface ButtonSelectProps {
  name: string;
  value: string;
  isSelected?: boolean;
  onSelect: (value: string) => void;
}

export function ButtonSelect(props: ButtonSelectProps) {
  const { name, onSelect, value, isSelected } = props;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`inline-flex w-full px-4 py-2 ${
        isSelected ? 'bg-gray-100' : 'bg-white'
      } hover:bg-gray-100 `}
    >
      {name}
    </button>
  );
}
