import Link from "next/link";
import { useEffect, useState } from "react";
import { CommunityType } from "../../util/types";
import { getCommunities } from "../../util/ServerCalls";
import moment from "moment";
import { RisingIcon } from "../icons/Icons";

function sortRisingComm(c: CommunityType[]) {
  const now = new Date();
  const risingSortDays = 3000;
  const risingSortMembers = 1;
  return c
    .filter(
      (p) => moment(now).diff(moment(p.createdAt), "days") < risingSortDays && p.members.length>=risingSortMembers
    )
    .sort((a: CommunityType, b: CommunityType) =>
      a.members.length < b.members.length ? 1 : -1
    );
}

export default function RisingCommunitiesCard() {
  const emptyComms: CommunityType[] = [];
  const [risingComms, setRisingComms] = useState(emptyComms);
  const fetchData = async () => {
    const comms = await getCommunities();

    return { comms };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setRisingComms(data.comms);
    });
  }, []);

  const finalComms = sortRisingComm(risingComms);

  return (
    <div className="w-full flex flex-col rounded shadow-md bg-white p-3 items-start justify-center gap-2">
      <div className="flex p-2 w-full justify-start gap-2 text-gray-600 items-center border-b border-gray-200">
        <RisingIcon/>
        <p className="font-semibold text-xs lg:text-sm  whitespace-nowrap">
          RISING COMMUNITIES
        </p>
      </div>
      {finalComms.map((c: CommunityType) => (
        <RisingCommunity commName={c.name} commId={c._id} key={c._id} commMembers={c.members.length}/>
      ))}
      <Link href={"/community/"} passHref className="w-full">
        <div className=" w-full rounded-full text-center py-2 bg-gray-400 font-bold text-sm text-white hover:bg-blue-600 whitespace-nowrap">
          View All
        </div>
      </Link>
    </div>
  );
}

interface RisingCommunityProps {
  commId: string;
  commName: string;
  commMembers: number
}
function RisingCommunity(props: RisingCommunityProps) {
  return (
    <div className="w-full flex justify-between p-2 bg-white">
      <Link href={`/community/${props.commId}`} legacyBehavior>
        <a className="text-sm font-medium hover:text-blue-600 hover:font-medium">
          c/{props.commName}
        </a>
      </Link>
      <p>{props.commMembers+'k'}</p>
    </div>
  );
}
