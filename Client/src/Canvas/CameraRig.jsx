import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { easing } from "maath";
import State from "../store";

const CameraRig = ({ children }) => {
  const snap = useSnapshot(State);
  const group = useRef();
  //set Model Rotation
  useFrame((State, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    //Intial position
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }
    //set Model camra position
    easing.damp3(State.camera.position, targetPosition, 0.25, delta);

    easing.dampE(
      group.current.rotation,
      [State.pointer.y / 10, -State.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
};

export default CameraRig;
