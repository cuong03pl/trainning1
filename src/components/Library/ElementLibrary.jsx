import React from "react";
import ElementLibraryItem from "./ElementLibraryItem";
import airImg from "@/assets/air.png";
import earthImg from "@/assets/earth.png";
import fireImg from "@/assets/fire.png";
const ITEMS = [
  {
    image: airImg,
    name: "air",
    OId: 1,
  },
  {
    image: earthImg,
    name: "earth",
    OId: 2,
  },
  {
    image: fireImg,
    name: "fire",
    OId: 3,
  },
];

export default function ElementLibrary() {
  return (
    <div>
      {ITEMS.map((item, index) => {
        return <ElementLibraryItem data={item} key={index} />;
      })}
    </div>
  );
}
