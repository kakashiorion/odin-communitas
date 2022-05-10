import { useEffect, useState } from "react";
import { CollapseIcon, ExpandIcon } from "../icons/Icons";
import Link from "next/link";
import { CommunityType } from "../../util/types";
import { getCommunities } from "../../util/ServerCalls";

function sortPopularComm(c: CommunityType[], cat?: string) {
  if (cat) {
    return c
      .filter((p) => p.category == cat)
      .sort((a: CommunityType, b: CommunityType) =>
        a.members.length < b.members.length ? 1 : -1
      )
      .slice(0, 6);
  } else {
    return c
      .sort((a: CommunityType, b: CommunityType) =>
        a.members.length < b.members.length ? 1 : -1
      )
      .slice(0, 6);
  }
}

function getPopularCommunities(c: CommunityType[]) {
  let commObj: { [s: string]: number } = {};
  c.forEach((item) => {
    if (item.category in commObj) {
      commObj[item.category] += 1;
    } else {
      commObj[item.category] = 1;
    }
  });
  return Object.entries(commObj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

export default function CommunitiesSuggestionsCard() {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const emptyComms: CommunityType[] = [];
  const [popularComms, setPopularComms] = useState(emptyComms);
  const fetchData = async () => {
    const comms = await getCommunities();
    return { comms };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setPopularComms(data.comms);
    });
  }, []);

  const allPopularComms = sortPopularComm(popularComms);
  const commsByPopularCategories = getPopularCommunities(popularComms);
  const catPopComms: { [s: string]: CommunityType[] } = {};
  commsByPopularCategories.forEach(
    (c) => (catPopComms[c[0]] = sortPopularComm(popularComms, c[0]))
  );

  return (
    <div className="w-full rounded shadow-md p-2 bg-white">
      <CommunityExpandCard
        catName="POPULAR COMMUNITIES"
        key="PopularComm"
        comms={allPopularComms}
        isExpanded={activeCategory == "Popular"}
        onClick={() => {
          if (activeCategory != "Popular") {
            setActiveCategory("Popular");
          } else setActiveCategory("");
        }}
      />
      {Object.keys(catPopComms).map((e) => (
        <>
          <hr key={e + `hr`} />
          <CommunityExpandCard
            key={e}
            comms={catPopComms[e]}
            catName={e}
            isExpanded={activeCategory == e}
            onClick={() => {
              if (activeCategory != e) {
                setActiveCategory(e);
              } else setActiveCategory("");
            }}
          />
        </>
      ))}
    </div>
  );
}

interface CommunityExpandCardProps {
  onClick: () => void;
  catName: string;
  isExpanded: boolean;
  comms: CommunityType[];
}
function CommunityExpandCard(props: CommunityExpandCardProps) {
  return (
    <>
      <div
        className="flex items-center justify-between p-2 "
        onClick={props.onClick}
      >
        <p className="text-sm font-medium">{props.catName}</p>
        {props.isExpanded ? <CollapseIcon /> : <ExpandIcon />}
      </div>
      <CommunityChips
        isExpanded={props.isExpanded}
        comms={props.comms}
        catName={props.catName}
      />
    </>
  );
}

interface CommunityChipsProps {
  isExpanded: boolean;
  comms: CommunityType[];
  catName: string;
}
function CommunityChips(props: CommunityChipsProps) {
  return (
    <div
      className={
        "w-full p-2 flex flex-wrap gap-2 " + (props.isExpanded ? "" : "hidden")
      }
    >
      {props.comms.map((c) => (
        <CommunityChip
          commName={c.name}
          commId={c._id}
          key={c._id + props.catName}
        />
      ))}
    </div>
  );
}

interface CommunityChipProps {
  commId: string;
  commName: string;
}
function CommunityChip(props: CommunityChipProps) {
  return (
    <Link href={"/community/" + props.commId} passHref>
      <p className="px-2 py-1 text-xs hover:text-indigo-600">
        c/{props.commName}
      </p>
    </Link>
  );
}
