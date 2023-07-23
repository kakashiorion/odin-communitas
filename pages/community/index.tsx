import Link from "next/link";
import Header from "../../components/Header";
import Image from "next/image";
import sampleCommImage from "../../public/commDefault.jpeg";
import JoinButton from "../../components/buttons/JoinButton";
import NewCommunityButton from "../../components/buttons/NewCommunityButton";
import { CommunityType } from "../../util/types";
import { useContext, useEffect, useState } from "react";
import {
  getCommunityById,
} from "../../util/ServerCalls";
import { UserContext } from "../_app";
import Community from "../../models/Community";

export async function getServerSideProps() {
  return {
    props: {
      comms: JSON.parse(JSON.stringify(await Community.find())),
    },
  };
}

function sortComm(c: CommunityType[], sAlgo: string) {
  if (sAlgo == "Name")
    return c.sort((a: CommunityType, b: CommunityType) =>
      a.name > b.name ? 1 : -1
    );
  else if (sAlgo == "Old")
    return c.sort((a: CommunityType, b: CommunityType) =>
      a.createdAt > b.createdAt ? 1 : -1
    );
  else if (sAlgo == "New")
    return c.sort((a: CommunityType, b: CommunityType) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
  else sAlgo == "Popular";
  return c.sort((a: CommunityType, b: CommunityType) =>
    a.members.length < b.members.length ? 1 : -1
  );
}

interface AllCommunityPageProps {
  comms: CommunityType[];
}
export default function AllCommunityPage(props: AllCommunityPageProps) {
  const [sort, setSort] = useState("Name"); //Sort communities by 'Name' by default

  return (
    <div className="flex flex-col gap-4 items-center">
      <Header />
      <div className="flex flex-col p-6 gap-2 justify-start items-center md:w-[768px] w-full ">
        <CommunitiesSorter setSort={setSort} />
        {sortComm(props.comms, sort).map((comm: CommunityType) => (
          <CommunityItem
            key={comm._id}
            commId={comm._id}
            commName={comm.name}
            commImageUrl={comm.imageUrl}
            commDesc={comm.description}
          />
        ))}
        <NewCommunityButton />
      </div>
    </div>
  );
}

interface CommunityItemProps {
  commId: string;
  commName: string;
  commImageUrl: string;
  commDesc: string;
}
function CommunityItem(props: CommunityItemProps) {
  const [joinStatus, setJoinStatus] = useState(false);
  const loggedInUser = useContext(UserContext);

  function getImageURL() {
    if (!props.commImageUrl || props.commImageUrl == "") {
      return sampleCommImage;
    }
    return props.commImageUrl;
  }

  const [commMemberCount, setCommMemberCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const community: CommunityType = await getCommunityById(props.commId);
      return { community };
    };
    fetchData().then((data) => {
      setCommMemberCount(data.community.members.length);
      if (loggedInUser) {
        setJoinStatus(loggedInUser.communities.includes(props.commId));
      }
    });
  },[loggedInUser, props.commId,joinStatus]);

  return (
    <div className="p-3 shadow-md bg-white hover:bg-gray-100 border-[1px] hover:border-blue-600 flex rounded-full w-full items-center justify-between">
      <Link href={"/community/" + props.commId} passHref>
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 relative">
            <Image
              className="rounded-full"
              src={getImageURL()}
              alt="Comm Image"
              fill={true}
            ></Image>
          </div>
          <p className="hover:underline">{props.commName}</p>
        </div>
      </Link>
      <div className="flex gap-2 items-center">
        <p className="whitespace-nowrap text-xs md:text-sm">
          {commMemberCount} members
        </p>
        <JoinButton
          commId={props.commId}
          joinStatus={joinStatus}
          setJoinStatus={setJoinStatus}
        />
      </div>
    </div>
  );
}

interface CommunitiesSorterProps {
  setSort: (s: string) => void;
}
function CommunitiesSorter(props: CommunitiesSorterProps) {
  const communitiesSortAlgo = ["Name", "New", "Popular", "Old"];
  return (
    <div className="flex w-full justify-between items-center">
      <p className="font-semibold text-sm">All Communities</p>
      <div className="flex gap-2 items-center">
        <p className="text-sm">SORT BY:</p>
        <div className="flex items-center text-xs md:text-sm rounded-full text-blue-600 bg-white focus:border-0 border-[1px] border-blue-600 py-2 px-3 ">
          <select
            className={"outline-0 bg-transparent"}
            id="communities-sort"
            onChange={(e) => props.setSort(e.target.value)}
          >
            {communitiesSortAlgo.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
