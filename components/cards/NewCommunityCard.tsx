import newPostImage from "../../public/newPostImage.jpeg";
import Image from "next/image";
import StartCommunityButton from "../buttons/StartCommunityButton";
import CancelButton from "../buttons/CancelButton";
import { useState } from "react";

const commCategories = ["News", "Sports", "Entertainment", "Hobbies", "Music"];

export default function NewCommunityCard() {
  const [commName, setCommName] = useState("");
  const [commCat, setCommCat] = useState(commCategories[0]);
  const [commDesc, setCommDesc] = useState("");
  const [commAttach, setCommAttach] = useState("");
  return (
    <div className="px-6 md:px-8 w-full lg:w-[1024px] ">
      <div className="flex shadow-md rounded">
        <div className="flex text-sm p-2 md:p-3 bg-white w-full md:w-2/3 md:text-base gap-3 flex-col justify-start items-start">
          <CommunityHeader />
          <CategorySelector setCommCat={setCommCat} />
          <CommunityName setCommName={setCommName} />
          <CommunityDescription setCommDesc={setCommDesc} />
          <CommunityAttach setCommAttach={setCommAttach} />
          <CommunityActions
            commName={commName}
            commCat={commCat}
            commDesc={commDesc}
            commAttach={commAttach}
          />
        </div>
        <div className="md:w-1/3 hidden md:flex p-4 bg-white">
          <Image src={newPostImage} alt="" />
        </div>
      </div>
    </div>
  );
}

function CommunityHeader() {
  return (
    <div className=" p-2 w-full">
      <p className="font-semibold text-blue-600 text-lg md:text-xl">
        Create a new community
      </p>
    </div>
  );
}

interface CommunityNameProps {
  setCommName: (s: string) => void;
}
function CommunityName(props: CommunityNameProps) {
  return (
    <div className="flex flex-col p-2 gap-1 justify-between w-full">
      <input
        type="text"
        className={
          "flex items-center rounded border-[1px]  border-gray-400 outline-none focus:border-2 focus:border-blue-600 bg-gray-50 h-10 px-2 "
        }
        id="new-post-title"
        placeholder="Name of the Community (max 60 characters)"
        onChange={(e) => props.setCommName(e.target.value)}
      ></input>
    </div>
  );
}

function CategorySelector(props: { setCommCat: (s: string) => void }) {
  return (
    <div className="flex p-2 gap-2 items-center">
      <p>Choose category:</p>
      <div className="flex items-center rounded-full text-blue-600 bg-gray-50 focus:border-0 border-[1px] border-blue-600 p-2 ">
        <select
          className="outline-0 bg-gray-50"
          id="new-post-community"
          onChange={(e) => props.setCommCat(e.target.value)}
        >
          {commCategories.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function CommunityDescription(props: { setCommDesc: (s: string) => void }) {
  return (
    <div className="flex flex-col gap-1 p-2 justify-between w-full">
      <textarea
        rows={5}
        className={
          "flex items-center rounded border-[1px] border-gray-400 outline-none focus:border-2 focus:border-blue-600 bg-gray-50 px-2 py-2 "
        }
        id="new-post-desc"
        placeholder="What is this community about?"
        onChange={(e) => props.setCommDesc(e.target.value)}
      ></textarea>
    </div>
  );
}

function CommunityAttach(props: { setCommAttach: (s: string) => void }) {
  return (
    <div className="flex flex-col p-2 gap-1 justify-between w-full">
      <input
        type="text"
        className={
          "flex items-center rounded border-[1px] border-gray-400 outline-none focus:border-2 focus:border-blue-600 bg-gray-50 h-10 px-2 "
        }
        id="new-community-attach"
        placeholder="Community Image URL (Optional)"
        onChange={(e) => props.setCommAttach(e.target.value)}
      ></input>
    </div>
  );
}

interface CommunityActionsProps {
  commName: string;
  commCat: string;
  commDesc: string;
  commAttach?: string;
}
function CommunityActions(props: CommunityActionsProps) {
  return (
    <div className="p-2 w-full flex gap-3 items-center justify-between">
      <StartCommunityButton
        commName={props.commName}
        commCat={props.commCat}
        commDesc={props.commDesc}
        commAttach={props.commAttach}
      />
      <CancelButton />
    </div>
  );
}
