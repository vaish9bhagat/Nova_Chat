import React from "react";

const Chathead = () => {
  return (
    <div className="w-full h-12 bg-[#020018] border-b-2 flex items-center justify-between py-10 px-4 text-2xl text-[#777B7C]">
      <div className="flex items-center justify-between gap-2">
        <i class="ri-menu-2-line"></i>
        <h1>CHAT-gpt</h1>
      </div>
      <i class="ri-edit-box-line"></i>
    </div>
  );
};

export default Chathead;
