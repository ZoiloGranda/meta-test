import React from "react";

interface PhotoMessageProps {
  count: number;
}

const PhotoMessage: React.FC<PhotoMessageProps> = ({ count }) => {
  return (
    count >= 1 && (
      <div className="mt-4 text-center text-lg text-gray-600">
        Click any Photo to see details
      </div>
    )
  );
};

export default PhotoMessage;
