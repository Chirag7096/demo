"use client";

import React, { FC, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type AccordionProps = { desc: string; title: string };

export const Accordion: FC<AccordionProps> = ({ title, desc }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((e) => !e)}
        className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition"
      >
        <span className="text-base sm:text-lg font-medium text-gray-800">
          {title}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`px-6 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 py-4" : "max-h-0 py-0"
        }`}
      >
        <p className="text-sm sm:text-base text-gray-700">{desc}</p>
      </div>
    </div>
  );
};
