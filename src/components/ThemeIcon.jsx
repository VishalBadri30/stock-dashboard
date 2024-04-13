import React from "react";
import { MoonIcon } from "@heroicons/react/solid";

export const ThemeIcon = () => {
  return (
    <button className="rounded-xl border-1 border-neutral-100 p-2 absolute right-8 xl:right-32 shadow-md">
      <MoonIcon className="h-8 w-8 cursor-pointer stroke-1 fill-none stroke-neutral-400" />
    </button>
  );
};
