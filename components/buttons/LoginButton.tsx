import { GithubIcon, GoogleIcon, LoginIcon } from "../icons/Icons";
import Link from "next/link";

export default function LoginButton() {
  return (
    <>
      <Link href="/login" passHref>
        <button className="h-10 bg-indigo-600 hidden sm:inline hover:bg-indigo-800 rounded-md px-4 text-white ">
          Login
        </button>
      </Link>
      <Link href="/login" passHref>
        <button className="h-10 bg-indigo-600 sm:hidden hover:bg-indigo-800 rounded-md px-3 text-white ">
          <LoginIcon />
        </button>
      </Link>
    </>
  );
}

export function GoogleLoginButton() {
  return (
    <Link href="/api/auth/google" passHref>
      <button className="p-3 border-2 border-black rounded-3xl flex gap-3 items-center hover:bg-gray-200">
        <GoogleIcon />
        <p className="text-xs md:text-sm">Continue with Google</p>
      </button>
    </Link>
  );
}

export function GithubLoginButton() {
  return (
    <Link href="/api/auth/github" passHref>
      <button className="p-3 border-2 border-black rounded-md flex gap-3 items-center hover:bg-gray-200">
        <GithubIcon />
        <p className="text-xs md:text-sm">Continue with Github</p>
      </button>
    </Link>
  );
}
