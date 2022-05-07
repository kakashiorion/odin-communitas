import newPostImage from "../../public/newPostImage.jpeg";
import Image from "next/image";
import CreatePostButton from "../buttons/CreatePostButton";
import CancelButton from "../buttons/CancelButton";
import { useState, useEffect } from "react";
import { CommunityType } from "../../util/types";
import { getCommunities } from "../../util/ServerCalls";

export default function NewPostCard() {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postAttachLink, setPostAttachLink] = useState("");
  const emptyTags: string[] = [];
  const [postTags, setPostTags] = useState(emptyTags);
  const emptyComms: CommunityType[] = [];
  const [allComms, setAllComms] = useState(emptyComms);
  const [postCommunityId, setPostCommunityId] = useState("");

  const fetchData = async () => {
    const comms = await getCommunities();
    return { comms };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setAllComms(data.comms);
      setPostCommunityId(data.comms[0]._id);
    });
  }, []);

  return (
    <div className="p-2 w-full lg:w-[1024px] ">
      <div className="flex shadow-md rounded-sm">
        <div className="flex text-sm p-3 bg-white w-full md:text-base gap-3 flex-col justify-start items-start">
          <div className=" p-2 w-full">
            <p className="font-semibold text-indigo-600 text-lg md:text-xl">
              Create a new post
            </p>
          </div>
          <CommunitySelector
            setPostCommunityId={setPostCommunityId}
            comms={allComms}
          />
          <PostTitle setPostTitle={setPostTitle} />
          <PostDescription setPostDesc={setPostDesc} />
          <PostAttach setPostAttachLink={setPostAttachLink} />
          <PostTags setPostTags={setPostTags} postTags={postTags} />
          <PostActions
            postTitle={postTitle}
            postDesc={postDesc}
            postAttachLink={postAttachLink}
            postTags={postTags}
            postCommunityId={postCommunityId}
          />
        </div>
        <div className="w-80 hidden md:flex p-4 bg-white">
          <Image src={newPostImage} alt="" />
        </div>
      </div>
    </div>
  );
}

function CommunitySelector(props: {
  setPostCommunityId: (c: string) => void;
  comms: CommunityType[];
}) {
  return (
    <div className="flex p-2 gap-2 items-center">
      <p>Choose community:</p>
      <div className="flex items-center rounded-md text-indigo-600 bg-gray-50 focus:border-0 border-[1px] border-indigo-600 p-2 ">
        <select
          className="outline-0 bg-gray-50"
          id="new-post-community"
          onChange={(e) => {
            console.log(`selecting comm ${e.target.value}`);
            props.setPostCommunityId(e.target.value);
          }}
        >
          {props.comms.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function PostTitle(props: { setPostTitle: (s: string) => void }) {
  return (
    <div className="flex flex-col p-2 gap-1 justify-between w-full">
      <input
        type="text"
        className={
          "flex items-center rounded-md border-[1px]  border-indigo-400 outline-indigo-600 bg-gray-50 h-10 px-2 "
        }
        id="new-post-title"
        placeholder="Title"
        onChange={(e) => props.setPostTitle(e.target.value)}
      ></input>
    </div>
  );
}

function PostDescription(props: { setPostDesc: (s: string) => void }) {
  return (
    <div className="flex flex-col gap-1 p-2 justify-between w-full">
      <textarea
        rows={5}
        className={
          "flex items-center rounded-md border-[1px] border-indigo-400 outline-indigo-600 bg-gray-50 px-2 py-2 "
        }
        id="new-post-desc"
        placeholder="Description"
        onChange={(e) => props.setPostDesc(e.target.value)}
      ></textarea>
    </div>
  );
}

function PostAttach(props: { setPostAttachLink: (s: string) => void }) {
  return (
    <div className="flex flex-col p-2 gap-1 justify-between w-full">
      <input
        type="text"
        className={
          "flex items-center rounded-md border-[1px] border-indigo-400 focus:border-indigo-600 bg-gray-50 h-10 px-2 "
        }
        id="new-post-attach"
        placeholder="Attachment Link"
        onChange={(e) => props.setPostAttachLink(e.target.value)}
      ></input>
    </div>
  );
}

function PostTags(props: {
  setPostTags: (t: string[]) => void;
  postTags: string[];
}) {
  const tags = ["Help", "NSFW", "Spoiler"];
  return (
    <div className="flex p-2 gap-2 items-center">
      <p>Add tags:</p>
      <div className="flex items-center justify-start gap-2 px-2">
        {tags.map((c) => (
          <Tag
            text={c}
            key={c}
            setPostTags={props.setPostTags}
            postTags={props.postTags}
          />
        ))}
      </div>
    </div>
  );
}

interface TagProps {
  text: string;
  setPostTags: (t: string[]) => void;
  postTags: string[];
}

function Tag(props: TagProps) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      className={
        "px-2 py-1 rounded-3xl border-[1px] border-indigo-600 " +
        (selected
          ? "bg-indigo-600 text-white hover:bg-indigo-500"
          : "bg-white text-indigo-600 hover:bg-indigo-100 ")
      }
      onClick={() => {
        if (selected) {
          props.setPostTags(props.postTags.filter((t) => t != props.text));
        } else {
          let newArray: string[] = props.postTags;
          newArray.push(props.text);
          props.setPostTags(newArray);
        }
        setSelected(!selected);
      }}
    >
      {props.text}
    </div>
  );
}

interface PostActionsProps {
  postTitle: string;
  postDesc: string;
  postAttachLink?: string;
  postTags?: string[];
  postCommunityId: string;
}
function PostActions(props: PostActionsProps) {
  const newPostDetails = new Object({
    title: props.postTitle,
    description: props.postDesc,
    communityId: props.postCommunityId,
    attachmentLink: props.postAttachLink!,
    tags: props.postTags!,
  });
  return (
    <div className="p-2 flex gap-3">
      <CreatePostButton newPostDetails={newPostDetails} />
      <CancelButton />
    </div>
  );
}
