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
    <div className="flex items-center border-indigo-600 w-1/2">
      <input
        type="text"
        className="inputText rounded-l-xl bg-stone-100 h-10 w-full px-2 "
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        id="search-bar"
      />
      {/* <input type="submit" hidden onSubmit={() => search(searchText)} /> */}
      <button
        className="rounded-r-xl py-2 px-3 bg-indigo-600 text-white"
        onClick={() => search(searchText)}
        disabled={searchText == ""}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
