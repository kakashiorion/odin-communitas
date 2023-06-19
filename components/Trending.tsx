import moment from "moment";
import { PostType } from "../util/types";
import TrendingCard from "./cards/TrendingCard";

export default function Trending(props: { posts: PostType[] }) {
  const trendingPosts = sortTrendingPosts(props.posts);
  return (
    <div className="flex flex-col gap-2 py-4 px-6 md:px-8 items-start lg:w-[1024px] w-full">
      <div className="text-xs md:text-sm text-gray-600 w-full font-semibold">Trending</div>
      <TrendingList trendingPosts={trendingPosts} />
    </div>
  );
}

function TrendingList(props: { trendingPosts: PostType[] }) {
  return (
    <div className="flex w-full justify-start overflow-x-scroll items-center gap-2">
      {props.trendingPosts.map((p) => (
        <TrendingCard post={p} key={p._id} />
      ))}
    </div>
  );
}

function sortTrendingPosts(pList: PostType[]) {
  const now = new Date();
  const trendingDays = 500;
  const finalList = pList
    .filter((p) => moment(now).diff(moment(p.createdAt), "days") < trendingDays && p.attachmentLink !="")
    .sort((a: PostType, b: PostType) =>
      a.commentsId.length > b.commentsId.length ? 1 : -1
    )
    .slice(0, 4);
  return finalList;
}
