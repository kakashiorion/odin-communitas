import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  createPost,
  getUserById,
  updateUserById,
} from "../../util/ServerCalls";
import { PostType, UserType } from "../../util/types";

interface CreatePostButtonProps {
  newPostDetails: {};
}
export default function CreatePostButton(props: CreatePostButtonProps) {
  const router = useRouter();
  async function createNewPost(newPostObj: any) {
    //Get current user
    const loggedInUser = getCookie("user");
    if (!loggedInUser) {
      router.push("/login");
    } else {
      let currentUser: UserType = await getUserById(loggedInUser.toString());

      //Create new post
      newPostObj.posterId = currentUser._id;
      newPostObj.upvotersId = [currentUser._id];
      const createdPost: PostType = await createPost(newPostObj);

      //update user's posts
      let userPostsList = currentUser.posts;
      userPostsList.push(createdPost._id);
      currentUser.posts = userPostsList;
      await updateUserById(currentUser._id, currentUser);

      //redirect to the newly created post page
      router.push(`/post/${createdPost._id}`);
    }
  }
  return (
    <button
      className="px-3 h-10 rounded-md bg-indigo-600 hover:bg-indigo-800 text-white text-xs md:text-sm "
      onClick={() => createNewPost(props.newPostDetails)}
    >
      POST
    </button>
  );
}
