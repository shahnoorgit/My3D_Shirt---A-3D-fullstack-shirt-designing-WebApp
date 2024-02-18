import React from "react";
import { useSnapshot } from "valtio";
import State from "../store";
const Tabs = ({ isActiveTab, handleClick, isFilterTab, tab }) => {
  const snap = useSnapshot(State);
  const activeStyles =
    isActiveTab && isFilterTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };
  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorhism" : "rounded-4"
      }`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img
        className={`${
          isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"
        }`}
        src={tab.icon}
      />
    </div>
  );
};

export default Tabs;
