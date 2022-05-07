import RisingCommunitiesCard from "./cards/RisingCommunities";
import CommunitiesSuggestionsCard from "./cards/CommunitiesSuggestionsCard";

export default function SideBar() {
  return (
    <div className="md:flex hidden flex-col gap-3 md:w-2/5 items-start justify-center">
      <RisingCommunitiesCard />
      <CommunitiesSuggestionsCard />
    </div>
  );
}
