import Link from "next/link";
import { SignupIcon } from "../icons/Icons";

export default function SignupButton() {
  return (
    <>
      <Link href="/signup" passHref>
        <button className="border-blue-600 border text-blue-600 text-xs lg:text-sm hidden sm:inline hover:bg-blue-600 hover:text-white rounded-full px-4 py-2">
          SIGNUP
        </button>
        <button className="border-blue-600 border sm:hidden hover:bg-blue-600 text-blue-600 rounded-full px-3 py-2 hover:text-white">
          <SignupIcon />
        </button>
      </Link>
    </>
  );
}
