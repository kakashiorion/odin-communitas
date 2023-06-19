import Image from "next/image";
import signupImage from "../../public/loginImage.jpeg";
import SignupActionButton from "../buttons/SignupActionButton";
import { useState } from "react";

export default function SignupCard() {
  return (
    <div className="px-6 md:px-8 w-full h-full lg:w-[1024px]">
      <div className="flex h-full shadow-md">
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
    <div className="flex flex-col bg-white w-full h-full lg:w-1/2 p-6 md:p-8 gap-10 justify-center items-center ">
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
    </div>
  );
}

function EnterEmail(props: { setEmail: (s: string) => void }) {
  return (
    <div className="w-3/4 sm:w-1/2 lg:w-2/3">
      <input
        type="text"
        className="flex text-sm md:text-base items-center rounded-full focus:border-blue-600 bg-stone-100 w-full px-4 py-2"
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
    <div className="w-3/4 sm:w-1/2 lg:w-2/3">
      <input
        type="text"
        className="flex text-sm md:text-base items-center rounded-full focus:border-blue-600 bg-stone-100 w-full px-4 py-2"
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
          `text-red-600 text-[10px] p-1 md:text-xs ` +
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
    <div className="w-3/4 sm:w-1/2 lg:w-2/3">
      <input
        type="password"
        className="flex text-sm md:text-base items-center rounded-full focus:border-blue-600 bg-stone-100 w-full px-4 py-2"
        placeholder="Choose password (min. 8 characters)"
        onChange={(e) => {
          props.setPassword(e.target.value);
          props.setPasswordError(false);
        }}
        id="password"
      />
      <p
        className={
          `text-red-600 text-[10px] p-1 md:text-xs ` +
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
    <div className="lg:w-1/2 h-full hidden lg:flex">
      <Image src={signupImage} alt="Signup to Communitas" />
    </div>
  );
}
