import { useRouter } from "next/router";
import { CreateIcon } from "../icons/Icons";

export default function NewPostButton() {
  const router = useRouter();
  function createNewPost() {
    router.push("/post/new");
  }

  return (
    <button
      className="flex rounded-md shadow-md whitespace-nowrap text-white bg-indigo-600 hover:bg-indigo-800 py-2 px-3 h-10 items-center gap-2"
      onClick={() => createNewPost()}
    >
      <CreateIcon />
      <p className="hidden md:inline">Create post</p>
    </button>
  );
}
