import Link from "next/link";
import { SignupIcon } from "../icons/Icons";

export default function SignupButton() {
  return (
    <>
      <Link href="/signup" passHref>
        <button className="h-10 bg-indigo-600 hidden sm:inline hover:bg-indigo-800 rounded-md px-4 text-white">
          Signup
        </button>
      </Link>
      <Link href="/signup" passHref>
        <button className="h-10 bg-indigo-600 sm:hidden hover:bg-indigo-800 rounded-md px-3 text-white">
          <SignupIcon />
        </button>
      </Link>
    </>
  );
}
