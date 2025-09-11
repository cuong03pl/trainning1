import React from "react";
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
export default function Alphabet() {
  return (
    <div className="alphabet flex flex-col gap-4 overflow-y-scroll max-h-screen px-2 border-r-[1px] border-r-[#fff]">
      {alphabet.map((item) => (
        <div key={item} className="text-[16px] font-extralight cursor-pointer">
          {item}
        </div>
      ))}
    </div>
  );
}
