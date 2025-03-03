import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <span className="loading loading-dots loading-lg text-white"></span>
    </div>
  );
};

export default LoadingOverlay;
