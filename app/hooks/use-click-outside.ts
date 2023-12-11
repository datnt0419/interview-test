'use client';

import React from 'react';

type Event = MouseEvent | TouchEvent;

type ClickOutsideHandlerType = (event: Event) => void;

/**
 * It returns a ref that you can attach to an element, and when the user clicks outside of that
 * element, it will call the handler function
 * @param {ClickOutsideHandlerType}  - handler - the function to be called when the click outside event is
 * triggered
 * @returns A ref object that can be used to reference a DOM element.
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: ClickOutsideHandlerType,
): React.RefObject<T> => {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const listener = (event: Event): void => {
      const el = ref.current;
      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, handler]);

  return ref;
};
