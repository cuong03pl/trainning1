import React from "react";
import { useSelector } from "react-redux";
import ElementLibraryItem from "./ElementLibraryItem";

export default function ElementLibrary() {
  const libraryItems = useSelector((state) => state.library);

  return (
    <div>
      {libraryItems.map((item, index) => {
        return <ElementLibraryItem data={item} key={index} />;
      })}
    </div>
  );
}
