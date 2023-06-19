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
import { useContext, useEffect, useState } from "react";
import CommentButton from "../buttons/AddCommentButton";
import moment from "moment";
import { CommentType } from "../../util/types";
import {
  getChildCommentsByParentId,
  getUserById,
  updateCommentById,
  updateUserById,
} from "../../util/ServerCalls";
import router from "next/router";
import { UserContext } from "../../pages/_app";

interface CommentCardProps {
  comment: CommentType;
}
export default function CommentCard(props: CommentCardProps) {
  const [showThread, setShowThread] = useState(false);
  const emptyChildComments: CommentType[] = [];
  const [childComments, setChildComments] = useState(emptyChildComments);
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const comments = await getChildCommentsByParentId(props.comment._id);
      const userfromDB = await getUserById(props.comment.posterId);
      return { comments, userfromDB };
    };
    fetchData().then((data) => {
      setChildComments(data.comments);
      setUsername(data.userfromDB.username);
      if (data.userfromDB.profileImageUrl) {
        setImageUrl(data.userfromDB.profileImageUrl);
      }
    });
  }, [props.comment._id, props.comment.posterId]);
  
  return (
    <div className="w-full bg-white border-[1px] rounded shadow-md flex flex-col p-2 gap-1 items-start">
      <CommentHeader comment={props.comment} imageUrl={imageUrl} username={username}/>
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
  username: string;
  imageUrl: string;
}
function CommentHeader(props: CommentHeaderProps) {
  return (
    <div className="w-full p-1 flex items-center gap-3 justify-start">
      <CommentUser userId={props.comment.posterId} imageUrl={props.imageUrl} username={props.username} />
      <div className="h-1 w-1 rounded bg-slate-600"></div>
      <p className="text-[10px] md:text-xs whitespace-nowrap">
        {moment(props.comment.createdAt).fromNow()}
      </p>    
    </div>
  );
}

interface CommentUserProps {
  userId: string;
  username: string;
  imageUrl: string;
}
function CommentUser(props: CommentUserProps) {
  return (
    <Link href={"/user/" + props.userId} passHref>
      <div className="flex items-center gap-2 ">
        <div className="h-6 w-6 relative">
          <Image
            className="rounded-full"
            src={props.imageUrl == "" ? defaultImage : props.imageUrl}
            alt="Default Profile Image"
           fill={true}
          />
        </div>
        <p className="text-xs md:text-sm hover:underline">{props.username}</p>
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
    <div className="w-full text-xs md:text-sm flex items-center gap-1 md:gap-2 justify-between ">
      <CommentUpvotes comment={props.comment} />
      {!props.comment.parentCommentId && <CommentReplies
        setShowThread={props.setShowThread}
        showThread={props.showThread}
        commentCount={props.childCommentCount}
      />}
      <CommentShare />
      <CommentSave commentId={props.comment._id} />
    </div>
  );
}

interface CommentUpvotesProps {
  comment: CommentType;
}
function CommentUpvotes(props: CommentUpvotesProps) {
  const loggedInUser = useContext(UserContext);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  
  useEffect(() => {
      if (loggedInUser && props.comment.upvotersId.includes(loggedInUser._id)) {
        setUpvoted(true);
      } else if (
        loggedInUser &&
        props.comment.downvotersId.includes(loggedInUser._id)
      ) {
        setDownvoted(true);
      }
  }, [loggedInUser, props.comment.downvotersId, props.comment.upvotersId]);

  async function upvoteComment() {
    if (!loggedInUser) {
      router.push("/login");
    } else {
      if (upvoted) {
        setUpvoted(false);
        let removedList = props.comment.upvotersId.filter(
          (u: string) => u != loggedInUser._id
        );
        props.comment.upvotersId = removedList;
        await updateCommentById(props.comment._id, props.comment);
      } else {
        setUpvoted(true);
        setDownvoted(false);
        props.comment.upvotersId.push(loggedInUser._id);
        let removedList = props.comment.downvotersId.filter(
          (u: string) => u != loggedInUser._id
        );
        props.comment.downvotersId = removedList;
        await updateCommentById(props.comment._id, props.comment);
      }
    }
  }

  async function downvoteComment() {
    if (!loggedInUser) {
      router.push("/login");
    } else {
      if (downvoted) {
        setDownvoted(false);
        let removedList = props.comment.downvotersId.filter(
          (u: string) => u != loggedInUser._id
        );
        props.comment.downvotersId = removedList;
        await updateCommentById(props.comment._id, props.comment);
      } else {
        setUpvoted(false);
        setDownvoted(true);
        props.comment.downvotersId.push(loggedInUser._id);
        let removedList = props.comment.upvotersId.filter(
          (u: string) => u != loggedInUser._id
        );
        props.comment.upvotersId = removedList;
        await updateCommentById(props.comment._id, props.comment);
      }
    }
  }

  return (
    <div className="flex gap-2 md:gap-3 p-2 justify-start items-center ">
      <div onClick={() => upvoteComment()}>
        {upvoted ? <UpvotedIcon /> : <UpIcon />}
      </div>{" "}
      <p className="text-sm md:text-base">
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
      className="flex gap-2 items-center hover:bg-gray-50 p-2 hover:text-blue-600"
    >
      <CommentIcon />
      <p className="">{props.commentCount} Replies</p>
    </button>
  );
}

function CommentShare() {
  return (
    <div className="flex gap-2 cursor-pointer items-center hover:bg-gray-50 p-2 hover:text-blue-600">
      <ShareIcon />
      <p className="">Share</p>
    </div>
  );
}

function CommentSave(props: { commentId: string }) {
  const loggedInUser = useContext(UserContext);
  const [saved, setSaved] = useState(false);
  
  useEffect(() => {
      if (loggedInUser && loggedInUser.savedCommentsId.includes(props.commentId)) {
        setSaved(true);
      }
  }, [loggedInUser, props.commentId]);

  async function saveComment() {
    if (!loggedInUser) {
      router.push("/login");
    } else {
      if (saved) {
        setSaved(false);
        let removedList = loggedInUser.savedCommentsId.filter(
          (p: string) => p != props.commentId
        );
        loggedInUser.savedCommentsId = removedList;
        await updateUserById(loggedInUser._id, loggedInUser);
      } else {
        setSaved(true);
        loggedInUser.savedCommentsId.push(props.commentId);
        await updateUserById(loggedInUser._id, loggedInUser);
      }
    }
  }
  return (
    <div
      className="flex gap-2 items-center cursor-pointer hover:bg-gray-50 p-2 hover:text-blue-600"
      onClick={() => saveComment()}
    >
      {saved ? <SavedIcon /> : <SaveIcon />}
      <p className={saved ? "text-blue-600" : ""}>
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
    <div className="flex w-full justify-end border-l-2 border-blue-600">
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
        className="w-full bg-gray-100 p-2 text-xs md:text-sm outline-blue-600"
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
