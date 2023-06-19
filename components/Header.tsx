import LoginButton from "./buttons/LoginButton";
import SignupButton from "./buttons/SignupButton";
import { useRouter } from "next/router";
import {
  CollapseIcon,
  ExpandIcon,
  LogoutIcon,
  ProfileIcon,
} from "./icons/Icons";
import { useContext, useEffect, useState } from "react";
import NewPostButton from "./buttons/NewPostButton";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Image from "next/image";
import defaultProfileImage from "../public/defaultProfilePic.webp";
import { removeCookies } from "cookies-next";
import LogoOrig from "../public/LogoOrig.svg"
import { UserContext } from "../pages/_app";

interface HeaderProps {
  type?: string;
}
export default function Header(props: HeaderProps) {
  const [comp, setComp] =useState(<BothActionButtons />)
  const user = useContext(UserContext);
  
  useEffect(() =>{
    if (user) {
      setComp(<UserInfo />)
    } else if (props.type == "onlylogin") {
      setComp(<OnlyLoginButton />)
    } else if (props.type == "onlysignup") {
      setComp(<OnlySignupButton />);
    }
  },[user, props.type])

  return (
    <div className="shadow-md w-full bg-white z-50 top-0 gap-4 md:gap-6 sticky flex justify-between items-center py-2 px-6 md:px-8">
      <SiteInfo />
      <SearchBar />
      {comp}
    </div>
  );
}

function Logo() {
  return <div className="h-8 w-8">
    <Image
        src={LogoOrig}
        alt="Logo Image"
      />
  </div>;
}

function SiteName() {
  return (
    <p className="text-xl font-semibold text-blue-600 hidden md:inline hover:bg-gray-100">
      Communitas
    </p>
  );
}

function SiteInfo() {
  return (
    <Link href="/" passHref>
      <div className="flex justify-between items-center gap-2">
        <Logo />
        <SiteName />
      </div>
    </Link>
  );
}

function BothActionButtons() {
  return (
    <div className="flex gap-2 items-center justify-end">
      <LoginButton />
      <SignupButton />
    </div>
  );
}

function OnlyLoginButton() {
  const msg = "Already have an account?";
  return (
    <div className="flex gap-2 items-center justify-end">
      <p className="text-sm hidden lg:inline">{msg}</p>
      <LoginButton />
    </div>
  );
}

function OnlySignupButton() {
  const msg = "Don't have an account?";
  return (
    <div className="flex gap-2 items-center justify-end">
      <p className="text-sm hidden lg:inline">{msg}</p>
      <SignupButton />
    </div>
  );
}

function UserInfo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const user = useContext(UserContext)

  return (
    <div className="flex gap-3 items-center">
      <NewPostButton />
      <div className="flex gap-3 items-center">
        <Avatar userImageUrl={user?.profileImageUrl} />
        {/* <p className="lg:text-base hidden lg:flex">{user.username}</p> */}
        <div className="text-blue-600" onClick={()=>setIsExpanded(!isExpanded)}>
          {isExpanded ?<CollapseIcon />:<ExpandIcon />}
        </div>
        {isExpanded ? <UserDropDown userId={user?._id} /> : <></>}
      </div>
    </div>
  );
}

interface AvatarProps {
  userImageUrl?: string;
}
function Avatar(props: AvatarProps) {
  return (
    <div className="h-8 w-8 hidden sm:flex relative">
      <Image
        className="rounded-full"
        src={props.userImageUrl ?? defaultProfileImage}
        alt="Profile Image"
        fill={true}
      />
    </div>
  );
}

function UserDropDown(props: { userId?: string }) {
  const router = useRouter();
  const logOut = () => {
    removeCookies("user");
    router.push("/");
  };

  const viewProfile = () => {
    router.push("/user/" + props.userId);
  };

  return (
    <div className=" flex flex-col z-100 p-2 bg-white rounded shadow-lg fixed top-16 right-3 ">
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
      <button className="flex hover:bg-blue-200 rounded items-center gap-2 p-2" onClick={props.onClick}>
        {props.icon}
        <p className="text-sm font-medium">{props.optionName}</p>
      </button>
    </>
  );
}
