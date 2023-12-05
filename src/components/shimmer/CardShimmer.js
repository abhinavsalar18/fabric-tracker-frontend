import React from 'react';
import "./shimmer.css"

const ShimmerCard = () => {
  const shimmerAnimationStyle = {
    animation: 'pulse 3s infinite', // Adjust the animation duration as needed
  };
  return (
    <div
        className={` shadow-lg border-white bg-[rgb(220,220,220)] rounded m-4 mt-8 text-center justify-center items-center px-[4px]  shimmer-animation`}>
      <div className="w-36 h-36 animate-pulse rounded-md mb-4"></div>
      <div className="h-4 w-full text-center  bg-white animate-gradient rounded-md"></div>
    </div>
  );
};

export default ShimmerCard;