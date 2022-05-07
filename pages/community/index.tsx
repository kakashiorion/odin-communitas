import Link from "next/link";
import Header from "../../components/Header";
import Image from "next/image";
import sampleCommImage from "../../public/commDefault.jpeg";
import JoinButton from "../../components/buttons/JoinButton";
import CreateCommunityButton from "../../components/buttons/NewCommunityButton";
import { CommunityType, UserType } from "../../util/types";
import { useEffect, useState } from "react";
import {
  getCommunities,
  getCommunityById,
  getCurrentUser,
} from "../../util/ServerCalls";

export async function getStaticProps() {
  return {
    props: {
      comms: await getCommunities(),
      cUser: await getCurrentUser(),
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
  cUser: UserType;
}
export default function AllCommunityPage(props: AllCommunityPageProps) {
  const [sort, setSort] = useState("Name"); //Sort communities by 'Name' by default

  return (
    <div className="flex flex-col gap-4 items-center">
      <Header type="loggedin" />
      <div className="flex flex-col p-6 gap-2 justify-start items-center md:w-[768px] w-full ">
        <CommunitiesSorter setSort={setSort} />
        {sortComm(props.comms, sort).map((comm: CommunityType) => (
          <CommunityItem
            key={comm._id}
            commId={comm._id}
            commName={comm.name}
            commImageUrl={comm.imageUrl}
            commDesc={comm.description}
            cUser={props.cUser}
          />
        ))}
        <CreateCommunityButton />
      </div>
    </div>
  );
}

interface CommunityItemProps {
  commId: string;
  commName: string;
  commImageUrl: string;
  commDesc: string;
  cUser: UserType;
}
function CommunityItem(props: CommunityItemProps) {
  // function getValidImageSource(s: string) {
  //   let url;
  //   try {
  //     url = new URL(s);
  //   } catch (_) {
  //     return false;
  //   }
  //   return url.protocol === "http:" || url.protocol === "https:";
  // }
  const [joinStatus, setJoinStatus] = useState(
    props.cUser.communities.includes(props.commId)
  );
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
    });
  });

  return (
    <div className="p-3 shadow-md bg-white hover:bg-gray-100 border-[1px] hover:border-indigo-600 flex rounded-lg w-full items-center justify-between">
      <Link href={"/community/" + props.commId} passHref>
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 relative">
            <Image
              className="rounded-xl"
              src={getImageURL()}
              alt="Comm Image"
              layout="responsive"
              width="100%"
              height="100%"
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
          currentUser={props.cUser}
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
        <div className="flex items-center text-xs md:text-sm rounded-3xl text-indigo-600 bg-white focus:border-0 border-[1px] border-indigo-600 p-2 ">
          <select
            className={"outline-0 "}
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
