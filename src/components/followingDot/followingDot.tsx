import { useCallback, useEffect, useRef } from "react";
import "@/components/followingDot/followingDot.css";

export default function FollowingDot() {
  const boxRef = useRef<HTMLDivElement>(null);

  const mouseMoveHandler = useCallback( (event: MouseEvent) => {
    const box = boxRef.current
    if (box) {
      const centerX = box.offsetWidth / 2
      const centerY = box.offsetHeight / 2

      const offsetX = event.offsetX - centerX
      const offsetY = event.offsetY - centerY

      console.log(`center (${centerX}, ${centerY})`)
      console.log(`offset(--x,--y) (${offsetX}, ${offsetY})`)

      box.style.setProperty('--x', `${offsetX}px`)
      box.style.setProperty('--y', `${offsetY}px`)
    }
  }, [boxRef]);
  
  const mouseLeaveHandler = useCallback( (event: MouseEvent) => {
    const box = boxRef.current;
    if (box) {
      box.style.setProperty('--x', '0px')
      box.style.setProperty('--y', '0px')
    }
  }, [boxRef]);

  useEffect(() => {
    const box = boxRef.current;
    if (box) {
      box.addEventListener("mousemove", mouseMoveHandler)
      // box.addEventListener("mouseleave", mouseLeaveHandler);
      return () => {
        box.removeEventListener("mousemove", mouseMoveHandler);
        // box.removeEventListener("mouseleave", mouseLeaveHandler);
      }
    }
  }, [boxRef]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center grow mx-auto h-[480px] w-[480px] bg-blue-200">
        <div ref={boxRef} 
          className="hover-box"></div>
      </div>
    </div>
  )
}
