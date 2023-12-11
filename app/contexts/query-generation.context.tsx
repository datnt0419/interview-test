import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useGetDataFields } from '../services';
import { DataFieldModel } from '../type';

type DataFieldReturnType = ReturnType<typeof useGetDataFields>;

type QueryGenerationContextType = {
  datasetSelect: string | null;
  handleSelectDataset: (dataset: string) => void;
  isLoading: boolean;
  handleSetFieldsWithLabel: (field: DataFieldModel) => void;
  fieldsWithLabel: DataFieldModel[];
} & DataFieldReturnType;

const QueryGenerationContext = createContext<null | QueryGenerationContextType>(
  null,
);

export function QueryGenerationProvider(props: PropsWithChildren) {
  const { children } = props;

  const [datasetSelect, setDatasetSelect] = useState<string | null>(null);

  const [fieldsWithLabel, setFieldsWithLabel] = useState<DataFieldModel[]>([]);

  const { dataFields, isLoading, handleRemoveField, handleSetDataFields } =
    useGetDataFields({
      dataset: datasetSelect,
      setFieldsWithLabel,
    });

  const handleSelectDataset = useCallback(
    (dataset: string) => {
      if (datasetSelect === dataset) return;
      setDatasetSelect(dataset);
      setFieldsWithLabel([]);
    },
    [datasetSelect],
  );

  const handleSetFieldsWithLabel = useCallback(
    (field: DataFieldModel) => {
      const isExist = fieldsWithLabel.find(
        (fieldLabel) => fieldLabel.value === field.value,
      );
      if (isExist) {
        const newFieldsLabel = fieldsWithLabel.map((fieldLabel) =>
          fieldLabel.value === field.value ? field : fieldLabel,
        );

        setFieldsWithLabel(newFieldsLabel);
        return;
      }
      setFieldsWithLabel([...fieldsWithLabel, field]);
    },
    [fieldsWithLabel],
  );

  const values = useMemo(() => {
    return {
      datasetSelect,
      handleSelectDataset,
      isLoading,
      dataFields,
      handleSetFieldsWithLabel,
      fieldsWithLabel,
      handleSetDataFields,
      handleRemoveField,
    };
  }, [
    dataFields,
    datasetSelect,
    fieldsWithLabel,
    handleRemoveField,
    handleSelectDataset,
    handleSetDataFields,
    handleSetFieldsWithLabel,
    isLoading,
  ]);

  return (
    <QueryGenerationContext.Provider value={values}>
      {children}
    </QueryGenerationContext.Provider>
  );
}

export function useQueryGenerationContext() {
  const context = useContext(QueryGenerationContext);
  if (!context) {
    throw new Error('Context must be inside component');
  }

  return context;
}
