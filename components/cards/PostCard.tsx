import Link from "next/link";
import Image from "next/image";
import { PostType, UserType } from "../../util/types";
import JoinButton from "../buttons/JoinButton";
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
import {
  getCommunityById,
  getUserById,
  updatePostById,
  updateUserById,
} from "../../util/ServerCalls";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import router from "next/router";
import { UserContext } from "../../pages/_app";

interface PostCardProps {
  hideCommunity?: boolean;
  showWithDesc: boolean;
  post: PostType;
}
export default function PostCard(props: PostCardProps) {
  return (
    <div className="w-full bg-white rounded shadow-md flex flex-col p-3 md:p-4 gap-2 md:gap-3 items-start">
      <PostHeader
        hideCommunity={props.hideCommunity ?? false}
        post={props.post}
      />
      {props.showWithDesc ? (
        <PostDescription postDesc={props.post.description} />
      ) : (
        <></>
      )}
      {props.post.attachmentLink! ? (
        <PostAttachment attachmentLink={props.post.attachmentLink} />
      ) : (
        <></>
      )}
      <PostAction post={props.post} />
    </div>
  );
}

interface PostHeaderProps {
  hideCommunity?: boolean;
  post: PostType;
}

function PostHeader(props: PostHeaderProps) {
  return (
    <div className="w-full flex items-stretch gap-3 md:gap-4 ">
      <PostUpvotes post={props.post} />
      <PostInfo hideCommunity={props.hideCommunity} post={props.post} />
    </div>
  );
}

function PostUpvotes(props: { post: PostType }) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const loggedInUser = useContext(UserContext);
  
  useEffect(() => {
      if (loggedInUser && props.post.upvotersId.includes(loggedInUser._id))
        setUpvoted(true);
      else if (loggedInUser && props.post.downvotersId.includes(loggedInUser._id))
        setDownvoted(true);
  }, [loggedInUser, props.post.downvotersId, props.post.upvotersId]);

  async function upvotePost() {
    if (!loggedInUser) {
      router.push("/login");
    } else {
      if (upvoted) {
        setUpvoted(false);
        let removedList = props.post.upvotersId.filter(
          (u: string) => u != loggedInUser._id
        );
        props.post.upvotersId = removedList;
        await updatePostById(props.post._id, props.post);
      } else {
        setUpvoted(true);
        setDownvoted(false);
        props.post.upvotersId.push(loggedInUser._id);
        let removedList = props.post.downvotersId.filter(
          (u: string) => u != loggedInUser._id
        );
        props.post.downvotersId = removedList;
        await updatePostById(props.post._id, props.post);
      }
    }
  }

  async function downvotePost() {
    if (!loggedInUser) {
      router.push("/login");
    } else {
      if (downvoted) {
        setDownvoted(false);
        let removedList = props.post.downvotersId.filter(
          (u: string) => u != loggedInUser._id
        );
        props.post.downvotersId = removedList;
        await updatePostById(props.post._id, props.post);
      } else {
        setUpvoted(false);
        setDownvoted(true);
        props.post.downvotersId.push(loggedInUser._id);
        let removedList = props.post.upvotersId.filter(
          (u: string) => u != loggedInUser._id
        );
        props.post.upvotersId = removedList;
        await updatePostById(props.post._id, props.post);
      }
    }
  }

  return (
    <div className="flex w-8 md:w-10 shrink-0 flex-col gap-1 justify-center items-center ">
      <div onClick={() => upvotePost()}>
        {upvoted ? <UpvotedIcon /> : <UpIcon />}
      </div>
      <UpvoteCount
        upvoteCount={
          props.post.upvotersId.length - props.post.downvotersId.length
        }
      />
      <div onClick={() => downvotePost()}>
        {downvoted ? <DownvotedIcon /> : <DownIcon />}
      </div>
    </div>
  );
}

function UpvoteCount(props: { upvoteCount: number }) {
  return <p className="text-xs md:text-sm">{props.upvoteCount}</p>;
}

interface PostInfoProps {
  hideCommunity?: boolean;
  post: PostType;
}
function PostInfo(props: PostInfoProps) {
  return (
    <div className="flex w-full flex-col gap-1 md:gap-2 justify-start items-start ">
      <PostTopLine hideCommunity={props.hideCommunity} post={props.post} />
      <PostTitle postTitle={props.post.title} postId={props.post._id} />
      <PostTags tags={props.post.tags} />
    </div>
  );
}

interface PostTopLineProps {
  hideCommunity?: boolean;
  post: PostType;
}
function PostTopLine(props: PostTopLineProps) {
  const [joinStatus, setJoinStatus] = useState(false);
  const loggedInUser = useContext(UserContext);

  useEffect(() => {
      if (loggedInUser) {
        setJoinStatus(loggedInUser.communities.includes(props.post.communityId));
      }
  }, [loggedInUser, props.post.communityId]);

  return (
    <div className="flex w-full justify-between items-center">
      <PosterInfo hideCommunity={props.hideCommunity} post={props.post} />
      {/* {props.hideCommunity ? (
        <></>
      ) : (
        <JoinButton
          commId={props.post.communityId}
          joinStatus={joinStatus}
          setJoinStatus={setJoinStatus}
        />
      )} */}
    </div>
  );
}

interface PosterInfoProps {
  hideCommunity?: boolean;
  post: PostType;
}
function PosterInfo(props: PosterInfoProps) {
  return (
    <div className="flex gap-2 md:gap-3 justify-start items-center">
      {props.hideCommunity ? (
        <></>
        ) : (
        <>
          <PostCommunity commId={props.post.communityId} />
          <div className="h-1 w-1 rounded bg-slate-600"></div>
        </>
      )}
      <PostUser posterId={props.post.posterId} />
      <div className="h-1 w-1 rounded bg-slate-600"></div>
      <PostTime pTimeAgo={moment(props.post.createdAt).fromNow()} />
    </div>
  );
}

interface PostCommunityProps {
  commId: string;
}
function PostCommunity(props: PostCommunityProps) {
  const [postCommunityName, setPostCommunityName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const cName = (await getCommunityById(props.commId)).name;
      return { cName };
    };
    fetchData().then((data) => {
      setPostCommunityName(data.cName);
    });
  },[props.commId]);
  return (
    <Link href={"/community/" + props.commId} legacyBehavior>
      <a className="text-xs md:text-sm font-semibold hover:text-blue-600">
        c/{postCommunityName}
      </a>
    </Link>
  );
}

interface PostUserProps {
  posterId: string;
}
function PostUser(props: PostUserProps) {
  const [postUserName, setPostUserName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const uName = (await getUserById(props.posterId)).username;
      return { uName };
    };
    fetchData().then((data) => {
      setPostUserName(data.uName);
    });
  },[props.posterId]);
  return (
    <Link href={"/user/" + props.posterId} passHref legacyBehavior>
      <p className="text-xs md:text-sm cursor-pointer hover:underline whitespace-nowrap">{postUserName}</p>
    </Link>
  );
}
function PostTime(props: { pTimeAgo: string }) {
  return (
    <p className="text-xs md:text-sm text-gray-600 whitespace-nowrap">{props.pTimeAgo}</p>
  );
}

interface PostTitleProps {
  postId: string;
  postTitle: string;
}
function PostTitle(props: PostTitleProps) {
  return (
    <Link href={"/post/" + props.postId} passHref legacyBehavior>
      <a className="text-lg md:text-xl font-medium hover:text-blue-600">
        {props.postTitle}
      </a>
    </Link>
  );
}

function PostTags(props: { tags: string[] }) {
  return (
    <div className="flex gap-2">
      {props.tags.map((t: string) => (
        <PostTag tag={t} key={t} />
      ))}
    </div>
  );
}

function PostTag(props: { tag: string }) {
  return (
    <div className="px-2 py-1 rounded-full bg-orange-200 text-[10px] md:text-xs ">
      {props.tag}
    </div>
  );
}

function PostAttachment(props: { attachmentLink: string }) {
  return (
    <div className="w-full h-40 sm:h-60 bg-gray-200 relative">
      <Image src={props.attachmentLink} alt="" fill={true} />
    </div>
  );
}

interface PostDescriptionProps {
  postDesc: string;
}
function PostDescription(props: PostDescriptionProps) {
  return (
    <div className="w-full h-30 px-2 py-1 text-sm md:text-base ">
      {props.postDesc}
    </div>
  );
}

function PostAction(props: { post: PostType }) {
  return (
    <div className="w-full flex items-center justify-between gap-3 ">
      <Comments
        postId={props.post._id}
        postComments={props.post.commentsId.length}
      />
      <Share />
      <Save postId={props.post._id} />
    </div>
  );
}

interface CommentsProps {
  postId: string;
  postComments: number;
}
function Comments(props: CommentsProps) {
  return (
    <Link href={"/post/" + props.postId} passHref legacyBehavior>
      <button className="flex gap-2 items-center hover:bg-gray-50 p-2 hover:text-blue-600">
        <CommentIcon />
        <p className="text-xs md:text-sm">{props.postComments} Comments</p>
      </button>
    </Link>
  );
}

function Share() {
  return (
    <div className="flex gap-2 cursor-pointer items-center hover:bg-gray-50 p-2 hover:text-blue-600">
      <ShareIcon />
      <p className="text-xs md:text-sm">Share</p>
    </div>
  );
}

function Save(props: { postId: string }) {
  const [saved, setSaved] = useState(false);
  const loggedInUser = useContext(UserContext);

  useEffect(() => { 
      if (loggedInUser && loggedInUser.savedPostsId.includes(props.postId)) {
        setSaved(true);
      }
  }, [loggedInUser, props.postId]);

  async function savePost() {
    if (!loggedInUser) {
      router.push("/login");
    } else {
      if (saved) {
        setSaved(false);
        let removedList = loggedInUser.savedPostsId.filter(
          (p: string) => p != props.postId
        );
        loggedInUser.savedPostsId = removedList;
        await updateUserById(loggedInUser._id, loggedInUser);
      } else {
        setSaved(true);
        loggedInUser.savedPostsId.push(props.postId);
        await updateUserById(loggedInUser._id, loggedInUser);
      }
    }
  }

  return (
    <div
      className="flex gap-2 cursor-pointer items-center hover:bg-gray-50 p-2 hover:text-blue-600"
      onClick={() => savePost()}
    >
      {saved ? <SavedIcon /> : <SaveIcon />}
      <p className={`text-xs md:text-sm ${saved ? "text-blue-600" : ""}`}>
        {saved ? "Saved" : "Save"}
      </p>
    </div>
  );
}