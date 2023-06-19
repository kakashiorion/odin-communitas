import Link from "next/link";
import { HouseIcon } from "../icons/Icons";

export default function NewCommunityButton() {
  return (
    <Link href="/community/create" passHref>
      <button className="flex rounded-full shadow-md whitespace-nowrap text-white bg-blue-600 hover:bg-blue-800 py-3 px-4 items-center gap-2">
        <HouseIcon />
        <p className="">Create your own community</p>
      </button>
    </Link>
  );
}
