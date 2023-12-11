import { useDisclosure } from '@/app/hooks';
import { ModalSelectFields } from '../modal-select-fields';

export function ModalSelectFieldsWithControl() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        title="More Field"
        className="rounded-full bg-red-700 p-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          {' '}
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{' '}
        </svg>
      </button>{' '}
      {isOpen && <ModalSelectFields onClose={onClose} />}
    </>
  );
}
