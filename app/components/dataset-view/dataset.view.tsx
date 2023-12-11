import { useQueryGenerationContext } from '@/app/contexts';
import { useClickOutside, useDisclosure } from '@/app/hooks';
import { DatasetBoxOptions } from '../dataset-box-options';
import { FieldsContainer } from '../fields-container';

export function DatasetView() {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const { datasetSelect } = useQueryGenerationContext();

  const datasetBoxRef = useClickOutside<HTMLDivElement>(() => onClose());

  return (
    <>
      <div
        ref={datasetBoxRef}
        className=" flex w-full justify-center text-center "
      >
        <div className="relative  z-10 transition delay-150 ease-in-out">
          <button
            type="button"
            className=" dark:focus:ring-[#3b5998]/55 mb-2 inline-flex items-center rounded-lg bg-[#3b5998] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#3b5998]/90 focus:outline-none focus:ring-4 focus:ring-[#3b5998]/50"
            onClick={onToggle}
          >
            + Select dataset
          </button>
          {isOpen && (
            <div className="absolute left-0 top-full min-w-[300px]">
              <DatasetBoxOptions onCloseBoxOptions={onClose} />
            </div>
          )}
        </div>
      </div>
      <div
        className={`w-full 
        origin-top-right transform transition duration-200 ease-out ${
          datasetSelect ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="font-semibold	">{datasetSelect}</p>

        <div className="h-[200px] ">{datasetSelect && <FieldsContainer />}</div>
      </div>
    </>
  );
}
