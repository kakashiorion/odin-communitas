import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  createComment,
  getPostById,
  getUserById,
  updatePostById,
  updateUserById,
} from "../../util/ServerCalls";
import { CommentType, UserType } from "../../util/types";

interface CommentButtonProps {
  disabled: boolean;
  buttonText: string;
  content: string;
  postId: string;
  parentCommentId?: string;
  setCommentText: (s: string) => void;
}
export default function AddCommentButton(props: CommentButtonProps) {
  const router = useRouter();
  const newComment = new Object({
    content: props.content,
    postId: props.postId,
    parentCommentId: props.parentCommentId!,
  });

  async function createNewParentComment(newCommentObj: any) {
    //Get current user
    const loggedInUser = getCookie("user");
    if (!loggedInUser) {
      router.push("/login");
    } else {
      let currentUser: UserType = await getUserById(loggedInUser.toString());

      //Create new comment
      newCommentObj.posterId = currentUser._id;
      newCommentObj.upvotersId = [currentUser._id];
      const createdComment: CommentType = await createComment(newCommentObj);

      //update user's comments
      let userCommentsList = currentUser.comments;
      userCommentsList.push(createdComment._id);
      currentUser.comments = userCommentsList;
      await updateUserById(currentUser._id, currentUser);

      //update post's comments
      let post = await getPostById(props.postId);
      post.commentsId.push(createdComment._id);
      await updatePostById(props.postId, post);
    }
  }

  return (
    <button
      disabled={props.disabled}
      className="px-3 py-2 rounded-md bg-indigo-600 disabled:bg-indigo-300 hover:bg-indigo-800 text-white whitespace-nowrap text-xs md:text-sm "
      onClick={() => {
        props.setCommentText("");
        createNewParentComment(newComment);
      }}
    >
      {props.buttonText}
    </button>
  );
}
