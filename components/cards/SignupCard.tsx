import { GoogleIcon } from "../icons/Icons";
import Image from "next/image";
import signupImage from "../../public/loginImage.jpeg";
import SignupActionButton from "../buttons/SignupActionButton";
import { GithubLoginButton, GoogleLoginButton } from "../buttons/LoginButton";

export default function SignupCard() {
  return (
    <div className="p-2 w-full lg:w-[1024px]">
      <div className="flex shadow-md">
        <SignupImageSample />
        <SignupContent />
      </div>
    </div>
  );
}

function SignupContent() {
  return (
    <div className="flex flex-col bg-white w-full md:w-2/3 p-6 md:p-8 gap-6 justify-between items-center ">
      <p className="text-xl md:text-2xl font-bold">Sign up to Communitas!</p>
      <EnterEmail />
      <EnterUsername />
      <EnterPassword />
      <SignupActionButton />
      <Seperator />
      {/* <GoogleLoginButton /> */}
      {/* <GithubLoginButton /> */}
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

function EnterEmail() {
  return (
    <div className=" w-4/5">
      <input
        type="text"
        className="flex text-sm md:text-base items-center rounded-sm focus:border-indigo-600 bg-stone-100 h-10 w-full px-2"
        placeholder="Enter your email"
        id="email"
      />
    </div>
  );
}

function EnterUsername() {
  return (
    <div className=" w-4/5">
      <input
        type="text"
        className="flex text-sm md:text-base items-center rounded-sm focus:border-indigo-600 bg-stone-100 h-10 w-full px-2"
        placeholder="Choose username"
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
        className="flex items-center rounded-sm focus:border-indigo-600 bg-stone-100 h-10 w-full px-2"
        placeholder="Choose password"
        id="password"
      />
    </div>
  );
}

function SignupImageSample() {
  return (
    <div className="w-1/3 hidden md:flex">
      <Image src={signupImage} alt="Signup to Communitas" />
    </div>
  );
}
