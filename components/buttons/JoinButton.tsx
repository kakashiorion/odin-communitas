import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  getCommunityById,
  getUserById,
  updateCommunityById,
  updateUserById,
} from "../../util/ServerCalls";
import { CommunityType } from "../../util/types";

interface JoinButtonProps {
  commId: string;
  joinStatus: boolean;
  setJoinStatus: (b: boolean) => void;
}

export default function JoinButton(props: JoinButtonProps) {
  const router = useRouter();
  async function joinCommunity() {
    const loggedInUser = getCookie("user");
    if (!loggedInUser) {
      router.push("/login");
    } else {
      let currentUser = await getUserById(loggedInUser.toString());
      if (props.joinStatus) {
        //Remove from the list of user's joined communities
        const removedCommunities: string[] = currentUser.communities.filter(
          (c) => c != props.commId
        );
        currentUser.communities = removedCommunities;
        await updateUserById(currentUser._id, currentUser);

        //Remove user as a member of the community
        const community: CommunityType = await getCommunityById(props.commId);
        community.members = community.members.filter(
          (u) => u != currentUser?._id
        );
        await updateCommunityById(props.commId, community);
        props.setJoinStatus(false);
      } else {
        //Add community to user's joined list
        currentUser.communities.push(props.commId);
        await updateUserById(currentUser._id, currentUser);

        //Add user as a member of the community
        const community: CommunityType = await getCommunityById(props.commId);
        community.members.push(currentUser._id);
        await updateCommunityById(props.commId, community);
        props.setJoinStatus(true);
      }
    }
  }
  return (
    <button
      onClick={() => joinCommunity()}
      className={
        "px-3 py-1 z-20 rounded-lg text-xs " +
        (props.joinStatus
          ? "text-indigo-600 bg-white hover:bg-gray-200 border-indigo-600 border-[1px]"
          : "bg-indigo-600 hover:bg-indigo-800 text-white")
      }
    >
      {props.joinStatus ? "Joined" : "JOIN"}
    </button>
  );
}
