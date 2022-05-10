import { useRouter } from "next/router";
import SearchResultCard from "../../components/cards/SearchResultCard";
import Header from "../../components/Header";

export default function SearchPage() {
  const { query } = useRouter();
  return (
    <div className="flex flex-col gap-4 items-center">
      <Header />
      <SearchResultCard searchText={query} />
    </div>
  );
}
