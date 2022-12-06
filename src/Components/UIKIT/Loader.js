import React from "react";
import { Loader } from "react-loaders";

export default function ThreeDots(props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: props.padding ? props.padding : "1em",
      }}
    >
      <Loader
        active
        type={"ball-beat"}
        color={"#b19738"}
        className="m-auto"
        {...props}
      />
    </div>
  );
}
