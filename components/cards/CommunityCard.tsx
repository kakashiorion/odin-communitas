import { CommunityType } from "../../util/types";
import sampleCommImage from "../../public/commDefault.jpeg";
import Link from "next/link";
import Image from "next/image";

interface CommunityCardProps {
  community: CommunityType;
}
export default function CommunityCard(props: CommunityCardProps) {
  function getImageURL() {
    if (!props.community.imageUrl || props.community.imageUrl == "") {
      return sampleCommImage;
    }
    return props.community.imageUrl;
  }
  return (
    <div className="p-3 shadow-md bg-white hover:bg-gray-100 border-[1px] hover:border-indigo-600 flex rounded-lg w-full items-center justify-between">
      <Link href={"/community/" + props.community._id} passHref>
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 relative">
            <Image
              className="rounded-xl"
              src={getImageURL()}
              alt="Comm Image"
              layout="responsive"
              width="100%"
              height="100%"
            ></Image>
          </div>
          <p className="hover:underline">{props.community.name}</p>
        </div>
      </Link>
      <div className="flex gap-2 items-center">
        <p className="whitespace-nowrap text-xs md:text-sm">
          {props.community.members.length} members
        </p>
      </div>
    </div>
  );
}
