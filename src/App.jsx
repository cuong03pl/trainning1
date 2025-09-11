import "./App.css";
import Workspace from "@/components/Workspace/Workspace";
import Library from "@/components/Library/index";
import { useRef } from "react";
import Modal from "./components/Modal/Modal";
function App() {
  const containerRef = useRef(null);
  const handleFullScreen = (isFull) => {
    if (!isFull) {
      containerRef.current.requestFullscreen();
    } else document.exitFullscreen();
  };

  return (
    <div ref={containerRef} className="flex justify-between w-full h-full ">
      <Workspace onFullScreen={handleFullScreen} />
      <Library />
      {/* <Modal /> */}
    </div>
  );
}

export default App;
