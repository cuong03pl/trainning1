import React from "react";
import Alphabet from "./Alphabet";
import ElementLibrary from "./ElementLibrary";

export default function Library() {
  return (
    <div className="flex w-[250px] bg-[#f4efe6] z-[9999] cursor-grab active:cursor-grabbing">
      <Alphabet />
      <ElementLibrary />
    </div>
  );
}
