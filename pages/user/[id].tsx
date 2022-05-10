import { useEffect, useState } from "react";
import CommentCard from "../../components/cards/CommentCard";
import PostCard from "../../components/cards/PostCard";
import Header from "../../components/Header";
import Image from "next/image";
import defaultProfileImage from "../../public/defaultProfilePic.webp";
import {
  getCommentsByUserId,
  getPostsByUserId,
  getUserById,
  getUsers,
} from "../../util/ServerCalls";
import { PostType, UserType, CommentType } from "../../util/types";
import moment from "moment";

export async function getStaticPaths() {
  const results: UserType[] = await getUsers();

  return {
    paths: results.map((user) => {
      return { params: { id: String(user._id) } };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: {
      user: await getUserById(params.id),
    },
  };
}

interface ProfilePageProps {
  user: UserType;
}
export default function ProfilePage(props: ProfilePageProps) {
  return (
    <div className="flex flex-col gap-3 md:gap-4 items-center">
      <Header />
      <ProfileSection user={props.user} />
      <UserContent user={props.user} />
    </div>
  );
}

interface ProfileSectionProps {
  user: UserType;
}
export function ProfileSection(props: ProfileSectionProps) {
  return (
    <div className="flex flex-col p-2 w-full md:w-[768px]">
      <SampleTopPlaceholder />
      <ProfileInfo user={props.user} />
    </div>
  );
}

export function SampleTopPlaceholder() {
  return (
    <div className="bg-indigo-600 shadow-md  h-16 md:h-20 w-full rounded-t-2xl"></div>
  );
}

interface ProfileInfoProps {
  user: UserType;
}
export function ProfileInfo(props: ProfileInfoProps) {
  return (
    <div className="bg-white shadow-md h-32 md:h-40 z-0 rounded-b-2xl w-full flex flex-col relative items-center ">
      <ProfileData user={props.user} />
    </div>
  );
}

interface ProfileDataProps {
  user: UserType;
}
export function ProfileData(props: ProfileDataProps) {
  return (
    <div className="absolute w-full top-[-48px] md:top-[-48px] flex flex-col items-center gap-2">
      <ProfileAvatar userImageUrl={props.user.profileImageUrl} />
      <ProfileName username={props.user.username} />
      <ProfileDetails user={props.user} />
    </div>
  );
}

interface ProfileAvatarProps {
  userImageUrl?: string;
}
export function ProfileAvatar(props: ProfileAvatarProps) {
  return (
    <div className="h-20 md:h-24 w-20 md:w-24 relative">
      <Image
        className="rounded-full"
        src={props.userImageUrl ?? defaultProfileImage}
        alt="Profile Image"
        layout="responsive"
        width="100%"
        height="100%"
      />
    </div>
  );
}

interface ProfileNameProps {
  username: string;
}
export function ProfileName(props: ProfileNameProps) {
  return <div className="text-lg md:text-xl">{props.username}</div>;
}

interface ProfileDetailsProps {
  user: UserType;
}
export function ProfileDetails(props: ProfileDetailsProps) {
  return (
    <div className="grid grid-cols-3 w-full p-2 md:p-3  gap-3">
      <JoinInfo joinDate={props.user.createdAt} />
      <PostsInfo postCount={props.user.posts.length} />
      <CommentsInfo commentCount={props.user.comments.length} />
    </div>
  );
}

interface JoinInfoProps {
  joinDate: Date;
}
export function JoinInfo(props: JoinInfoProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center ">
      <p className="text-sm md:text-base font-semibold">Join Date</p>
      <p className="text-xs md:text-sm">
        {moment(props.joinDate).format("DD MMM YYYY")}
      </p>
    </div>
  );
}

interface CommentInfoProps {
  commentCount: number;
}
export function CommentsInfo(props: CommentInfoProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center  ">
      <p className="text-sm md:text-base font-semibold">Comments</p>
      <p className="text-xs md:text-sm">{props.commentCount}</p>
    </div>
  );
}

interface PostsInfoProps {
  postCount: number;
}
export function PostsInfo(props: PostsInfoProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center  ">
      <p className="text-xs md:text-base font-semibold">Posts</p>
      <p className="text-xs md:text-sm">{props.postCount}</p>
    </div>
  );
}

interface UserContentProps {
  user: UserType;
}
export function UserContent(props: UserContentProps) {
  const [browsing, setBrowsing] = useState("Posts");

  return (
    <div className="flex flex-col p-2 w-full gap-3 md:w-[768px] items-center ">
      <ContentSelector browsing={browsing} setBrowsing={setBrowsing} />
      {browsing == "Posts" ? <PostsContent user={props.user} /> : null}
      {browsing == "Comments" ? <CommentsContent user={props.user} /> : null}
    </div>
  );
}

interface ContentSelectorProps {
  browsing: string;
  setBrowsing: (s: string) => void;
}
export function ContentSelector(props: ContentSelectorProps) {
  return (
    <div className="flex justify-around shadow-md p-2 w-full rounded-t-xl bg-white">
      <button
        className={
          "hover:text-indigo-600 border-indigo-400 w-1/3" +
          (props.browsing == "Posts" ? " border-b-4 " : "")
        }
        onClick={() => props.setBrowsing("Posts")}
      >
        <p className="p-2">Posts</p>
      </button>
      <button
        className={
          "hover:text-indigo-600 border-indigo-400 w-1/3" +
          (props.browsing == "Comments" ? " border-b-4 " : "")
        }
        onClick={() => props.setBrowsing("Comments")}
      >
        <p className="p-2">Comments</p>
      </button>
    </div>
  );
}

interface PostsContentProps {
  user: UserType;
}
export function PostsContent(props: PostsContentProps) {
  const emptyPosts: PostType[] = [];
  const [userPosts, setUserPosts] = useState(emptyPosts);

  const fetchData = async () => {
    const posts = await getPostsByUserId(props.user._id);
    return { posts };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setUserPosts(data.posts);
    });
  });
  return (
    <div className="flex flex-col rounded-b-xl gap-3 w-full justify-center">
      {userPosts.length > 0 ? (
        userPosts.map((p) => (
          <PostCard
            post={p}
            hideCommunity={false}
            showWithDesc={false}
            key={p._id}
          />
        ))
      ) : (
        <p className="p-2 flex justify-center">No posts yet!</p>
      )}
    </div>
  );
}

interface CommentsContentProps {
  user: UserType;
}
export function CommentsContent(props: CommentsContentProps) {
  const emptyComments: CommentType[] = [];
  const [userComments, setUserComments] = useState(emptyComments);
  const fetchData = async () => {
    const comments = await getCommentsByUserId(props.user._id);
    return { comments };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setUserComments(data.comments);
    });
  });
  return (
    <div className="flex flex-col rounded-b-xl gap-3 w-full justify-center">
      {userComments.length > 0 ? (
        userComments.map((c) => <CommentCard comment={c} key={c._id} />)
      ) : (
        <p className="p-2 flex justify-center">No comments yet!</p>
      )}
    </div>
  );
}
