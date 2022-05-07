import Header from "../components/Header";
import HomeContent from "../components/HomeContent";
import Trending from "../components/Trending";
import { getCookie } from "cookies-next";
import { PostType } from "../util/types";
import { useEffect, useState } from "react";
import { getPosts } from "../util/ServerCalls";

// export async function getServerSideProps({ req, res }: { req: any; res: any }) {
//   try {
//     const cookieExists = getCookie("token", { req, res });
//     console.log(cookieExists);
//     if (cookieExists) return { redirect: { destination: "/" } };
//     return { props: {} };
//   } catch (err) {
//     return { props: {} };
//   }
// }

export default function Home() {
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
      <Header type="loggedout" />
      <Trending posts={posts} />
      <HomeContent posts={posts} />
    </div>
  );
}
