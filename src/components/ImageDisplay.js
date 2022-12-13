import React from "react";
import "../style.css";
import "tachyons";

export default function ImageDisplay({
  imageUrl,
  faceData,
  noFaceDetectedErrorMessage,
}) {
  const leftRow = faceData.left_col;
  const rightRow = faceData.right_col;
  const topRow = faceData.top_row;
  const bottomRow = faceData.bottom_row;
  const imageHeight = 500;
  const imageWidth = 500;

  return (
    <div
      style={{
        display: "flex",
        flexDrection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      {imageUrl ? (
        <>
          ({" "}
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              background: "white",
              border: "1px solid black",
              width: "500px",
              height: "500px",
              position: "relative",
              top: "0",
              left: "0",
            }}
          >
            : <p>{noFaceDetectedErrorMessage}</p>
            <img
              style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
              src={imageUrl}
              alt="picture"
            />
            faceData?
            <div
              style={{
                height: `${imageHeight * bottomRow - imageHeight * topRow}px`,
                width: `${imageWidth * rightRow - imageWidth * leftRow}px`,
                border: "2px solid blue",
                position: "absolute",
                top: `${imageHeight * topRow}px`,
                left: `${imageWidth * leftRow}px`,
              }}
            >
              : <div></div>
            </div>
          </div>
          )
        </>
      ) : (
        ""
      )}
    </div>
  );
}
