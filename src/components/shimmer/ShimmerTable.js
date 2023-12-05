import React from 'react';

const ShimmerTable = () => {
  return (
    <tbody>
    {[...Array(10)].map((_, index) => (
      <tr key={index} className="text-center items-center border">
        <td className="border py-4 bg-gray-300 shimmer-animation"></td>
        <td className="border bg-gray-300 shimmer-animation"></td>
        <td className="border bg-gray-300 shimmer-animation"></td>
        <td className="border bg-gray-300 shimmer-animation"></td>
      </tr>
    ))}
  </tbody>
  );
};

export default ShimmerTable;
