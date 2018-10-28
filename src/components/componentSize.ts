import { useState, useLayoutEffect } from 'react';

interface Dimensions {
  height: Number,
  width: Number,
}

const getSize = (el: any) => {
  return {
    height: el.offsetHeight,
    width: el.offsetWidth,
  }
}

const reactToResize = (ref: any, setSize: (dimensions: Dimensions) => void) => {
  if (ref && ref.current) {
    setSize(getSize(ref));
  }
}

export default (ref: React.RefObject<HTMLInputElement>) => {
  const [size, setSize] = useState(ref.current);
  // Everytime the DOM is done rendering this is triggered.
  useLayoutEffect(() => {
    reactToResize(ref, setSize);
    const boundReactToResize = reactToResize.bind(null, ref, setSize);
    // Hook up the listener
    window.addEventListener('resize', boundReactToResize);
    // Return a disposer.
    return () => {
      window.removeEventListener('resize', boundReactToResize)
    }
  }, []);
  return size;
}