import Image from "next/image";
import Link from "next/link";
import JoinButton from "../../components/buttons/JoinButton";
import PostCard from "../../components/cards/PostCard";
import Header from "../../components/Header";
import { BackIcon } from "../../components/icons/Icons";
import commImage from "../../public/commDefault.jpeg";
import { CommunityType, PostType } from "../../util/types";
import { useContext, useEffect, useState } from "react";
import {
  getCommunities,
  getCommunityById,
  getPostsByCommunityId,
} from "../../util/ServerCalls";
import { UserContext } from "../_app";
import Post from "../../models/Post";
import Community from "../../models/Community";

export async function getStaticPaths() {
  // const results: CommunityType[] = await getCommunities();
  const results: CommunityType[] = await Community.find();

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
      // community: await getCommunityById(params.id),
      community: await Community.findById(params.id),
      // posts: await getPostsByCommunityId(params.id),
      posts: await Post.find({ communityId: params.id }),
    },
  };
}

interface CommunityPageProps {
  community: CommunityType;
  posts: PostType[];
}
export default function CommunityPage(props: CommunityPageProps) {
  const posts: PostType[] = props.posts;

  return (
    <div className="flex flex-col gap-4 items-center">
      <Header />
      <AllCommunitiesBackLink />
      <CommunityData comm={props.community} />
      <CommunityContent posts={posts} />
    </div>
  );
}

function AllCommunitiesBackLink() {
  return (
    <Link href={"/community/"} passHref>
      <div className="flex gap-2 items-center text-blue-600">
        <BackIcon />
        <p className="font-bold text-sm">View All Communities</p>
      </div>
    </Link>
  );
}

interface CommunityDataProps {
  comm: CommunityType;
}
function CommunityData(props: CommunityDataProps) {
  const [commMemberCount, setCommMemberCount] = useState(0);
  const [joinStatus, setJoinStatus] = useState(false);
  const loggedInUser = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const community: CommunityType = await getCommunityById(props.comm._id);
      return { community };
    };
    fetchData().then((data) => {
      setCommMemberCount(data.community.members.length);
      if (loggedInUser) {
        setJoinStatus(loggedInUser.communities.includes(props.comm._id));
      }
    });
  },[loggedInUser, props.comm._id]);

  return (
    <div className="py-2 px-6 md:px-8 w-full md:w-[768px]">
      <div className="bg-gradient-to-r from-blue-400 p-4 border-2 border-white shadow-md rounded flex justify-between gap-4 items-start ">
        <div className="flex flex-col gap-2 items-start justify-around ">
          <div className="flex justify-start gap-4 items-center">
            <div className="h-16 w-16 relative flex-none">
              <Image
                className="rounded-full"
                src={commImage}
                alt="Random Image"
                fill={true}
              />
            </div>
            <CommunityTitle commName={props.comm.name} />
          </div>
          <CommunityDescription commDesc={props.comm.description} />
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <JoinStatus
            commId={props.comm._id}
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
  joinStatus: boolean;
  setJoinStatus: (b: boolean) => void;
}
function JoinStatus(props: JoinStatusProps) {
  return (
    <div>
      <JoinButton
        commId={props.commId}
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
    <div className="p-2 px-6 md:px-8 w-full md:w-[768px]">
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
        <div className="flex items-center text-xs md:text-sm rounded-full text-blue-600 bg-white focus:border-0 border-[1px] border-blue-600 py-2 px-3 ">
          <select
            className={"outline-0 bg-transparent"}
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
          <PostCard
            hideCommunity={true}
            key={p._id}
            post={p}
            showWithDesc={true}
          />
        ))
      ) : (
        <div className="w-full flex justify-center">No posts yet!</div>
      )}
    </div>
  );
}
