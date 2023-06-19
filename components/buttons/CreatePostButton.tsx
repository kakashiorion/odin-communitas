import { useRouter } from "next/router";
import {
  createPost,
  updateUserById,
} from "../../util/ServerCalls";
import { PostType, UserType } from "../../util/types";
import { useContext } from "react";
import { UserContext } from "../../pages/_app";

interface CreatePostButtonProps {
  newPostDetails: {};
}
export default function CreatePostButton(props: CreatePostButtonProps) {
  const router = useRouter();
  const loggedInUser = useContext(UserContext);
  async function createNewPost(newPostObj: any) {
    //Get current user
    if (!loggedInUser) {
      router.push("/login");
    } else {
      //Create new post
      newPostObj.posterId = loggedInUser._id;
      newPostObj.upvotersId = [loggedInUser._id];
      const createdPost: PostType = await createPost(newPostObj);

      //update user's posts
      let userPostsList = loggedInUser.posts;
      userPostsList.push(createdPost._id);
      loggedInUser.posts = userPostsList;
      await updateUserById(loggedInUser._id, loggedInUser);

      //redirect to the newly created post page
      router.push(`/post/${createdPost._id}`);
    }
  }
  return (
    <button
      className="px-4 py-3 rounded-full shadow bg-blue-600 hover:bg-blue-800 text-white text-xs md:text-sm "
      onClick={() => createNewPost(props.newPostDetails)}
    >
      POST
    </button>
  );
}
