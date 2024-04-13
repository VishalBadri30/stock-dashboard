import React from "react";
import { useState } from "react";
import { mockSearchResults } from "../constants/mock";
import { XIcon, SearchIcon } from "@heroicons/react/solid";
import SearchResults from "./SearchResults";

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState(mockSearchResults.result);

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };
  const updateBestMatches = () => {
    setBestMatches(mockSearchResults.result);
  };

  return (
    <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-x-neutral-200">
      <input
        type="text"
        value={input}
        className="w-full px-4 py-2 focus:outline-none rounded-md"
        placeholder="Search stock.."
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            updateBestMatches();
          }
        }}
      ></input>
      {input && (
        <button onClick={clear} className="m-1">
          <XIcon className="h-4 w-5 mr-1 fill-gray-300" />
        </button>
      )}

      <button
        onClick={updateBestMatches}
        className="h-6 w-6 bg-indigo-600 rounded-md flex justify-center items-center p-1 m-2"
      >
        <SearchIcon className="h-4 w-4 fill-gray-100" />
      </button>
      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null}
    </div>
  );
};

export default Search;
