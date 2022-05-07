import defaultImage from "../../public/defaultProfilePic.webp";
import Image from "next/image";
import Link from "next/link";
import {
  UpIcon,
  DownIcon,
  SaveIcon,
  ShareIcon,
  CommentIcon,
} from "../icons/Icons";
import { useEffect, useState } from "react";
import CommentButton from "../buttons/CommentButton";
import moment from "moment";
import { CommentType, UserType } from "../../util/types";
import {
  getChildCommentsByParentId,
  getUserById,
} from "../../util/ServerCalls";

interface CommentCardProps {
  comment: CommentType;
}
export default function CommentCard(props: CommentCardProps) {
  const [showThread, setShowThread] = useState(false);
  const emptyChildComments: CommentType[] = [];
  const [childComments, setChildComments] = useState(emptyChildComments);
  const fetchData = async () => {
    const comments = await getChildCommentsByParentId(props.comment._id);
    return { comments };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setChildComments(data.comments);
    });
  });
  return (
    <div className="w-full bg-white border-[1px] rounded shadow-md flex flex-col p-2 gap-1 items-start">
      <CommentHeader comment={props.comment} />
      <CommentContent commentContent={props.comment?.content} />
      <CommentActions
        setShowThread={setShowThread}
        showThread={showThread}
        comment={props.comment}
        childCommentCount={childComments.length}
      />
      {showThread ? <CommentThread childComments={childComments} /> : <></>}
    </div>
  );
}

interface CommentHeaderProps {
  comment: CommentType;
}
function CommentHeader(props: CommentHeaderProps) {
  return (
    <div className="w-full p-1 flex items-center gap-3 justify-start">
      <CommentUser userId={props.comment.posterId} />
      <CommentTime commentTime={props.comment.createdAt} />
    </div>
  );
}

interface CommentTimeProps {
  commentTime: Date;
}
function CommentTime(props: CommentTimeProps) {
  return (
    <p className="text-[10px] md:text-xs whitespace-nowrap">
      {" "}
      {moment(props.commentTime).fromNow()}
    </p>
  );
}
interface CommentUserProps {
  userId: string;
}
function CommentUser(props: CommentUserProps) {
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const fetchData = async () => {
    const userfromDB = await getUserById(props.userId);
    return { userfromDB };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setUsername(data.userfromDB.username);
      setImageUrl(data.userfromDB.profileImageUrl);
    });
  });
  return (
    <Link href={"/user/" + props.userId} passHref>
      <div className="flex items-center gap-2 ">
        <div className="h-6 w-6 relative">
          <Image
            className="rounded-lg"
            src={imageUrl ?? defaultImage}
            alt="Random Image"
            layout="responsive"
            width="100%"
            height="100%"
          />
        </div>
        <p className="text-xs md:text-sm hover:underline">{username}</p>
      </div>
    </Link>
  );
}

interface CommentContentProps {
  commentContent: string;
}
function CommentContent(props: CommentContentProps) {
  return (
    <div className="w-full p-1 flex items-center gap-3 text-sm md:text-base">
      {props.commentContent}
    </div>
  );
}

interface CommentActionsProps {
  setShowThread: any;
  showThread: boolean;
  comment: CommentType;
  childCommentCount: number;
}
function CommentActions(props: CommentActionsProps) {
  return (
    <div className="w-full text-[10px] md:text-xs flex items-center gap-1 md:gap-2 justify-start ">
      <CommentUpvotes
        commentUpvoteCount={
          (props.comment.upvotersId.length = props.comment.downvotersId.length)
        }
      />
      <CommentReplies
        setShowThread={props.setShowThread}
        showThread={props.showThread}
        commentCount={props.childCommentCount}
      />
      <CommentShare />
      <CommentSave />
    </div>
  );
}

interface CommentUpvotesProps {
  commentUpvoteCount: number;
}
function CommentUpvotes(props: CommentUpvotesProps) {
  return (
    <div className="flex gap-1 p-2 justify-start items-center ">
      <UpIcon />
      <p className="">{props.commentUpvoteCount}</p>
      <DownIcon />
    </div>
  );
}

interface CommentRepliesProps {
  showThread: boolean;
  setShowThread: any;
  commentCount: number;
}
function CommentReplies(props: CommentRepliesProps) {
  return (
    <button
      onClick={() => props.setShowThread(!props.showThread)}
      className="flex gap-2 items-center hover:bg-gray-50 p-2 hover:text-indigo-600"
    >
      <CommentIcon />
      <p className="">{props.commentCount} Replies</p>
    </button>
  );
}

function CommentShare() {
  return (
    <div className="flex gap-2 items-center hover:bg-gray-50 p-2 hover:text-indigo-600">
      <ShareIcon />
      <p className="">Share</p>
    </div>
  );
}

function CommentSave() {
  return (
    <div className="flex gap-2 items-center hover:bg-gray-50 p-2 hover:text-indigo-600">
      <SaveIcon />
      <p className="">Save</p>
    </div>
  );
}

interface CommentThreadProps {
  childComments: CommentType[];
}
function CommentThread(props: CommentThreadProps) {
  return (
    <div className="flex w-full justify-end border-l-2">
      <div className="w-[95%] flex flex-col gap-2 items-center ">
        <AddReply />
        {props.childComments.map((c) => (
          <CommentCard comment={c} key={c._id} />
        ))}
      </div>
    </div>
  );
}

function AddReply() {
  const [commentText, setCommentText] = useState("");
  return (
    <div className="bg-white shadow-md border-[1px] rounded flex w-full p-3 gap-2 items-end">
      <textarea
        rows={1}
        placeholder="Reply to this comment!"
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full bg-gray-100 p-2 text-xs md:text-sm outline-indigo-600"
      />
      <CommentButton disabled={commentText == ""} text="Add Reply" />
    </div>
  );
}
