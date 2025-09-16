import "./App.css";
import Workspace from "@/components/Workspace/Workspace";
import Library from "@/components/Library/index";
import { useRef } from "react";
function App() {
  const containerRef = useRef(null);
  const handleFullScreen = (isFull) => {
    if (!isFull) {
      containerRef.current.requestFullscreen();
    } else document.exitFullscreen();
  };

  return (
    <div ref={containerRef} className="">
      <Workspace onFullScreen={handleFullScreen} />
      <div className="absolute right-0 top-0 z-[998]">
        <Library />
      </div>
      {/* <Modal /> */}
    </div>
  );
}

export default App;
