import Image from "next/image";
import Link from "next/link";
import JoinButton from "../../components/buttons/JoinButton";
import PostCard from "../../components/cards/PostCard";
import Header from "../../components/Header";
import { BackIcon } from "../../components/icons/Icons";
import commImage from "../../public/commDefault.jpeg";
import { CommunityType, PostType, UserType } from "../../util/types";
import { useEffect, useState } from "react";
import {
  getCommunities,
  getCommunityById,
  getCurrentUser,
  getPostsByCommunityId,
} from "../../util/ServerCalls";

export async function getStaticPaths() {
  const results: CommunityType[] = await getCommunities();

  return {
    paths: results.map((comm) => {
      return { params: { id: String(comm._id) } };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: {
      community: await getCommunityById(params.id),
      posts: await getPostsByCommunityId(params.id),
      cUser: await getCurrentUser(),
    },
  };
}

interface CommunityPageProps {
  community: CommunityType;
  posts: PostType[];
  cUser: UserType;
}
export default function CommunityPage(props: CommunityPageProps) {
  const posts: PostType[] = props.posts;

  return (
    <div className="flex flex-col gap-4 items-center">
      <Header type="loggedin" />
      <AllCommunitiesBackLink />
      <CommunityData comm={props.community} cUser={props.cUser} />
      <CommunityContent posts={posts} />
    </div>
  );
}

function AllCommunitiesBackLink() {
  return (
    <Link href={"/community/"} passHref>
      <div className="flex gap-2 items-center text-indigo-600">
        <BackIcon />
        <p className="font-bold text-sm">View All Communities</p>
      </div>
    </Link>
  );
}

interface CommunityDataProps {
  comm: CommunityType;
  cUser: UserType;
}
function CommunityData(props: CommunityDataProps) {
  const [commMemberCount, setCommMemberCount] = useState(0);
  const [joinStatus, setJoinStatus] = useState(
    props.cUser.communities.includes(props.comm._id)
  );
  useEffect(() => {
    const fetchData = async () => {
      const community: CommunityType = await getCommunityById(props.comm._id);
      return { community };
    };
    fetchData().then((data) => {
      setCommMemberCount(data.community.members.length);
    });
  });
  return (
    <div className="p-2 w-full md:w-[768px]">
      <div className="bg-gradient-to-r from-indigo-400 p-4 border-2 border-white shadow-md rounded-2xl flex justify-between gap-4 items-start ">
        <div className="flex justify-start gap-4 items-start">
          <div className="h-16 w-16 relative flex-none">
            <Image
              className="rounded-3xl"
              src={commImage}
              alt="Random Image"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </div>
          <div className="flex flex-col items-start justify-around ">
            <CommunityTitle commName={props.comm.name} />
            <CommunityDescription commDesc={props.comm.description} />
          </div>
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <JoinStatus
            commId={props.comm._id}
            cUser={props.cUser}
            joinStatus={joinStatus}
            setJoinStatus={setJoinStatus}
          />
          <div className="text-xs md:text-sm w-full whitespace-nowrap">
            <p> {commMemberCount} members</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommunityTitleProps {
  commName: string;
}
function CommunityTitle(props: CommunityTitleProps) {
  return <p className="text-lg md:text-xl">c/{props.commName}</p>;
}

interface CommunityDescriptionProps {
  commDesc: string;
}
function CommunityDescription(props: CommunityDescriptionProps) {
  return <p className="text-sm md:text-base">{props.commDesc}</p>;
}

interface JoinStatusProps {
  commId: string;
  cUser: UserType;
  joinStatus: boolean;
  setJoinStatus: (b: boolean) => void;
}
function JoinStatus(props: JoinStatusProps) {
  return (
    <div>
      <JoinButton
        commId={props.commId}
        currentUser={props.cUser}
        joinStatus={props.joinStatus}
        setJoinStatus={props.setJoinStatus}
      />
    </div>
  );
}

function sortPosts(c: PostType[], sAlgo: string) {
  if (sAlgo == "Popular")
    //Upvotes diff
    return c.sort((a: PostType, b: PostType) =>
      a.upvotersId.length - a.downvotersId.length >
      b.upvotersId.length - b.downvotersId.length
        ? 1
        : -1
    );
  else if (sAlgo == "Old")
    //Created earlier
    return c.sort((a: PostType, b: PostType) =>
      a.createdAt > b.createdAt ? 1 : -1
    );
  else
    return c.sort((a: PostType, b: PostType) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
  //Default sort by New - Created later
}

interface CommunityContentProps {
  posts: PostType[];
}
function CommunityContent(props: CommunityContentProps) {
  const [sortAlgo, setSortAlgo] = useState("New"); //Sort content by 'New' by default

  return (
    <div className="p-2 w-full md:w-[768px]">
      <div className="p-1 flex flex-col justify-start gap-4 items-center ">
        <PostsSorter setSort={setSortAlgo} />
      </div>
      <CommunityPosts posts={sortPosts(props.posts, sortAlgo)} />
    </div>
  );
}

interface PostsSorterProps {
  setSort: (s: string) => void;
}
function PostsSorter(props: PostsSorterProps) {
  const postsSortAlgo = ["New", "Popular", "Old"];
  return (
    <div className="flex w-full justify-between items-center">
      <p className="font-semibold text-xs md:text-sm">All Posts</p>
      <div className="flex gap-2 items-center">
        <p className="text-xs md:text-sm">SORT BY:</p>
        <div className="flex items-center text-xs md:text-sm rounded-3xl text-indigo-600 bg-white focus:border-0 border-[1px] border-indigo-600 p-2 ">
          <select
            className={"outline-0 "}
            id="posts-sort"
            onChange={(e) => props.setSort(e.target.value)}
          >
            {postsSortAlgo.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

interface CommunityPostsProps {
  posts: PostType[];
}
function CommunityPosts(props: CommunityPostsProps) {
  const posts = props.posts;

  return (
    <div className="flex flex-col gap-3 py-3">
      {posts.length > 0 ? (
        posts.map((p: PostType) => (
          <PostCard hideCommunity={true} key={p._id} post={p} />
        ))
      ) : (
        <div className="w-full flex justify-center">No posts yet!</div>
      )}
    </div>
  );
}
