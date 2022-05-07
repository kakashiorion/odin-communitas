import { LoginIcon } from "../icons/Icons";
import Link from "next/link";

export default function LoginActionButton() {
  return (
    <>
      <Link href="" passHref>
        <button className="h-10 w-1/2 bg-indigo-600 hidden sm:inline hover:bg-indigo-800 rounded-md px-4 text-white ">
          Login
        </button>
      </Link>
      <Link href="" passHref>
        <button className="h-10 w-1/2 bg-indigo-600 sm:hidden hover:bg-indigo-800 rounded-md px-3 text-white ">
          <LoginIcon />
        </button>
      </Link>
    </>
  );
}
