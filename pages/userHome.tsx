import { useEffect, useState } from "react";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import Trending from "../components/Trending";
import { getPosts } from "../util/ServerCalls";
import { PostType } from "../util/types";

export default function UserHome() {
  const emptyPosts: PostType[] = [];
  const [posts, setPosts] = useState(emptyPosts);
  const fetchData = async () => {
    const posts = await getPosts();
    return { posts };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setPosts(data.posts);
    });
  }, []);
  return (
    <div className="flex flex-col gap-1 items-center">
      <Header type="loggedin" />
      <Trending posts={posts} />
      <HomeContent posts={posts} />
    </div>
  );
}
