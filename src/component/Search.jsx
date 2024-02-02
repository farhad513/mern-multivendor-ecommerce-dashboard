import React, { useState } from "react";

const Search = ({ setPerPage, setSearchValue, searchValue }) => {
  // const [searchValue, setSearchValue] = useState("");
  // const [perPage, setPerPage] = useState(5);
  // const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="flex justify-between items-center">
      <select
        onChange={(e) => setPerPage(parseInt(e.target.value))}
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
      >
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        type="text"
        placeholder="Search"
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
      />
    </div>
  );
};

export default Search;
