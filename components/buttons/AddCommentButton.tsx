import { useRouter } from "next/router";
import {
  createComment,
  getPostById,
  updatePostById,
  updateUserById,
} from "../../util/ServerCalls";
import { CommentType, UserType } from "../../util/types";
import { useContext } from "react";
import { UserContext } from "../../pages/_app";

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
  const loggedInUser = useContext(UserContext);
  const newComment = new Object({
    content: props.content,
    postId: props.postId,
    parentCommentId: props.parentCommentId??"",
  });

  async function createNewParentComment(newCommentObj: any) {
    //Get current user
    if (!loggedInUser) {
      router.push("/login");
    } else {
      //Create new comment
      newCommentObj.posterId = loggedInUser._id;
      newCommentObj.upvotersId = [loggedInUser._id];
      const createdComment: CommentType = await createComment(newCommentObj);

      //update user's comments
      let userCommentsList = loggedInUser.comments;
      userCommentsList.push(createdComment._id);
      loggedInUser.comments = userCommentsList;
      await updateUserById(loggedInUser._id, loggedInUser);

      //update post's comments
      let post = await getPostById(props.postId);
      post.commentsId.push(createdComment._id);
      await updatePostById(props.postId, post);
      router.reload()
    }
  }

  return (
    <button
      disabled={props.disabled}
      className="px-3 py-2 rounded-full bg-blue-600 disabled:bg-blue-300 hover:bg-blue-800 text-white whitespace-nowrap text-xs md:text-sm "
      onClick={() => {
        props.setCommentText("");
        createNewParentComment(newComment);
      }}
    >
      {props.buttonText}
    </button>
  );
}
