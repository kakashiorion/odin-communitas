import Link from "next/link";
import { HouseIcon } from "../icons/Icons";

export default function NewCommunityButton() {
  return (
    <Link href="/community/create" passHref>
      <button className="flex rounded-md shadow-md whitespace-nowrap text-white bg-indigo-600 hover:bg-indigo-800 py-2 px-3 h-10 items-center gap-2">
        <HouseIcon />
        <p className="">Create your own community</p>
      </button>
    </Link>
  );
}
