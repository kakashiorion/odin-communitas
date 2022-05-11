import LoginButton from "./buttons/LoginButton";
import SignupButton from "./buttons/SignupButton";
import { useRouter } from "next/router";
import {
  CollapseIcon,
  ExpandIcon,
  LogoutIcon,
  ProfileIcon,
} from "./icons/Icons";
import { useEffect, useState } from "react";
import NewPostButton from "./buttons/NewPostButton";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Image from "next/image";
import defaultProfileImage from "../public/defaultProfilePic.webp";
import { getCookie, removeCookies } from "cookies-next";
import { getUserById } from "../util/ServerCalls";
import { UserType } from "../util/types";

interface HeaderProps {
  type?: string;
}
export default function Header(props: HeaderProps) {
  const loggedInUser = getCookie("user");
  function getComponent() {
    if (loggedInUser) {
      return <UserInfo />;
    } else if (props.type == "onlylogin") {
      return <OnlyLoginButton />;
    } else if (props.type == "onlysignup") {
      return <OnlySignupButton />;
    } else {
      return <BothActionButtons />;
    }
  }

  return (
    <div className="shadow-md w-full bg-white h-14 z-20 top-0 gap-4 sticky flex justify-between items-center py-2 px-4">
      <SiteInfo />
      <SearchBar />
      {getComponent()}
    </div>
  );
}

function Logo() {
  return <div className="h-10 w-10 bg-indigo-600 rounded-3xl"></div>;
}

function SiteName() {
  return (
    <p className="text-2xl p-1 font-semibold text-indigo-600 hidden md:inline hover:bg-gray-100">
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
  const [user, setUser] = useState({} as UserType);

  useEffect(() => {
    async function fetchData() {
      const cUser = await getUserById(getCookie("user")!.toString());
      return { cUser };
    }
    fetchData().then((data) => {
      if (data.cUser) {
        setUser(data.cUser);
      }
    });
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex gap-3 items-center">
      <NewPostButton />
      <div className="flex gap-3 items-center">
        <Avatar userImageUrl={user.profileImageUrl} />
        <p className="text-sm md:text-base hidden md:inline">{user.username}</p>
        <a className="text-indigo-600">
          {isExpanded ? (
            <CollapseIcon onClick={handleClick} />
          ) : (
            <ExpandIcon onClick={handleClick} />
          )}
        </a>
        {isExpanded ? <UserDropDown userId={user._id} /> : <></>}
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

function UserDropDown(props: { userId: string }) {
  const router = useRouter();
  const logOut = () => {
    removeCookies("user");
    router.push("/");
  };

  const viewProfile = () => {
    router.push("/user/" + props.userId);
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
