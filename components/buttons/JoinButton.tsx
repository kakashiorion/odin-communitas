import { useEffect, useState } from "react";
import {
  getCommunityById,
  getCurrentUser,
  updateCommunityById,
  updateUserById,
} from "../../util/ServerCalls";
import { CommunityType, UserType } from "../../util/types";

interface JoinButtonProps {
  commId: string;
  currentUser: UserType;
  joinStatus: boolean;
  setJoinStatus: (b: boolean) => void;
}

export default function JoinButton(props: JoinButtonProps) {
  // let currentUser: UserType;
  // const fetchData = async () => {
  //   const userfromDB = await getCurrentUser();
  //   return { userfromDB };
  // };
  // useEffect(() => {
  //   fetchData().then((data) => {
  //     currentUser = data.userfromDB;
  //     setJoinStatus(currentUser.communities.includes(props.commId));
  //   });
  // }, [joinStatus]);

  async function joinCommunity() {
    if (props.joinStatus) {
      //Remove from the list of user's joined communities
      const removedCommunities: string[] = props.currentUser.communities.filter(
        (c) => c != props.commId
      );
      props.currentUser.communities = removedCommunities;
      await updateUserById(props.currentUser._id, props.currentUser);

      //Remove user as a member of the community
      const community: CommunityType = await getCommunityById(props.commId);
      community.members = community.members.filter(
        (u) => u != props.currentUser._id
      );
      await updateCommunityById(props.commId, community);
      props.setJoinStatus(false);
    } else {
      //Add community to user's joined list
      props.currentUser.communities.push(props.commId);
      await updateUserById(props.currentUser._id, props.currentUser);

      //Add user as a member of the community
      const community: CommunityType = await getCommunityById(props.commId);
      community.members.push(props.currentUser._id);
      await updateCommunityById(props.commId, community);
      props.setJoinStatus(true);
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
