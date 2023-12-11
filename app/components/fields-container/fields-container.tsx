import { useQueryGenerationContext } from '@/app/contexts';
import { FieldDataItem } from '../field-data-item';
import { ModalSelectFieldsWithControl } from '../modal-select-fields-with-control';
import { Spinner } from '../spinner';

export const FieldsContainer = () => {
  const {
    isLoading,
    dataFields,
    datasetSelect,
    handleRemoveField,
    fieldsWithLabel,
  } = useQueryGenerationContext();

  const generateSqlCode = fieldsWithLabel
    .map((field) => field.label)
    .join(', ');

  return (
    <>
      <div
        className={` flex max-h-[300px] flex-col ${
          datasetSelect ? 'opacity-100' : 'opacity-0'
        }  min-h-[120px] w-full overflow-auto rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800`}
      >
        <div className="flex w-full flex-1 ">
          {isLoading ? (
            <div className="flex w-full flex-1 items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex w-full items-center justify-between space-x-4 ">
              <div className="mt-2 flex  w-full flex-wrap  gap-2 text-center  ">
                {!!dataFields.length ? (
                  dataFields.map((field) => {
                    return (
                      <div key={field.value} className="relative">
                        <button
                          onClick={() => handleRemoveField(field.value)}
                          type="button"
                          title="Remove field"
                          className="absolute right-[-4px] top-[-6px] z-30 h-5 w-5 rounded-full border border-gray-300 bg-white  text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                          x
                        </button>
                        <FieldDataItem field={field} />
                      </div>
                    );
                  })
                ) : (
                  <p className="w-full  text-center"> No Field</p>
                )}
              </div>

              <ModalSelectFieldsWithControl />
            </div>
          )}
        </div>
      </div>
      <p className="my-4">{generateSqlCode}</p>
    </>
  );
};
