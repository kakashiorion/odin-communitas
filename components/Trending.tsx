import moment from "moment";
import { PostType } from "../util/types";
import TrendingCard from "./cards/TrendingCard";

export default function Trending(props: { posts: PostType[] }) {
  const trendingPosts = sortTrendingPosts(props.posts);
  return (
    <div className="flex flex-col gap-1 p-2 items-start lg:w-[1024px] w-full">
      <div className="text-sm w-full font-semibold">Trending</div>{" "}
      <TrendingList trendingPosts={trendingPosts} />
    </div>
  );
}

function TrendingList(props: { trendingPosts: PostType[] }) {
  return (
    <div className="grid w-full grid-cols-3 overflow-y-hidden md:grid-cols-4 justify-start overflow-x-auto items-center gap-2 ">
      {props.trendingPosts.map((p) => (
        <TrendingCard post={p} key={p._id} />
      ))}
    </div>
  );
}

function sortTrendingPosts(pList: PostType[]) {
  const now = new Date();
  const trendingDays = 5;
  const finalList = pList
    .filter((p) => moment(now).diff(moment(p.createdAt), "days") < trendingDays)
    .sort((a: PostType, b: PostType) =>
      a.commentsId.length > b.commentsId.length ? 1 : -1
    )
    .slice(0, 4);
  return finalList;
}
