import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, mergeAndAddToLibrary } from "@/slice/workspaceSlice";
import { findClosestOverlap } from "../../ultis/findClosestOverlap";
import { getOverlaps } from "../../ultis/getOverlaps";
export default function ElementLibraryItem({ data }) {
  const dispatch = useDispatch();
  const workspaceItems = useSelector((state) => state.workspace);
  const ghostRef = useRef(null);
  const handleMouseDown = () => {
    const ghost = document.createElement("div");
    document.body.classList.add("ghost-dragging");
    ghost.style.position = "fixed";
    ghost.style.pointerEvents = "none";
    ghost.style.zIndex = "9999";
    ghost.style.display = "flex";
    ghost.style.flexDirection = "column";
    ghost.style.alignItems = "center";
    ghost.style.justifyContent = "center";
    ghost.style.transform = "translate(-25px, -25px)";

    const img = document.createElement("img");
    img.src = data.image;
    img.style.width = "74px";
    img.style.height = "74px";
    img.style.objectFit = "contain";

    const label = document.createElement("span");
    label.textContent = data.name || "";
    label.style.fontWeight = "400";
    label.style.textAlign = "center";
    label.style.textTransform = "lowercase";

    ghost.appendChild(img);
    ghost.appendChild(label);
    document.body.appendChild(ghost);
    ghostRef.current = ghost;

    const move = (ev) => {
      ghost.style.left = ev.clientX + "px";
      ghost.style.top = ev.clientY + "px";
    };
    const up = async (ev) => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      if (ghostRef.current && ghostRef.current.parentNode) {
        ghostRef.current.parentNode.removeChild(ghostRef.current);
        ghostRef.current = null;
      }
      document.body.classList.remove("ghost-dragging");

      const workspace = document.getElementById("workspace-root");
      if (!workspace) return;
      const rect = workspace.getBoundingClientRect();
      const isInside =
        ev.clientX >= rect.left &&
        ev.clientX <= rect.right &&
        ev.clientY >= rect.top &&
        ev.clientY <= rect.bottom;
      if (!isInside) return;

      const x = ev.clientX - rect.left - 25;
      const y = ev.clientY - rect.top - 25;

      const tempA = {
        id: Date.now(),
        x,
        y,
        width: 50,
        height: 50,
        name: data.name,
        image: data.image,
        OId: data.OId,
      };

      const overlaps = getOverlaps(tempA, workspaceItems);

      if (overlaps.length > 0) {
        const aCenter = {
          x: tempA.x + tempA.width / 2,
          y: tempA.y + tempA.height / 2,
        };
        const closest = findClosestOverlap(overlaps, aCenter);

        try {
          await dispatch(
            mergeAndAddToLibrary({ A: tempA, B: closest })
          ).unwrap();
          return;
        } catch {}
      }

      dispatch(
        add({
          x,
          y,
          id: tempA.id,
          name: data.name,
          image: data.image,
          OId: data.OId,
          width: 50,
          height: 50,
        })
      );
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  return (
    <div
      onMouseDown={(e) => handleMouseDown(e)}
      onDragStart={(e) => e.preventDefault()}
      className="flex gap-1 items-center cursor-pointer w-full select-none"
    >
      <div className="w-[50px] h-[50px]">
        <img
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="w-full h-full "
          src={data.image}
          alt=""
        />
      </div>
      <div className="font-extralight lowercase">
        <span>{data.name}</span>
      </div>
    </div>
  );
}
