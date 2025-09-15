import React from "react";
import { useSelector } from "react-redux";
import ElementLibraryItem from "./ElementLibraryItem";

export default function ElementLibrary() {
  const libraryItems = useSelector((state) => state.library);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  return (
    <div
      id="library-root"
      onDragOver={handleDragOver}
      className="w-full cursor-grab active:cursor-grabbing"
    >
      {libraryItems.map((item, index) => {
        return <ElementLibraryItem data={item} key={index} />;
      })}
    </div>
  );
}
