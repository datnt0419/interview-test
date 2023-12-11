import { useQueryGenerationContext } from '@/app/contexts';
import { useState } from 'react';
import { SelectOptionsType } from '../custom-multiple-select';
import { CustomModal, ModalStateProps } from '../modal';
import { SelectFields } from '../select-fields';

interface ModalSelectFieldsProps extends Pick<ModalStateProps, 'onClose'> {}

export function ModalSelectFields(props: ModalSelectFieldsProps) {
  const { onClose } = props;

  const [valuesOption, setValuesOption] = useState<SelectOptionsType[]>([]);

  const [error, setError] = useState(false);

  const { dataFields, handleSetDataFields } = useQueryGenerationContext();

  function handleSetValueOptions(option: SelectOptionsType) {
    setValuesOption((prev) => {
      return [...prev, option];
    });
    setError(false);
  }

  function handleDeleteOption(optionVal: string) {
    setValuesOption((prev) => prev.filter((pre) => pre.value !== optionVal));
  }

  function handleSaveFields() {
    if (!valuesOption.length) {
      setError(true);
      return;
    }
    handleSetDataFields([...dataFields, ...valuesOption]);
    onClose();
  }

  return (
    <>
      <CustomModal
        isOpen
        modalTitle="Select Field"
        onClose={onClose}
        renderFooter={
          <div className="border-blueGray-200 mt-4 flex items-center justify-between rounded-b border-t border-solid p-6">
            {error && <p className="text-red-500">Option cannot empty</p>}
            <div className="flex flex-1 justify-end space-x-4">
              <button
                className=" rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                disabled={valuesOption.length === 0}
                className=" rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={handleSaveFields}
              >
                Save
              </button>
            </div>
          </div>
        }
      >
        <SelectFields
          handleDeleteOption={handleDeleteOption}
          handleSetValueOptions={handleSetValueOptions}
          valuesOption={valuesOption}
        />
      </CustomModal>
    </>
  );
}
