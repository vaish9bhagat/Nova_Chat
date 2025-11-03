import React from "react";

const TypingLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2 p-3">
      <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
    </div>
  );
};

export default TypingLoader;
