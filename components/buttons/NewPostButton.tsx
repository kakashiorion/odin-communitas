import { useRouter } from "next/router";
import { CreateIcon } from "../icons/Icons";

export default function NewPostButton() {
  const router = useRouter();
  function createNewPost() {
    router.push("/post/new");
  }

  return (
    <button
      className="flex rounded-full shadow-md whitespace-nowrap text-white bg-blue-600 hover:bg-blue-800 py-3 px-3 lg:px-4 items-center gap-2"
      onClick={() => createNewPost()}
    >
      <CreateIcon />
      <p className="hidden md:text-sm md:inline">CREATE POST</p>
    </button>
  );
}
