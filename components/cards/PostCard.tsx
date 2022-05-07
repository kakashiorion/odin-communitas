import Link from "next/link";
import Image from "next/image";
import { PostType } from "../../util/types";
import JoinButton from "../buttons/JoinButton";
import {
  UpIcon,
  DownIcon,
  SaveIcon,
  ShareIcon,
  CommentIcon,
} from "../icons/Icons";
import {
  getCommunityById,
  getCurrentUser,
  getUserById,
} from "../../util/ServerCalls";
import { useEffect, useState } from "react";
import moment from "moment";

interface PostCardProps {
  hideCommunity?: boolean;
  showWithDesc?: boolean;
  post: PostType;
}
export default function PostCard(props: PostCardProps) {
  return (
    <div className="w-full bg-white rounded shadow-md flex flex-col px-3 py-2 gap-1 items-start">
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
    <div className="w-full px-1 flex items-center gap-3 ">
      <PostUpvotes
        upvoteCount={
          props.post.upvotersId.length - props.post.downvotersId.length
        }
      />
      <PostInfo hideCommunity={props.hideCommunity} post={props.post} />
    </div>
  );
}

function PostUpvotes(props: { upvoteCount: number }) {
  return (
    <div className="flex flex-col gap-0 justify-center items-center ">
      <UpIcon />
      <UpvoteCount upvoteCount={props.upvoteCount} />
      <DownIcon />
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
    <div className="flex w-full flex-col justify-center items-start ">
      <PostTopLine hideCommunity={props.hideCommunity} post={props.post} />
      <PostBottomLine post={props.post} />
    </div>
  );
}

interface PostTopLineProps {
  hideCommunity?: boolean;
  post: PostType;
}
function PostTopLine(props: PostTopLineProps) {
  const emptyUser: any = new Object();
  const [cUser, setCUser] = useState(emptyUser);
  const fetchData = async () => {
    const currentUser = await getCurrentUser();
    return { currentUser };
  };
  const [joinStatus, setJoinStatus] = useState(false);
  useEffect(() => {
    fetchData().then((data) => {
      setCUser(data.currentUser);
      setJoinStatus(
        data.currentUser.communities.includes(props.post.communityId)
      );
    });
  }, [props.post.communityId]);
  return (
    <div className="flex w-full justify-between items-center">
      <PosterInfo hideCommunity={props.hideCommunity} post={props.post} />
      {props.hideCommunity ? (
        <></>
      ) : (
        <JoinButton
          commId={props.post.communityId}
          currentUser={cUser}
          joinStatus={joinStatus}
          setJoinStatus={setJoinStatus}
        />
      )}
    </div>
  );
}

interface PosterInfoProps {
  hideCommunity?: boolean;
  post: PostType;
}
function PosterInfo(props: PosterInfoProps) {
  return (
    <div className="flex gap-3 justify-start items-baseline">
      {props.hideCommunity ? (
        <></>
      ) : (
        <PostCommunity commId={props.post.communityId} />
      )}
      <PostUser pUserId={props.post.posterId} />
      <PostTime pTimeAgo={moment(props.post.createdAt).fromNow()} />
    </div>
  );
}

interface PostCommunityProps {
  commId: string;
}
function PostCommunity(props: PostCommunityProps) {
  const [postCommunityName, setPostCommunityName] = useState("");
  const fetchData = async () => {
    const cName = (await getCommunityById(props.commId)).name;
    return { cName };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setPostCommunityName(data.cName);
    });
  });
  return (
    <Link href={"/community/" + props.commId}>
      <a className="text-xs md:text-sm font-semibold hover:text-indigo-600">
        c/{postCommunityName}
      </a>
    </Link>
  );
}

interface PostUserProps {
  pUserId: string;
}
function PostUser(props: PostUserProps) {
  const [postUserName, setPostUserName] = useState("");
  const fetchData = async () => {
    const uName = (await getUserById(props.pUserId)).username;
    return { uName };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setPostUserName(data.uName);
    });
  });
  return (
    <Link href={"/user/" + props.pUserId} passHref>
      <p className="text-xs md:text-sm hover:underline whitespace-nowrap">
        By {postUserName}
      </p>
    </Link>
  );
}
function PostTime(props: { pTimeAgo: string }) {
  return (
    <p className="text-[10px] md:text-xs whitespace-nowrap">
      {" "}
      {props.pTimeAgo}
    </p>
  );
}

function PostBottomLine(props: { post: PostType }) {
  return (
    <div className="flex justify-start gap-3 items-end">
      <PostTitle postTitle={props.post.title} postId={props.post._id} />
      <PostTags tags={props.post.tags} />
    </div>
  );
}

interface PostTitleProps {
  postId: string;
  postTitle: string;
}
function PostTitle(props: PostTitleProps) {
  return (
    <Link href={"/post/" + props.postId} passHref>
      <a className="text-lg md:text-xl font-medium hover:text-indigo-600">
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
    <div className="px-2 py-1 rounded-xl bg-orange-200 text-[10px] md:text-xs ">
      {props.tag}
    </div>
  );
}

function PostAttachment(props: { attachmentLink: string }) {
  return (
    <div className="w-full h-60 bg-gray-200 ">
      {props.attachmentLink ? (
        <Image src={props.attachmentLink} alt="" />
      ) : (
        <></>
      )}
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
    <div className="w-full py-1 flex items-center gap-3 ">
      <Comments
        postId={props.post._id}
        postComments={props.post.commentsId.length}
      />
      <Share />
      <Save />
    </div>
  );
}

interface CommentsProps {
  postId: string;
  postComments: number;
}
function Comments(props: CommentsProps) {
  return (
    <Link href={"/post/" + props.postId} passHref>
      <button className="flex gap-2 items-center hover:bg-gray-50 p-2 hover:text-indigo-600">
        <CommentIcon />
        <CommentCount commentCount={props.postComments} />
      </button>
    </Link>
  );
}

function Share() {
  return (
    <div className="flex gap-2 items-center hover:bg-gray-50 p-2 hover:text-indigo-600">
      <ShareIcon />
      <p className="text-xs md:text-sm">Share</p>
    </div>
  );
}

function Save() {
  return (
    <div className="flex gap-2 items-center hover:bg-gray-50 p-2 hover:text-indigo-600">
      <SaveIcon />
      <p className="text-xs md:text-sm">Save</p>
    </div>
  );
}

interface CommentCountProps {
  commentCount: number;
}
function CommentCount(props: CommentCountProps) {
  return <p className="text-xs md:text-sm">{props.commentCount} Comments</p>;
}
