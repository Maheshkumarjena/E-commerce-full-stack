import React, { useState } from "react";

const ViewMoreText = ({ text, limit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine if text needs truncation
  const shouldTruncate = text.length > limit;
  const truncatedText = shouldTruncate
    ? text.substring(0, limit) + "..."
    : text;

  return (
    <div className="w-full max-w-md">
      <p className="relative text-gray-800">
        {/* Display either truncated or full text based on isExpanded state */}
        <span>{isExpanded || !shouldTruncate ? text : truncatedText}</span>

        {/* View More/Less Button: Only show if truncation is needed */}
        {shouldTruncate && (
          <button
            className="text-blue-500 hover:underline mt-2 text-[12px]"
            onClick={toggleExpansion}
          >
            {isExpanded ? "View Less" : "View More"}
          </button>
        )}
      </p>
    </div>
  );
};

export default ViewMoreText;
