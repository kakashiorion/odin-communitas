import Image from "next/image";
import Link from "next/link";
import loginImage from "../../public/loginImg.jpeg";
import LoginActionButton from "../buttons/LoginActionButton";
import { GithubLoginButton, GoogleLoginButton } from "../buttons/LoginButton";
import { GithubIcon, GoogleIcon } from "../icons/Icons";
export default function LoginCard() {
  return (
    <div className="p-2 w-full lg:w-[1024px]">
      <div className="flex shadow-md ">
        <LoginImageSample />
        <LoginContent />
      </div>
    </div>
  );
}

function LoginContent() {
  return (
    <div className="flex flex-col bg-white w-full md:w-2/3 p-6 md:p-8 gap-6 justify-between items-center ">
      <p className="text-xl md:text-2xl font-bold">Login to Communitas</p>
      {/* <GoogleLoginButton /> */}
      {/* <GithubLoginButton /> */}
      <Seperator />
      <EnterUsername />
      <EnterPassword />
      <LoginActionButton />
      <Forgot />
    </div>
  );
}

function Seperator() {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-20 h-[1px] bg-gray-400" />
      <p className="text-gray-400 text-sm">OR</p>
      <div className="w-20 h-[1px] bg-gray-400" />
    </div>
  );
}
function EnterUsername() {
  return (
    <div className="w-4/5">
      <input
        type="text"
        className="flex text-sm md:text-base items-center rounded-sm focus:border-indigo-600 bg-stone-100 h-10 w-full px-2"
        placeholder="Enter your username"
        id="username"
      />
    </div>
  );
}
function EnterPassword() {
  return (
    <div className="w-4/5">
      <input
        type="password"
        className="flex text-sm md:text-base items-center rounded-sm focus:border-indigo-600 bg-stone-100 h-10 w-full px-2"
        placeholder="Enter your password"
        id="password"
      />
    </div>
  );
}

function Forgot() {
  return (
    <div className="text-xs">
      Forgot your <a className="text-indigo-600 underline">username</a> or{" "}
      <a className="text-indigo-600 underline">password</a>?
    </div>
  );
}

function LoginImageSample() {
  return (
    <div className="w-1/3 hidden md:flex">
      <Image src={loginImage} alt="Login to Communitas" />
    </div>
  );
}
