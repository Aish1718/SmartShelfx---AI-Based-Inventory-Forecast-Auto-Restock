import React from "react";

const LoadingSpinner = ({ size = 40 }) => {
  return (
    <div className="flex justify-center items-center w-full py-5">
      <div
        className="animate-spin rounded-full border-t-4 border-blue-600 border-solid"
        style={{
          width: size,
          height: size,
          borderRightColor: "transparent",
          borderLeftColor: "transparent",
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
