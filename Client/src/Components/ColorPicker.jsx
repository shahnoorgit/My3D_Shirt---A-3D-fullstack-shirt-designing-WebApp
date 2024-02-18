import React from "react";
import { SketchPicker } from "react-color";
import State from "../store";
import { useSnapshot } from "valtio";

const ColorPicker = () => {
  const snap = useSnapshot(State);
  return (
    <div className=" left-full absolute ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (State.color = color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
