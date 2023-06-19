import Link from "next/link";
import { useEffect, useState } from "react";
import { getCommunityById } from "../../util/ServerCalls";
import { PostType } from "../../util/types";

interface TrendingCardProps {
  post: PostType;
}
export default function TrendingCard(props: TrendingCardProps) {
  return (
    <Link href={"/post/" + props.post._id} passHref className="w-1/2 md:w-1/3 shrink-0">
        <div className={
          `h-40 w-full gap-2 overflow-hidden rounded text-white flex flex-col shadow-md items-start justify-end p-3 md:p-4 bg-white/20`
        }
        style={{
          backgroundImage: `url(${props.post.attachmentLink})`,
          backgroundSize: 'cover',
          backgroundBlendMode:'soft-light',
        }}
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
    <p className="text-base md:text-lg w-full font-bold line-clamp-2">
      {props.title}
    </p>
  );
}

interface TrendContentProps {
  content: string;
}
function TrendContent(props: TrendContentProps) {
  return <p className="text-sm md:text-base w-full font-medium line-clamp-2">{props.content}</p>;
}

interface TrendCommunityProps {
  commId: string;
}
function TrendCommunity(props: TrendCommunityProps) {
  const [postCommunityName, setPostCommunityName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const cName = (await getCommunityById(props.commId)).name;
      return { cName };
    };
    fetchData().then((data) => {
      setPostCommunityName(data.cName);
    });
  },[props.commId]);
  return (
    <p className="text-[10px] md:text-xs w-full font-medium">
      c/{postCommunityName}
    </p>
  );
}
