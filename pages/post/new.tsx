import React from "react";
import NewPostCard from "../../components/cards/NewPostCard";
import Header from "../../components/Header";

export default function NewPost() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Header type="loggedin" />
      <NewPostCard />
    </div>
  );
}
