import { useRouter } from "next/router";
import {
  createCommunity,
  updateUserById,
} from "../../util/ServerCalls";
import { CommunityType } from "../../util/types";
import { useContext } from "react";
import { UserContext } from "../../pages/_app";

interface StartCommunityButtonProps {
  commName: string;
  commCat: string;
  commDesc: string;
  commAttach?: string;
}
export default function StartCommunityButton(props: StartCommunityButtonProps) {
  const router = useRouter();
  const loggedInUser = useContext(UserContext);
  const newComm = new Object({
    name: props.commName,
    description: props.commDesc,
    category: props.commCat,
    imageUrl: props.commAttach!,
  });

  async function createComm(newCommObj: any) {
    //Get current user
    if (!loggedInUser) {
      router.push("/login");
    } else {
      //Create new community
      newCommObj.creatorId = loggedInUser._id;
      newCommObj.members = [loggedInUser._id];
      const createdCommunity: CommunityType = await createCommunity(newCommObj);

      //update user's communities
      let userCommList = loggedInUser.communities;
      userCommList.push(createdCommunity._id);
      loggedInUser.communities = userCommList;
      await updateUserById(loggedInUser._id, loggedInUser);

      //redirect to the newly created community page
      router.push(`/community/${createdCommunity._id}`);
    }
  }

  return (
    <button
      className="px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-800 text-white text-xs md:text-sm "
      onClick={() => createComm(newComm)}
    >
      START COMMUNITY
    </button>
  );
}
