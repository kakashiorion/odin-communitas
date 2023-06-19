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
      className="h-10 flex items-center text-sm lg:text-base disabled:bg-gray-400 justify-center gap-3 w-1/2 bg-blue-600 hover:bg-blue-800 rounded-full px-3 text-white"
      onClick={() => signInUser()}
      disabled={props.username == "" || props.password.length < 8}
    >
      <LoginIcon />
      <p>LOGIN</p>
    </button>
  );
}
