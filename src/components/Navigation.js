import { React, useContext } from "react";
import "tachyons";
import { FaceDataContext } from "../Helper/Contexts";

export default function Navigation({ handleRouteChange, route }) {
  const { faceData, setFaceData } = useContext(FaceDataContext);
  function handleNavigationButton() {
    handleRouteChange("signin");
    setFaceData({});
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "10px",
        cursor: "pointer",
      }}
      onClick={handleNavigationButton}
    >
      <h1 className="underline dim">
        {route == "index" ? "Sign Out" : "Sign In"}
      </h1>
    </div>
  );
}
