import { useState } from "react";
import CommentCard from "../components/cards/CommentCard";
import PostCard from "../components/cards/PostCard";
import Header from "../components/Header";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Header type="loggedin" />
      <ProfileSection />
      <UserContent />
    </div>
  );
}

export function ProfileSection() {
  return (
    <div className="flex flex-col p-2 w-full md:w-[768px]">
      <SampleTopPlaceholder />
      <ProfileInfo />
    </div>
  );
}

export function SampleTopPlaceholder() {
  return (
    <div className="bg-indigo-600 shadow-md  h-20 w-full rounded-t-2xl"></div>
  );
}

export function ProfileInfo() {
  return (
    <div className="bg-white shadow-md h-40 z-0 rounded-b-2xl w-full flex flex-col relative items-center ">
      <ProfileData />
    </div>
  );
}

export function ProfileData() {
  return (
    <div className="absolute w-full top-[-48px] flex flex-col items-center gap-2">
      <ProfileAvatar />
      <ProfileName />
      <ProfileDetails />
    </div>
  );
}

export function ProfileAvatar() {
  return (
    <div className="bg-indigo-400 h-24 w-24 rounded-3xl border-4 border-neutral-200"></div>
  );
}

export function ProfileName() {
  return <div className="text-lg md:text-xl">User1234</div>;
}

export function ProfileDetails() {
  return (
    <div className="grid grid-cols-3 w-full p-3 gap-3">
      <JoinInfo />
      <PostsInfo />
      <CommentsInfo />
    </div>
  );
}

export function JoinInfo() {
  return (
    <div className="flex flex-col w-full items-center justify-center ">
      <p className="text-sm md:text-base font-semibold">Join Date</p>
      <p className="text-xs md:text-sm">21st Oct 2020</p>
    </div>
  );
}

export function CommentsInfo() {
  return (
    <div className="flex flex-col w-full items-center justify-center  ">
      <p className="text-sm md:text-base font-semibold">Comments</p>
      <p className="text-xs md:text-sm">123</p>
    </div>
  );
}

export function PostsInfo() {
  return (
    <div className="flex flex-col w-full items-center justify-center  ">
      <p className="text-xs md:text-base font-semibold">Posts</p>
      <p className="text-xs md:text-sm">25</p>
    </div>
  );
}

export function UserContent() {
  const [browsing, setBrowsing] = useState("Posts");

  return (
    <div className="flex flex-col p-2 w-full gap-3 md:w-[768px] items-center ">
      <ContentSelector browsing={browsing} setBrowsing={setBrowsing} />
      {browsing == "Posts" ? <PostsContent /> : null}
      {browsing == "Comments" ? <CommentsContent /> : null}
    </div>
  );
}

interface ContentSelectorProps {
  setBrowsing: (s: string) => void;
  browsing: string;
}
export function ContentSelector(props: ContentSelectorProps) {
  return (
    <div className="flex justify-around shadow-md p-2 w-full rounded-t-xl bg-white">
      <button
        className={
          "hover:text-indigo-600 border-indigo-400 box-border w-1/3" +
          (props.browsing == "Posts" ? " border-b-4 " : "")
        }
        onClick={() => props.setBrowsing("Posts")}
      >
        <p className="p-2">Posts</p>
      </button>
      <button
        className={
          "hover:text-indigo-600 border-indigo-400 box-border w-1/3" +
          (props.browsing == "Comments" ? " border-b-4 " : "")
        }
        onClick={() => props.setBrowsing("Comments")}
      >
        <p className="p-2">Comments</p>
      </button>
    </div>
  );
}

export function PostsContent() {
  return (
    <div className="flex flex-col rounded-b-xl gap-3 w-full justify-center">
      <PostCard />
      <PostCard />
    </div>
  );
}

export function CommentsContent() {
  return (
    <div className="flex flex-col rounded-b-xl gap-3 w-full justify-center">
      <CommentCard />
      <CommentCard />
    </div>
  );
}
