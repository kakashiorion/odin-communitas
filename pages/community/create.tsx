import { getCookie } from "cookies-next";
import React from "react";
import NewCommunityCard from "../../components/cards/NewCommunityCard";
import Header from "../../components/Header";

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  const loggedInUser = getCookie("user", { req, res });
  if (!loggedInUser) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return {
    props: {},
  };
}
export default function NewCommunityPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Header />
      <NewCommunityCard />
    </div>
  );
}
