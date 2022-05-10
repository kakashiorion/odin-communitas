import { UserType } from "../../util/types";
import defaultProfilePic from "../../public/defaultProfilePic.webp";
import Link from "next/link";
import Image from "next/image";

interface UserCardProps {
  user: UserType;
}
export default function UserCard(props: UserCardProps) {
  function getImageURL() {
    if (!props.user.profileImageUrl || props.user.profileImageUrl == "") {
      return defaultProfilePic;
    }
    return props.user.profileImageUrl;
  }
  return (
    <div className="p-3 shadow-md bg-white hover:bg-gray-100 border-[1px] hover:border-indigo-600 flex rounded-lg w-full items-center justify-between">
      <Link href={"/user/" + props.user._id} passHref>
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 relative">
            <Image
              className="rounded-xl"
              src={getImageURL()}
              alt="User Image"
              layout="responsive"
              width="100%"
              height="100%"
            ></Image>
          </div>
          <p className="hover:underline">{props.user.username}</p>
        </div>
      </Link>
      <div className="flex gap-2 items-center">
        <p className="whitespace-nowrap text-xs md:text-sm">
          {props.user.comments.length} comments
        </p>
        <p className="whitespace-nowrap text-xs md:text-sm">
          {props.user.posts.length} posts
        </p>
      </div>
    </div>
  );
}
