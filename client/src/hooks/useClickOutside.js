import { useEffect, useRef } from 'react';

const useClickOutside = handler => {
  let domNode = useRef();

  useEffect(() => {
    let hookHandler = event => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', hookHandler);

    return () => {
      document.removeEventListener('mousedown', hookHandler);
    };
  });

  return domNode;
};

export default useClickOutside;
