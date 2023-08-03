import Image from "next/image";
import { useState } from "react";
import loginImage from "../../public/loginImg.jpeg";
import LoginActionButton from "../buttons/LoginActionButton";
export default function LoginCard() {
  return (
    <div className="px-6 md:px-8 w-full h-full lg:w-[1024px]">
      <div className="flex h-full shadow-md ">
        <LoginImageSample />
        <LoginContent />
      </div>
    </div>
  );
}

function LoginContent() {
  const [username, setUsername] = useState("trevize");
  const [password, setPassword] = useState("12345678");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  return (
    <div className="flex flex-col bg-white w-full h-full lg:w-1/2 p-6 md:p-8 gap-10 justify-center items-center ">
      <p className="text-xl md:text-2xl font-bold">Login to Communitas</p>
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
        password={password}
      />
      <LoginActionButton
        username={username}
        password={password}
        setUsernameError={setUsernameError}
        setPasswordError={setPasswordError}
      />
      <Forgot />
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
    <div className="w-3/4 sm:w-1/2 lg:w-2/3">
      <input
        type="text"
        className="flex text-sm md:text-base items-center rounded-full focus:border-blue-600 bg-stone-100 w-full px-4 py-2"
        placeholder="Enter your username"
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
        Username {props.username} does not exist!
      </p>
    </div>
  );
}
function EnterPassword(props: {
  setPassword: (s: string) => void;
  setPasswordError: (b: boolean) => void;
  passwordError: boolean;
  password: string
}) {
  return (
    <div className="w-3/4 sm:w-1/2 lg:w-2/3">
      <input
        type="password"
        className="flex text-sm md:text-base items-center rounded-full focus:border-blue-600 bg-stone-100 w-full px-4 py-2"
        placeholder="Enter your password"
        id="password"
        value={props.password}
        onChange={(e) => {
          props.setPassword(e.target.value);
          props.setPasswordError(false);
        }}
      />
      <p
        className={
          `text-red-600 text-[10px] md:text-xs ` +
          (props.passwordError ? "" : "hidden")
        }
      >
        Incorrect Password
      </p>
    </div>
  );
}

function Forgot() {
  return (
    <div className="text-xs">
      {'Forgot your '}
      <a className="text-blue-600 underline">username or password</a>?
    </div>
  );
}

function LoginImageSample() {
  return (
    <div className="lg:w-1/2 hidden lg:flex">
      <Image src={loginImage} alt="Login to Communitas" />
    </div>
  );
}
