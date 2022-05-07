import Link from "next/link";
import { useEffect, useState } from "react";
import { getCommunityById } from "../../util/ServerCalls";
import { PostType } from "../../util/types";

interface TrendingCardProps {
  post: PostType;
}
export default function TrendingCard(props: TrendingCardProps) {
  return (
    <Link href={"/post/" + props.post._id} passHref>
      <div
        className={
          "h-40 w-full rounded text-white flex flex-col shadow-md items-start justify-end p-2 md:p-3 " +
          `bg-gradient-to-r from-indigo-300 to-indigo-400`
        }
      >
        <TrendHeadline title={props.post.title} />
        <TrendContent content={props.post.description} />
        <TrendCommunity commId={props.post.communityId} />
      </div>
    </Link>
  );
}

interface TrendHeadlineProps {
  title: string;
}
function TrendHeadline(props: TrendHeadlineProps) {
  return (
    <p className="text-sm md:text-base w-full font-medium truncate">
      {props.title}
    </p>
  );
}

interface TrendContentProps {
  content: string;
}
function TrendContent(props: TrendContentProps) {
  return <p className="text-xs md:text-sm w-full truncate">{props.content}</p>;
}

interface TrendCommunityProps {
  commId: string;
}
function TrendCommunity(props: TrendCommunityProps) {
  const [postCommunityName, setPostCommunityName] = useState("");
  const fetchData = async () => {
    const cName = (await getCommunityById(props.commId)).name;
    return { cName };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setPostCommunityName(data.cName);
    });
  });
  return (
    <p className="text-[10px] md:text-xs w-full font-medium">
      c/{postCommunityName}
    </p>
  );
}
