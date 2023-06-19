import { useRouter } from "next/router";
import { createUser, getUsers } from "../../util/ServerCalls";
import { UserType } from "../../util/types";
import { SignupIcon } from "../icons/Icons";

interface SignupActionButtonProps {
  username: string;
  password: string;
  email: string;
  setUsernameError: (b: boolean) => void;
  setPasswordError: (b: boolean) => void;
}
export default function SignupActionButton(props: SignupActionButtonProps) {
  const router = useRouter();
  async function createNewUser() {
    const existingUsers: UserType[] = await getUsers();
    if (existingUsers.filter((u) => u.username == props.username).length > 0) {
      props.setUsernameError(true);
    } else if (props.password.length < 8) {
      props.setPasswordError(true);
    } else {
      let newUserObj: any = {
        username: props.username,
        email: props.email,
        encryptedPassword: props.password,
      };
      const createdUser = await createUser(newUserObj);
      router.push("/user/" + createdUser._id);
    }
  }
  return (
    <button
      className="py-3 flex items-center shadow text-sm lg:text-base disabled:bg-gray-400 justify-center gap-3 w-1/2 bg-blue-600 hover:bg-blue-800 rounded-full px-4 text-white"
      onClick={() => createNewUser()}
      disabled={
        props.username == "" || props.password == "" || props.email == ""
      }
    >
      <SignupIcon />
      <p>SIGNUP</p>
    </button>
  );
}
