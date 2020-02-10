import React from "react";

const useViewport = () => {
  const [vw, setVW] = React.useState(0);
  const [vh, setVH] = React.useState(0);

  React.useEffect(() => {
    const setSizes = () => {
      if (window.innerWidth !== vw) {
        setVW(window.innerWidth);
      }

      if (window.innerHeight !== vh) {
        setVH(window.innerHeight);
      }
    };

    setSizes();
    window.addEventListener("resize", setSizes);
    return () => window.removeEventListener("resize", setSizes);
  }, [vh, vw]);

  return { vw, vh };
};

export default useViewport;
