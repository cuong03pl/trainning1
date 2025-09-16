import React, { useState } from "react";

import zoomImg from "@/assets/zoom.png";
import unzoomImg from "@/assets/unzoom.png";
import clearImg from "@/assets/clear.png";
import menuImg from "@/assets/menu.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  update,
  removeAll,
  mergeAndAddToLibrary,
} from "@/slice/workspaceSlice";
import { findClosestOverlap } from "../../ultis/findClosestOverlap";
import { getOverlaps } from "../../ultis/getOverlaps";
import { remove } from "../../slice/workspaceSlice";
export default function Workspace({ onFullScreen }) {
  const data = useSelector((state) => state.workspace);
  const library = useSelector((state) => state.library);
  const [dragging, setDragging] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [frontId, setFrontId] = useState(null);
  const [hoverTargetId, setHoverTargetId] = useState(null);
  const dispatch = useDispatch();

  const handleMove = (e) => {
    if (dragging) {
      dispatch(
        update({
          x: e.clientX - dragging?.x,
          y: e.clientY - dragging?.y,
          id: dragging?.id,
        })
      );
      return;
    }
    if (!document.body.classList.contains("ghost-dragging")) {
      if (hoverTargetId !== null) setHoverTargetId(null);
      return;
    }

    const workspace = document.getElementById("workspace-root");
    if (!workspace) return;
    const rect = workspace.getBoundingClientRect();

    const isInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInside) {
      if (hoverTargetId !== null) setHoverTargetId(null);
      return;
    }

    const tempDrag = {
      id: -1,
      x: e.clientX - rect.left - 25,
      y: e.clientY - rect.top - 25,
      width: 50,
      height: 50,
    };

    const overlap = getOverlaps(tempDrag, data);
    if (overlap.length === 0) {
      if (hoverTargetId !== null) setHoverTargetId(null);
      return;
    }

    const draggingCenter = {
      x: tempDrag.x + tempDrag.width / 2,
      y: tempDrag.y + tempDrag.height / 2,
    };
    const closestOverlap = findClosestOverlap(overlap, draggingCenter);
    setHoverTargetId(closestOverlap.id);
  };
  const handleDown = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging({
      id: item?.id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      OId: item?.OId,
      width: 50,
      height: 50,
    });
    setFrontId(item?.id);
  };
  const handleUp = (e) => {
    if (!dragging) return;

    const libraryEl = document.getElementById("library-root");
    if (libraryEl) {
      const libraryRect = libraryEl.getBoundingClientRect();
      if (
        e.clientX >= libraryRect.left &&
        e.clientX <= libraryRect.right &&
        e.clientY >= libraryRect.top &&
        e.clientY <= libraryRect.bottom
      ) {
        dispatch(remove(dragging.id));
      }
    }

    const draggingItem = data.find((item) => item.id === dragging.id);
    if (!draggingItem) return;

    const draggingWithRealCoords = {
      ...draggingItem,
      width: dragging.width || 50,
      height: dragging.height || 50,
    };

    const overlap = getOverlaps(draggingWithRealCoords, data);

    if (overlap.length > 0) {
      const draggingCenter = {
        x: draggingWithRealCoords.x + draggingWithRealCoords.width / 2,
        y: draggingWithRealCoords.y + draggingWithRealCoords.height / 2,
      };
      const closestOverlap = findClosestOverlap(overlap, draggingCenter);
      dispatch(
        mergeAndAddToLibrary({ A: draggingWithRealCoords, B: closestOverlap })
      );
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
  const handleDragOver = (e) => {
    e.preventDefault();
    const tempDrag = {
      id: -1,
      x: e.clientX - 25,
      y: e.clientY - 25,
      width: 50,
      height: 50,
    };
    const overlap = getOverlaps(tempDrag, data);
    if (overlap.length === 0) {
      setHoverTargetId(null);
      return;
    }
    const draggingCenter = {
      x: tempDrag.x + tempDrag.width / 2,
      y: tempDrag.y + tempDrag.height / 2,
    };
    const closestOverlap = findClosestOverlap(overlap, draggingCenter);
    setHoverTargetId(closestOverlap.id);
  };
  const handleDragEndGlobal = () => {
    setHoverTargetId(null);
  };

  function getHighlightedId() {
    if (!dragging) return null;
    const draggingItem = data.find((d) => d.id === dragging.id);
    if (!draggingItem) return null;
    const dragForOverlap = {
      ...draggingItem,
      width: dragging.width || 50,
      height: dragging.height || 50,
    };
    const overlap = getOverlaps(dragForOverlap, data);
    if (overlap.length === 0) return null;
    const draggingCenter = {
      x: draggingItem.x + draggingItem.width / 2,
      y: draggingItem.y + draggingItem.height / 2,
    };
    const closestOverlap = findClosestOverlap(overlap, draggingCenter);
    return closestOverlap.id;
  }

  return (
    <div
      id="workspace-root"
      className="w-full h-screen relative bg-[#faf8f5]"
      onDragOver={(e) => handleDragOver(e)}
      onDragEnd={handleDragEndGlobal}
      onMouseMove={(e) => handleMove(e)}
      onMouseLeave={() => setHoverTargetId(null)}
      onMouseUp={(e) => handleUp(e)}
    >
      {data?.map((item, index) => {
        const highlightedId = dragging ? getHighlightedId() : hoverTargetId;
        return (
          <div
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={(e) => handleDown(e, item)}
            style={{
              left: item?.x,
              top: item?.y,
              zIndex:
                dragging && dragging.id === item.id
                  ? 999
                  : frontId === item.id
                  ? 2
                  : 1,
              opacity: highlightedId && item.id === highlightedId ? 0.5 : 1,
            }}
            key={index}
            draggable
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
          {library?.length}/120
        </span>
      </div>
      <div className="absolute bottom-[10px] right-[260px] ">
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
