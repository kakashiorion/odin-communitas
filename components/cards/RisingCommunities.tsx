import JoinButton from "../buttons/JoinButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CommunityType, UserType } from "../../util/types";
import { getCommunities, getUserById } from "../../util/ServerCalls";
import moment from "moment";
import { getCookie } from "cookies-next";

function sortRisingComm(c: CommunityType[]) {
  const now = new Date();
  const risingSortDays = 30;
  return c
    .filter(
      (p) => moment(now).diff(moment(p.createdAt), "days") < risingSortDays
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
    <div className="w-full rounded shadow-md bg-white p-3 items-start justify-center">
      <div className="flex py-2 px-2 w-full justify-between items-center">
        <p className="font-semibold text-base whitespace-nowrap">
          Top Rising Communities
        </p>
        <Link href={"/community/"} passHref>
          <p className="font-bold text-sm text-indigo-600 whitespace-nowrap">
            View All
          </p>
        </Link>
      </div>
      <hr />
      {finalComms.map((c: CommunityType) => (
        <RisingCommunity commName={c.name} commId={c._id} key={c._id} />
      ))}
    </div>
  );
}

interface RisingCommunityProps {
  commId: string;
  commName: string;
}
function RisingCommunity(props: RisingCommunityProps) {
  const [joinStatus, setJoinStatus] = useState(false);
  const loggedInUser = getCookie("user");
  const fetchData = async () => {
    let cUser;
    if (loggedInUser) {
      cUser = await getUserById(loggedInUser.toString());
    }
    return { cUser };
  };
  useEffect(() => {
    fetchData().then((data) => {
      if (data.cUser) {
        setJoinStatus(data.cUser.communities.includes(props.commId));
      }
    });
  }, []);
  return (
    <div className="w-full flex justify-between p-2 bg-white">
      <Link href={`/community/${props.commId}`}>
        <a className="text-sm font-medium hover:text-indigo-600 hover:font-medium">
          c/{props.commName}
        </a>
      </Link>
      <JoinButton
        commId={props.commId}
        joinStatus={joinStatus}
        setJoinStatus={setJoinStatus}
      />
    </div>
  );
}
