export default function SearchBar() {
  return (
    <input
      type="text"
      className="flex items-center rounded-sm focus:border-indigo-600 bg-stone-100 h-10 px-2 w-1/2"
      placeholder="Search"
      id="search-bar"
    />
  );
}
