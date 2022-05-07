import React from "react";
import NewCommunityCard from "../../components/cards/NewCommunityCard";
import Header from "../../components/Header";

export default function NewCommunity() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Header type="loggedin" />
      <NewCommunityCard />
    </div>
  );
}
