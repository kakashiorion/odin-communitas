import defaultImage from "../../public/defaultProfilePic.webp";
import Image from "next/image";
import Link from "next/link";
import {
  UpIcon,
  DownIcon,
  SaveIcon,
  ShareIcon,
  CommentIcon,
  SavedIcon,
  UpvotedIcon,
  DownvotedIcon,
} from "../icons/Icons";
import { useEffect, useState } from "react";
import CommentButton from "../buttons/AddCommentButton";
import moment from "moment";
import { CommentType, UserType } from "../../util/types";
import {
  getChildCommentsByParentId,
  // getCurrentUser,
  getUserById,
  updateCommentById,
  updateUserById,
} from "../../util/ServerCalls";
import { getCookie } from "cookies-next";
import router from "next/router";

interface CommentCardProps {
  comment: CommentType;
}
export default function CommentCard(props: CommentCardProps) {
  const [showThread, setShowThread] = useState(false);
  const emptyChildComments: CommentType[] = [];
  const [childComments, setChildComments] = useState(emptyChildComments);

  useEffect(() => {
    const fetchData = async () => {
      const comments = await getChildCommentsByParentId(props.comment._id);
      return { comments };
    };
    fetchData().then((data) => {
      setChildComments(data.comments);
    });
  }, [props.comment._id]);
  return (
    <div className="w-full bg-white border-[1px] rounded shadow-md flex flex-col p-2 gap-1 items-start">
      <CommentHeader comment={props.comment} />
      <CommentContent commentContent={props.comment.content} />
      <CommentActions
        setShowThread={setShowThread}
        showThread={showThread}
        comment={props.comment}
        childCommentCount={childComments.length}
      />
      {showThread ? (
        <CommentThread
          childComments={childComments}
          postId={props.comment.postId}
          commentId={props.comment._id}
        />
      ) : (
        <></>
      )}
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

  useEffect(() => {
    const fetchData = async () => {
      const userfromDB = await getUserById(props.userId);
      return { userfromDB };
    };
    fetchData().then((data) => {
      setUsername(data.userfromDB.username);
      if (data.userfromDB.profileImageUrl) {
        setImageUrl(data.userfromDB.profileImageUrl);
      }
    });
  }, [props.userId]);
  return (
    <Link href={"/user/" + props.userId} passHref>
      <div className="flex items-center gap-2 ">
        <div className="h-6 w-6 relative">
          <Image
            className="rounded-lg"
            src={imageUrl == "" ? defaultImage : imageUrl}
            alt="Default Profile Image"
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
      <CommentUpvotes comment={props.comment} />
      <CommentReplies
        setShowThread={props.setShowThread}
        showThread={props.showThread}
        commentCount={props.childCommentCount}
      />
      <CommentShare />
      <CommentSave commentId={props.comment._id} />
    </div>
  );
}

interface CommentUpvotesProps {
  comment: CommentType;
}
function CommentUpvotes(props: CommentUpvotesProps) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  useEffect(() => {
    const loggedInUser = getCookie("user");
    const fetchData = async () => {
      let cUser;
      if (loggedInUser) {
        cUser = await getUserById(loggedInUser.toString());
      }
      return { cUser };
    };
    fetchData().then((data) => {
      if (data.cUser && props.comment.upvotersId.includes(data.cUser._id)) {
        setUpvoted(true);
      } else if (
        data.cUser &&
        props.comment.downvotersId.includes(data.cUser._id)
      ) {
        setDownvoted(true);
      }
    });
  }, []);

  async function upvoteComment() {
    const loggedInUser = getCookie("user");
    if (!loggedInUser) {
      router.push("/login");
    } else {
      let cUser: UserType = await getUserById(loggedInUser.toString());
      if (upvoted) {
        setUpvoted(false);
        let removedList = props.comment.upvotersId.filter(
          (u: string) => u != cUser._id
        );
        props.comment.upvotersId = removedList;
        await updateCommentById(props.comment._id, props.comment);
      } else {
        setUpvoted(true);
        setDownvoted(false);
        props.comment.upvotersId.push(cUser._id);
        let removedList = props.comment.downvotersId.filter(
          (u: string) => u != cUser._id
        );
        props.comment.downvotersId = removedList;
        await updateCommentById(props.comment._id, props.comment);
      }
    }
  }

  async function downvoteComment() {
    const loggedInUser = getCookie("user");
    if (!loggedInUser) {
      router.push("/login");
    } else {
      let cUser: UserType = await getUserById(loggedInUser.toString());
      if (downvoted) {
        setDownvoted(false);
        let removedList = props.comment.downvotersId.filter(
          (u: string) => u != cUser._id
        );
        props.comment.downvotersId = removedList;
        await updateCommentById(props.comment._id, props.comment);
      } else {
        setUpvoted(false);
        setDownvoted(true);
        props.comment.downvotersId.push(cUser._id);
        let removedList = props.comment.upvotersId.filter(
          (u: string) => u != cUser._id
        );
        props.comment.upvotersId = removedList;
        await updateCommentById(props.comment._id, props.comment);
      }
    }
  }

  return (
    <div className="flex gap-2 p-2 justify-start items-center ">
      <div onClick={() => upvoteComment()}>
        {upvoted ? <UpvotedIcon /> : <UpIcon />}
      </div>{" "}
      <p className="">
        {props.comment.upvotersId.length - props.comment.downvotersId.length}
      </p>
      <div onClick={() => downvoteComment()}>
        {downvoted ? <DownvotedIcon /> : <DownIcon />}
      </div>{" "}
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

function CommentSave(props: { commentId: string }) {
  const [saved, setSaved] = useState(false);
  let loggedInUser = getCookie("user");
  const fetchData = async () => {
    let cUser;
    if (loggedInUser) {
      cUser = await getUserById(loggedInUser.toString());
    }
    return { cUser };
  };
  useEffect(() => {
    fetchData().then((data) => {
      if (data.cUser && data.cUser.savedCommentsId.includes(props.commentId)) {
        setSaved(true);
      }
    });
  }, []);

  async function saveComment() {
    const loggedInUser = getCookie("user");
    if (!loggedInUser) {
      router.push("/login");
    } else {
      let cUser: UserType = await getUserById(loggedInUser.toString());
      if (saved) {
        setSaved(false);
        let removedList = cUser.savedCommentsId.filter(
          (p: string) => p != props.commentId
        );
        cUser.savedCommentsId = removedList;
        await updateUserById(cUser._id, cUser);
      } else {
        setSaved(true);
        cUser.savedCommentsId.push(props.commentId);
        await updateUserById(cUser._id, cUser);
      }
    }
  }
  return (
    <div
      className="flex gap-2 items-center hover:bg-gray-50 p-2 hover:text-indigo-600"
      onClick={() => saveComment()}
    >
      {saved ? <SavedIcon /> : <SaveIcon />}
      <p className={`text-xs md:text-sm ${saved ? "text-indigo-600" : ""}`}>
        {saved ? "Saved" : "Save"}
      </p>
    </div>
  );
}

interface CommentThreadProps {
  childComments: CommentType[];
  postId: string;
  commentId: string;
}
function CommentThread(props: CommentThreadProps) {
  return (
    <div className="flex w-full justify-end border-l-2 border-indigo-600">
      <div className="w-[95%] flex flex-col gap-2 items-center ">
        <AddReply postId={props.postId} commentId={props.commentId} />
        {props.childComments.map((c) => (
          <CommentCard comment={c} key={c._id} />
        ))}
      </div>
    </div>
  );
}

interface AddReplyProps {
  postId: string;
  commentId: string;
}
function AddReply(props: AddReplyProps) {
  const [commentText, setCommentText] = useState("");
  return (
    <div className="bg-white shadow-md border-[1px] rounded flex w-full p-3 gap-2 items-end">
      <textarea
        rows={1}
        placeholder="Reply to this comment!"
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
        className="w-full bg-gray-100 p-2 text-xs md:text-sm outline-indigo-600"
      />
      <CommentButton
        disabled={commentText == ""}
        buttonText="Add Reply"
        content={commentText}
        postId={props.postId}
        parentCommentId={props.commentId}
        setCommentText={setCommentText}
      />
    </div>
  );
}
