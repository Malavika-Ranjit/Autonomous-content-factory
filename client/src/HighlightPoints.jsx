import React from "react";

const HighlightPoints = ({ points }) => {
  return (
    <div>
      {points.map((point, index) => (
        <p key={index}>• {point}</p>
      ))}
    </div>
  );
};

export default HighlightPoints;
