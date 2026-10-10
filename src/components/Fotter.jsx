
import React from "react";

const Fotter = () => {
  return (
    <footer className="mx-auto my-4 grid max-w-7xl grid-cols-1 gap-2 border-t border-gray-200 px-4 py-4 text-center text-sm text-gray-500 sm:grid-cols-2 sm:text-left">
      <div>
        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
      </div>

      <div className="sm:text-right">
        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
      </div>
    </footer>
  );
};

export default Fotter;