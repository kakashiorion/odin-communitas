import { useRouter } from "next/router";
import Community from "../../models/Community";
import {
  createCommunity,
  getCurrentUser,
  updateUserById,
} from "../../util/ServerCalls";
import { CommunityType, UserType } from "../../util/types";

interface StartCommunityButtonProps {
  commName: string;
  commCat: string;
  commDesc: string;
  commAttach?: string;
}
export default function StartCommunityButton(props: StartCommunityButtonProps) {
  const router = useRouter();
  const newComm = new Object({
    name: props.commName,
    description: props.commDesc,
    category: props.commCat,
    imageUrl: props.commAttach!,
  });

  async function createComm(newCommObj: any) {
    //Get current user
    let currentUser: UserType = await getCurrentUser();

    //Create new community
    newCommObj.creatorId = currentUser._id;
    newCommObj.members = [currentUser._id];
    const createdCommunity: CommunityType = await createCommunity(newCommObj);

    //update user's communities
    let userCommList = currentUser.communities;
    userCommList.push(createdCommunity._id);
    currentUser.communities = userCommList;
    await updateUserById(currentUser._id, currentUser);

    //redirect to the newly created community page
    router.push(`/community/${createdCommunity._id}`);
  }

  return (
    <button
      className="px-3 h-10 rounded-md bg-indigo-600 hover:bg-indigo-800 text-white text-xs md:text-sm "
      onClick={() => createComm(newComm)}
    >
      START COMMUNITY
    </button>
  );
}
