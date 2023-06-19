import { LoginIcon } from "../icons/Icons";
import Link from "next/link";

export default function LoginButton() {
  return (
    <>
      <Link href="/login" passHref>
        <button className="bg-blue-600 text-xs border border-blue-600 hover:border-blue-800 lg:text-sm hidden sm:inline hover:bg-blue-800 rounded-full px-4 py-2 text-white ">
          LOGIN
        </button>
        <button className="bg-blue-600 sm:hidden border border-blue-600 hover:border-blue-800 hover:bg-blue-800 rounded-full px-3 py-2 text-white ">
          <LoginIcon />
        </button>
      </Link>
    </>
  );
}
