import { useRouter } from "next/router";
import { useState } from "react";
import { SearchIcon } from "./icons/Icons";

export default function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  function search(s: string) {
    router.push({
      pathname: "/search",
      query: { s: s },
    });
  }

  return (
    <div className="flex items-center max-w-2xl flex-grow">
      <input
        type="text"
        className="rounded-l-full focus:outline-none bg-stone-100 w-full px-4 py-2"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        id="search-bar"
      />
      <button
        className="rounded-r-full py-2 px-4 disabled:bg-gray-400 bg-blue-600 hover:bg-blue-800 text-white"
        onClick={() => search(searchText)}
        disabled={searchText == ""}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
