import LoginButton from "./buttons/LoginButton";
import SignupButton from "./buttons/SignupButton";
import { useRouter } from "next/router";
import {
  CollapseIcon,
  ExpandIcon,
  LogoutIcon,
  ProfileIcon,
} from "./icons/Icons";
import { useState } from "react";
import NewPostButton from "./buttons/NewPostButton";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Image from "next/image";
import defaultProfileImage from "../public/defaultProfilePic.webp";
import { removeCookies } from "cookies-next";

interface HeaderProps {
  type: string;
}
export default function Header(props: HeaderProps) {
  function getComponent(t: string) {
    if (t == "loggedout") {
      return <BothActionButtons />;
    } else if (t == "onlylogin") {
      return <OnlyLoginButton />;
    } else if (t == "onlysignup") {
      return <OnlySignupButton />;
    } else if (t == "loggedin") {
      return <UserInfo />;
    }
  }
  let loginType: string = props.type;

  return (
    <div className="shadow-md w-full bg-white h-14 z-20 top-0 gap-4 sticky flex justify-between items-center py-2 px-4">
      <SiteInfo />
      <SearchBar />
      <div className="">{getComponent(loginType)}</div>
    </div>
  );
}

function Logo() {
  return <div className="h-10 w-10 bg-indigo-600 rounded-3xl"></div>;
}

function SiteName() {
  return (
    <p className="text-2xl font-semibold text-indigo-600 hidden md:inline">
      Communitas
    </p>
  );
}

function SiteInfo() {
  return (
    <Link href="/" passHref>
      <div className="flex justify-between items-center gap-3">
        <Logo />
        <SiteName />
      </div>
    </Link>
  );
}

function BothActionButtons() {
  return (
    <div className="flex gap-4 items-center">
      <LoginButton />
      <SignupButton />
    </div>
  );
}

function OnlyLoginButton() {
  const msg = "Already have an account?";
  return (
    <div className="flex gap-4 items-center">
      <p className="text-xs md:text-sm hidden sm:inline">{msg}</p>
      <LoginButton />
    </div>
  );
}

function OnlySignupButton() {
  const msg = "Don't have an account?";
  return (
    <div className="flex gap-4 items-center">
      <p className="text-xs md:text-sm hidden sm:inline">{msg}</p>
      <SignupButton />
    </div>
  );
}

function UserInfo() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex gap-3 items-center">
      <NewPostButton />
      <div className="flex gap-3 items-center">
        <Avatar />
        <p className="text-sm md:text-base hidden md:inline">User1234</p>
        <a className="text-indigo-600">
          {isExpanded ? (
            <CollapseIcon onClick={handleClick} />
          ) : (
            <ExpandIcon onClick={handleClick} />
          )}
        </a>
        {isExpanded ? <UserDropDown /> : <></>}
      </div>
    </div>
  );
}

interface AvatarProps {
  userImageUrl?: string;
}
function Avatar(props: AvatarProps) {
  return (
    <div className="h-8 w-8 relative">
      <Image
        className="rounded-full"
        src={props.userImageUrl ?? defaultProfileImage}
        alt="Profile Image"
        layout="responsive"
        width="100%"
        height="100%"
      />
    </div>
  );
}

function UserDropDown() {
  const router = useRouter();
  const logOut = () => {
    removeCookies("token");
    router.replace("/");
  };

  const viewProfile = () => {
    router.push("/profile");
  };

  return (
    <div className=" flex flex-col z-10 p-2 bg-white rounded shadow-lg fixed top-16 right-3 ">
      <UserDropDownOption
        optionName="Profile"
        icon={<ProfileIcon />}
        onClick={viewProfile}
      />
      <hr />
      <UserDropDownOption
        optionName="Logout"
        onClick={logOut}
        icon={<LogoutIcon />}
      />
    </div>
  );
}

interface UserDropDownOptionProps {
  icon: any;
  optionName: string;
  onClick: () => void;
}
function UserDropDownOption(props: UserDropDownOptionProps) {
  return (
    <>
      <button className="flex items-center gap-2 p-2" onClick={props.onClick}>
        {props.icon}
        <p className="text-sm font-medium">{props.optionName}</p>
      </button>
    </>
  );
}
