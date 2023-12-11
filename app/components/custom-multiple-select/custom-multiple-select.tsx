import { useClickOutside, useDisclosure } from '@/app/hooks';
import { Spinner } from '../spinner';

export type SelectOptionsType = {
  label: string;
  value: string;
};

export interface CustomMultipleSelectProps<T extends SelectOptionsType> {
  options: T[];
  values: T[];
  onChange: (value: T) => void;
  label?: string;
  onDelete?: (optionVal: string) => void;
  isLoading?: boolean;
}

export function CustomMultipleSelect<T extends SelectOptionsType>(
  props: CustomMultipleSelectProps<T>,
) {
  const { label, isLoading, values, onDelete, onChange, options = [] } = props;

  const optionNotIncludeValues = options.filter((option) =>
    values.every((val) => val.value !== option.value),
  );

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultOpen: true });

  const selectBoxRef = useClickOutside<HTMLDivElement>(() => onClose());

  return (
    <>
      <div className="mx-auto flex h-64  w-full flex-col  items-center  ">
        <div className="w-full px-4 " ref={selectBoxRef}>
          <label>{label || ''}</label>

          <div className="relative flex flex-col items-center">
            <div onClick={onOpen} className="svelte-1l8159u   w-full ">
              <div className="svelte-1l8159u  my-2 flex rounded border border-gray-200 bg-white p-1">
                <div className="flex max-h-[100px] flex-auto flex-wrap overflow-auto">
                  {values.map((val) => (
                    <div
                      key={val.value}
                      className="m-1 flex items-center justify-center rounded-full border border-teal-300 bg-teal-100  px-2 py-1 font-medium text-teal-700 "
                    >
                      <div className="max-w-full flex-initial text-xs font-normal leading-none">
                        {val.label}
                      </div>
                      {onDelete && (
                        <div className="flex  flex-auto flex-row-reverse">
                          <div onClick={() => onDelete(val.value)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-x ml-2 h-4 w-4 cursor-pointer rounded-full hover:text-teal-400"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* <div className="flex-1">
                    <input
                      placeholder={!!values.length ? '' : 'Select...'}
                      className="h-full w-full appearance-none bg-transparent p-1 px-2 text-gray-800 outline-none"
                    />
                  </div> */}
                </div>
                <div className="svelte-1l8159u flex w-8 items-center border-l border-gray-200 py-1 pl-2 pr-1 text-gray-300">
                  <button
                    className={`${
                      isOpen && 'rotate-180'
                    } h-6 w-6 cursor-pointer text-gray-600 outline-none focus:outline-none`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-chevron-up h-4 w-4"
                    >
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {isOpen && (
              <div className=" lef-0 max-h-select svelte-5 absolute top-full  z-40 min-h-[60px] w-full overflow-y-auto rounded bg-white shadow">
                {isLoading ? (
                  <div className="mt-4 flex w-full justify-center ">
                    <Spinner />
                  </div>
                ) : (
                  <div className="flex max-h-[220px] w-full flex-col">
                    {!!optionNotIncludeValues.length ? (
                      optionNotIncludeValues.map((option) => {
                        return (
                          <div
                            key={option.label}
                            onClick={() => onChange(option)}
                            className="w-full cursor-pointer rounded-t border-b border-gray-100  hover:bg-teal-100"
                          >
                            <div className="relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 hover:border-teal-100">
                              <div className="flex w-full items-center">
                                <div className="mx-2 leading-6  ">
                                  {option.label}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="w-full py-4 text-center">No Data</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
