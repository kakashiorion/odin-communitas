import { GoogleIcon } from "../icons/Icons";
import Image from "next/image";
import signupImage from "../../public/loginImage.jpeg";
import SignupActionButton from "../buttons/SignupActionButton";
import { GithubLoginButton, GoogleLoginButton } from "../buttons/LoginButton";
import { useState } from "react";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  return (
    <div className="flex flex-col bg-white w-full md:w-2/3 p-6 md:p-8 gap-6 justify-between items-center ">
      <p className="text-xl md:text-2xl font-bold">Sign up to Communitas!</p>
      <EnterEmail setEmail={setEmail} />
      <EnterUsername
        setUsername={setUsername}
        usernameError={usernameError}
        setUsernameError={setUsernameError}
        username={username}
      />
      <EnterPassword
        setPassword={setPassword}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
      />
      <SignupActionButton
        username={username}
        password={password}
        email={email}
        setUsernameError={setUsernameError}
        setPasswordError={setPasswordError}
      />
      {/* <Seperator /> */}
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

function EnterEmail(props: { setEmail: (s: string) => void }) {
  return (
    <div className=" w-4/5">
      <input
        type="text"
        className="flex text-sm md:text-base items-center rounded-sm focus:border-indigo-600 bg-stone-100 h-10 w-full px-2"
        placeholder="Enter your email"
        id="email"
        onChange={(e) => props.setEmail(e.target.value)}
      />
    </div>
  );
}

function EnterUsername(props: {
  setUsername: (s: string) => void;
  setUsernameError: (b: boolean) => void;
  usernameError: boolean;
  username: string;
}) {
  return (
    <div className=" w-4/5">
      <input
        type="text"
        className="flex text-sm md:text-base items-center rounded-sm focus:border-indigo-600 bg-stone-100 h-10 w-full px-2"
        placeholder="Choose username"
        id="username"
        value={props.username}
        onChange={(e) => {
          props.setUsername(e.target.value);
          props.setUsernameError(false);
        }}
      />
      <p
        className={
          `text-red-600 text-[10px] md:text-xs ` +
          (props.usernameError ? "" : "hidden")
        }
      >
        Username {props.username} is already taken!
      </p>
    </div>
  );
}

function EnterPassword(props: {
  setPassword: (s: string) => void;
  setPasswordError: (b: boolean) => void;
  passwordError: boolean;
}) {
  return (
    <div className="w-4/5">
      <input
        type="password"
        className="flex items-center rounded-sm focus:border-indigo-600 bg-stone-100 h-10 w-full px-2"
        placeholder="Choose password (min. 8 characters)"
        onChange={(e) => {
          props.setPassword(e.target.value);
          props.setPasswordError(false);
        }}
        id="password"
      />
      <p
        className={
          `text-red-600 text-[10px] md:text-xs ` +
          (props.passwordError ? "" : "hidden")
        }
      >
        Password should be atleast 8 characters long!
      </p>
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
