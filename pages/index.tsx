import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import Trending from "../components/Trending";
import { PostType } from "../util/types";
import { useEffect, useState } from "react";
import { getPosts } from "../util/ServerCalls";

export default function HomePage() {
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
      <Header />
      <Trending posts={posts} />
      <HomeContent posts={posts} />
    </div>
  );
}
