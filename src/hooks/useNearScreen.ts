import { MutableRefObject, useEffect, useState, useRef } from "react";

interface IuseNearScreen {
  distance?: string;
  externalRef?: MutableRefObject<HTMLElement | undefined | null> | null;
  once?: boolean;
}

function useNearScreen({ distance = "100px", externalRef, once = true }: IuseNearScreen) {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    const element = externalRef ? externalRef.current : fromRef.current;

    const onChange = (entries: any[], watch: { disconnect: () => any }) => {
      const entrieElement = entries[0];

      if (entrieElement.isIntersecting) {
        setShow(true);
        if (once) {
          watch.disconnect();
        }
      } else if (!once) {
        setShow(false);
      }
    };

    const observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });

    if (element) {
      observer.observe(element);
    }

    return () => observer && observer.disconnect();
  });

  return { isNearScreen, fromRef };
}

export default useNearScreen;
