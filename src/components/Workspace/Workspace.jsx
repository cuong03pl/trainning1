import React, { useState } from "react";
import zoomImg from "@/assets/zoom.png";
import unzoomImg from "@/assets/unzoom.png";
import clearImg from "@/assets/clear.png";
import menuImg from "@/assets/menu.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update, removeAll, merge } from "@/slice/workspaceSlice";
export default function Workspace({ onFullScreen }) {
  const data = useSelector((state) => state.workspace);
  const [dragging, setDragging] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const dispatch = useDispatch();

  const handleMove = (e) => {
    if (!dragging) return;
    dispatch(
      update({
        x: e.clientX - dragging?.x,
        y: e.clientY - dragging?.y,
        id: dragging?.id,
      })
    );
  };
  const handleDown = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging({
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const handleUp = () => {
    const overlap = getOverlappingItems(dragging);
    if (overlap.length > 0) {
      // handle overlap
      dispatch(merge({ A: dragging, B: overlap[0] }));
    }
    setDragging(null);
  };
  const handleRemoveAll = () => {
    dispatch(removeAll());
  };
  const handleFullScreen = () => {
    onFullScreen(isFullScreen);
    setIsFullScreen(!isFullScreen);
  };
  const handleExitFullScreen = () => {
    onFullScreen(isFullScreen);
    setIsFullScreen(false);
  };
  function getOverlappingItems(dragItem) {
    return data.filter((item) => {
      if (item.id === dragItem.id) return false;
      return !(
        dragItem.x + dragItem.width < item.x ||
        dragItem.x > item.x + item.width ||
        dragItem.y + dragItem.height < item.y ||
        dragItem.y > item.y + item.height
      );
    });
  }

  return (
    <div
      className="w-full h-screen relative bg-[#faf8f5]"
      onDragOver={(e) => e.preventDefault()}
      onMouseMove={(e) => handleMove(e)}
      onMouseUp={(e) => handleUp(e)}
    >
      {data?.map((item, index) => {
        return (
          <div
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={(e) => handleDown(e, item?.id)}
            style={{ left: item?.x, top: item?.y }}
            key={index}
            className="absolute flex flex-col justify-center items-center cursor-pointer"
          >
            <img src={item?.image} alt="" />
            {item?.name}
          </div>
        );
      })}
      <div
        onClick={isFullScreen ? handleExitFullScreen : handleFullScreen}
        className="absolute top-[10px] left-[10px] bg-no-repeat bg-contain h-[29px] w-[29px] cursor-pointer"
      >
        {!isFullScreen && (
          <img className="block h-full w-full" src={zoomImg} alt="" />
        )}
        {isFullScreen && (
          <img className="block h-full w-full" src={unzoomImg} alt="" />
        )}
      </div>
      <div className="absolute bottom-[10px] left-[10px] ">
        <span className="text-[80px] text-[#e8ded0] font-extralight">
          0/120
        </span>
      </div>
      <div className="absolute bottom-[10px] right-[10px] ">
        <div className="flex flex-col gap-4">
          <div onClick={handleRemoveAll} className="">
            <img src={clearImg} alt="" />
          </div>
          <img src={menuImg} alt="" />
        </div>
      </div>
    </div>
  );
}
