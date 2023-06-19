import moment from "moment";
import { PostType } from "../util/types";
import PostCard from "./cards/PostCard";
import SideBar from "./Sidebar";

export default function HomeContent(props: { posts: PostType[] }) {
  return (
    <div className="flex flex-col gap-2 py-2 px-6 md:px-8 items-start w-full lg:w-[1024px]">
      <div className="text-xs md:text-sm text-gray-600 font-semibold">Your Feed</div>
      <div className="flex gap-4 items-start justify-between w-full">
        <PostsList posts={props.posts} />
        <SideBar />
      </div>
    </div>
  );
}

function PostsList(props: { posts: PostType[] }) {
  const sortedPosts = sortPopularPosts(props.posts);
  return (
    <div className="flex flex-col min-w-min gap-3 md:w-2/3 w-full">
      {sortedPosts.map((p: PostType) => (
        <PostCard
          hideCommunity={false}
          showWithDesc={false}
          post={p}
          key={p._id}
        />
      ))}
    </div>
  );
}

function sortPopularPosts(pList: PostType[]) {
  const now = new Date();
  const popularSortDays = 3000;
  const finalList = pList
    .filter(
      (p) => moment(now).diff(moment(p.createdAt), "days") < popularSortDays
    )
    .sort((a: PostType, b: PostType) =>
      a.upvotersId.length - a.downvotersId.length >
      b.upvotersId.length - b.downvotersId.length
        ? 1
        : -1
    );
  return finalList;
}
