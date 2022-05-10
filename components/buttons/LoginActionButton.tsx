import { LoginIcon } from "../icons/Icons";
import { useRouter } from "next/router";
import { UserType } from "../../util/types";
import { getUsers } from "../../util/ServerCalls";
import { setCookies } from "cookies-next";
interface LoginActionButtonProps {
  username: string;
  password: string;
  setUsernameError: (b: boolean) => void;
  setPasswordError: (b: boolean) => void;
}
export default function LoginActionButton(props: LoginActionButtonProps) {
  const router = useRouter();
  async function signInUser() {
    const existingUsers: UserType[] = await getUsers();
    const loggingUser = existingUsers.filter(
      (u) => u.username == props.username
    )[0];

    if (!loggingUser) {
      props.setUsernameError(true);
    } else if (loggingUser.encryptedPassword != props.password) {
      props.setPasswordError(true);
    } else {
      setCookies("user", loggingUser._id),
        {
          path: "/",
          maxAge: 7200,
          sameSite: true,
        };
      router.push("/");
    }
  }

  return (
    <button
      className="h-10 flex items-center disabled:bg-gray-400 justify-center gap-3 w-1/2 bg-indigo-600 hover:bg-indigo-800 rounded-md px-3 text-white"
      onClick={() => signInUser()}
      disabled={props.username == "" || props.password.length < 8}
    >
      <LoginIcon />
      <p>Login</p>
    </button>
  );
}
