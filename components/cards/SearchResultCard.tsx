import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import {
  UserType,
  CommentType,
  CommunityType,
  PostType,
} from "../../util/types";
import {
  getComments,
  getCommunities,
  getPosts,
  getUsers,
} from "../../util/ServerCalls";
import PostCard from "./PostCard";
import CommentCard from "./CommentCard";
import CommunityCard from "./CommunityCard";
import UserCard from "./UserCard";

export default function SearchResultCard(props: {
  searchText?: ParsedUrlQuery;
}) {
  const searchFilters = ["Posts", "Comments", "Users", "Communities"];
  const [browsing, setBrowsing] = useState(searchFilters[0]);
  const searchTerm = props.searchText?.s?.toString() ?? "";

  const [userResults, setUserResults] = useState([] as UserType[]);
  const [communityResults, setCommunityResults] = useState(
    [] as CommunityType[]
  );
  const [postResults, setPostResults] = useState([] as PostType[]);
  const [commentResults, setCommentResults] = useState([] as CommentType[]);

  useEffect(() => {
    async function fetchData() {
      const users = await getUsers();
      const communities = await getCommunities();
      const posts = await getPosts();
      const comments = await getComments();
      return { users, posts, comments, communities };
    }
    fetchData().then((data) => {
      setCommentResults(
        data.comments.filter((comment) => comment.content.includes(searchTerm))
      );
      setCommunityResults(
        data.communities.filter(
          (community) =>
            community.name.includes(searchTerm) ||
            community.description.includes(searchTerm)
        )
      );
      setUserResults(
        data.users.filter((user) => user.username.includes(searchTerm))
      );
      setPostResults(
        data.posts.filter(
          (post) =>
            post.title.includes(searchTerm) ||
            post.description.includes(searchTerm)
        )
      );
    });
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center justify-start gap-3 w-full lg:w-[1024px]">
      <p className="text-base md:text-lg font-bold">
        Searching for: {searchTerm}
      </p>
      <div className="flex flex-col items-center justify-start p-2 gap-2 w-full">
        <ContentSelector
          browsing={browsing}
          setBrowsing={setBrowsing}
          searchFilters={searchFilters}
        />
        {browsing == "Posts" ? <PostsContent posts={postResults} /> : null}
        {browsing == "Comments" ? (
          <CommentsContent comments={commentResults} />
        ) : null}
        {browsing == "Users" ? <UsersContent users={userResults} /> : null}
        {browsing == "Communities" ? (
          <CommunitiesContent communities={communityResults} />
        ) : null}
      </div>
    </div>
  );
}

interface PostsContentProps {
  posts: PostType[];
}
export function PostsContent(props: PostsContentProps) {
  return (
    <div className="flex flex-col gap-2 w-full justify-start">
      {props.posts.map((p) => (
        <PostCard
          post={p}
          hideCommunity={false}
          showWithDesc={true}
          key={p._id}
        />
      ))}
    </div>
  );
}

interface CommentsContentProps {
  comments: CommentType[];
}
export function CommentsContent(props: CommentsContentProps) {
  return (
    <div className="flex flex-col gap-2 w-full justify-start">
      {props.comments.map((c) => (
        <CommentCard comment={c} key={c._id} />
      ))}
    </div>
  );
}

interface UsersContentProps {
  users: UserType[];
}
export function UsersContent(props: UsersContentProps) {
  return (
    <div className="flex flex-col gap-2 w-full justify-start">
      {props.users.map((u) => (
        <UserCard user={u} key={u._id} />
      ))}
    </div>
  );
}

interface CommunitiesContentProps {
  communities: CommunityType[];
}
export function CommunitiesContent(props: CommunitiesContentProps) {
  return (
    <div className="flex flex-col gap-2 w-full justify-start">
      {props.communities.map((comm) => (
        <CommunityCard community={comm} key={comm._id} />
      ))}
    </div>
  );
}

interface ContentSelectorProps {
  browsing: string;
  setBrowsing: (s: string) => void;
  searchFilters: string[];
}
export function ContentSelector(props: ContentSelectorProps) {
  return (
    <div className="flex justify-around shadow-md p-2 gap-4 w-full rounded-t-xl bg-white">
      {props.searchFilters.map((s) => (
        <button
          key={s}
          className={
            "hover:text-indigo-600 border-indigo-400 w-1/3" +
            (props.browsing == s ? " border-b-4 " : "")
          }
          onClick={() => props.setBrowsing(s)}
        >
          <p className="p-1">{s}</p>
        </button>
      ))}
    </div>
  );
}
