import { useQueryGenerationContext } from '@/app/contexts';
import { useGetAllDataFields } from '@/app/services';
import {
  CustomMultipleSelect,
  SelectOptionsType,
} from '../custom-multiple-select';

export interface SelectFieldsProps {
  valuesOption: SelectOptionsType[];
  handleSetValueOptions: (value: SelectOptionsType) => void;
  handleDeleteOption: (optionVal: string) => void;
}

export function SelectFields(props: SelectFieldsProps) {
  const { handleSetValueOptions, valuesOption, handleDeleteOption } = props;
  const { dataFields, datasetSelect } = useQueryGenerationContext();

  const { allFields, isLoading } = useGetAllDataFields({
    dataset: datasetSelect,
  });

  const options = allFields.filter((allField) =>
    dataFields.every((field) => field.value !== allField.value),
  );

  return (
    <CustomMultipleSelect
      values={valuesOption}
      isLoading={isLoading}
      options={options}
      onDelete={handleDeleteOption}
      onChange={handleSetValueOptions}
      label="Field"
    />
  );
}
