'use client';

import { useGetDatasets } from '@/app/services';
import { ButtonSelect } from '../button-select/button-select';
import { DropDown } from '../drop-down';
import { useQueryGenerationContext } from '@/app/contexts';

interface DatasetBoxOptionsProps {
  onCloseBoxOptions?: () => void;
}

export function DatasetBoxOptions(props: DatasetBoxOptionsProps) {
  const { onCloseBoxOptions } = props;
  const { datasetSelect, handleSelectDataset } = useQueryGenerationContext();

  const { datasets, isLoading, handleSearchDatasets } = useGetDatasets();

  return (
    <DropDown isLoading={isLoading} onSearch={handleSearchDatasets}>
      {!!datasets.length ? (
        datasets.map((data) => {
          const { label, value } = data;
          return (
            <li key={value}>
              <ButtonSelect
                name={label}
                isSelected={value === datasetSelect}
                value={value}
                onSelect={() => {
                  handleSelectDataset(value);
                  datasetSelect !== value &&
                    onCloseBoxOptions &&
                    onCloseBoxOptions();
                }}
              />
            </li>
          );
        })
      ) : (
        <div className="flex h-full  items-center justify-center bg-slate-50">
          <p>No data</p>
        </div>
      )}
    </DropDown>
  );
}
