import React from "react";
import { useDispatch } from "react-redux";
import { add } from "@/slice/workspaceSlice";
export default function ElementLibraryItem({ data }) {
  const dispatch = useDispatch();
  const handleDrag = (e) => {
    dispatch(
      add({
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
        name: data.name,
        image: data.image,
        OId: data.OId,
        width: 50,
        height: 50,
      })
    );
  };
  return (
    <div
      draggable
      onDragEnd={(e) => handleDrag(e)}
      className="flex gap-1 items-center"
    >
      <div className="w-[50px] h-[50px]">
        <img className="w-full h-full " src={data.image} alt="" />
      </div>
      <div className="font-extralight lowercase">
        <span>{data.name}</span>
      </div>
    </div>
  );
}
