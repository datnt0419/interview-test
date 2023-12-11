import { PropsWithChildren } from 'react';
import { Spinner } from '../spinner';

export interface DropDownProps extends PropsWithChildren {
  onSearch?: (value: string) => void;
  isLoading?: boolean;
  title?: string;
}

export function DropDown(props: DropDownProps) {
  const { onSearch, title, isLoading, children } = props;
  return (
    <>
      {onSearch && (
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          id="simple-search"
          className="mb-1 block  w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5   text-xs  focus:border-red-400 focus:ring-red-500
         
          dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search ..."
        />
      )}
      <div
        id="dropdown"
        className="z-10 h-40 divide-y divide-gray-100 overflow-auto rounded-lg bg-white shadow dark:bg-gray-700"
      >
        <ul
          className=" h-full py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdown-button"
        >
          {title && <p className="my-2 px-4 font-semibold">{title}</p>}

          {isLoading ? (
            <div className="flex h-full items-center justify-center ">
              <Spinner />
            </div>
          ) : (
            children
          )}
        </ul>
      </div>
    </>
  );
}
