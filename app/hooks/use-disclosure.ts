import { useCallback, useMemo, useState } from 'react';

export interface UseDisclosureProps {
  defaultOpen?: boolean;
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const { defaultOpen = false } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const values = useMemo(() => {
    return {
      onClose,
      onOpen,
      onToggle,
      isOpen,
    };
  }, [isOpen, onClose, onOpen, onToggle]);

  return values;
}
