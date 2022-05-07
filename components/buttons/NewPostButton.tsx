import Link from "next/link";
import { CreateIcon } from "../icons/Icons";

export default function NewPostButton() {
  return (
    <Link href="/post/new" passHref>
      <button className="flex rounded-md shadow-md whitespace-nowrap text-white bg-indigo-600 hover:bg-indigo-800 py-2 px-3 h-10 items-center gap-2">
        <CreateIcon />
        <p className="hidden md:inline">Create post</p>
      </button>
    </Link>
  );
}
