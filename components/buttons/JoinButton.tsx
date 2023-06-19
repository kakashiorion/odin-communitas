import { useRouter } from "next/router";
import {
  getCommunityById,
  updateCommunityById,
  updateUserById,
} from "../../util/ServerCalls";
import { CommunityType } from "../../util/types";
import { useContext } from "react";
import { UserContext } from "../../pages/_app";

interface JoinButtonProps {
  commId: string;
  joinStatus: boolean;
  setJoinStatus: (b: boolean) => void;
}

export default function JoinButton(props: JoinButtonProps) {
  const router = useRouter();
  const loggedInUser = useContext(UserContext);
  async function joinCommunity() {
    if (!loggedInUser) {
      router.push("/login");
    } else {
      if (props.joinStatus) {
        //Remove from the list of user's joined communities
        const removedCommunities: string[] = loggedInUser.communities.filter(
          (c) => c != props.commId
        );
        loggedInUser.communities = removedCommunities;
        await updateUserById(loggedInUser._id, loggedInUser);

        //Remove user as a member of the community
        const community: CommunityType = await getCommunityById(props.commId);
        community.members = community.members.filter(
          (u) => u != loggedInUser?._id
        );
        await updateCommunityById(props.commId, community);
        props.setJoinStatus(false);
      } else {
        //Add community to user's joined list
        loggedInUser.communities.push(props.commId);
        await updateUserById(loggedInUser._id, loggedInUser);

        //Add user as a member of the community
        const community: CommunityType = await getCommunityById(props.commId);
        community.members.push(loggedInUser._id);
        await updateCommunityById(props.commId, community);
        props.setJoinStatus(true);
      }
    }
  }
  return (
    <button
      onClick={() => joinCommunity()}
      className={
        "px-3 py-1 z-20 rounded-full text-xs " +
        (props.joinStatus
          ? "text-blue-600 bg-white hover:bg-blue-600 hover:text-white border-blue-600 border-[1px]"
          : "bg-blue-600 hover:bg-blue-800 text-white")
      }
    >
      {props.joinStatus ? "Joined" : "JOIN"}
    </button>
  );
}
