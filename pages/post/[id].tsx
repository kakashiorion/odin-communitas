import { useEffect, useState } from "react";
import CommentButton from "../../components/buttons/CommentButton";
import CommentCard from "../../components/cards/CommentCard";
import PostCard from "../../components/cards/PostCard";
import Header from "../../components/Header";
import {
  getParentCommentsByPostId,
  getPostById,
  getPosts,
} from "../../util/ServerCalls";
import { PostType, CommentType } from "../../util/types";

export async function getStaticPaths() {
  const results: PostType[] = await getPosts();

  return {
    paths: results.map((post) => {
      return { params: { id: String(post._id) } };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  return {
    props: {
      post: await getPostById(params.id),
    },
  };
}

interface PostPageProps {
  post: PostType;
}
export default function PostPage(props: PostPageProps) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Header type="loggedin" />
      <PostColumn post={props.post} />
    </div>
  );
}

interface PostColumnProps {
  post: PostType;
}
function PostColumn(props: PostColumnProps) {
  const emptyParentComments: CommentType[] = [];
  const [parentComments, setParentComments] = useState(emptyParentComments);
  const fetchData = async () => {
    const comments = await getParentCommentsByPostId(props.post._id);
    return { comments };
  };
  useEffect(() => {
    fetchData().then((data) => {
      setParentComments(data.comments);
    });
  });
  return (
    <div className="flex flex-col gap-3 w-full md:w-[768px] p-3 ">
      <PostCard showWithDesc={true} post={props.post} />
      <AddComment />
      <hr />
      <CommentColumn parentComments={parentComments} />
    </div>
  );
}

function AddComment() {
  const [commentText, setCommentText] = useState("");
  return (
    <div className="bg-white shadow-md rounded flex flex-col w-full p-3 gap-2">
      <textarea
        rows={2}
        placeholder="Share your thoughts!"
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full bg-gray-100 p-2 text-sm md:text-base outline-indigo-600"
      ></textarea>
      <div className="w-full flex justify-end">
        <CommentButton disabled={commentText == ""} text="Add Comment" />
      </div>
    </div>
  );
}

function CommentColumn(props: { parentComments: CommentType[] }) {
  const [sortAlgo, setSortAlgo] = useState("New"); //Sort content by 'New' by default
  return (
    <div className="flex flex-col w-full gap-2">
      <CommentsSorter setSort={setSortAlgo} />
      <CommentsList
        parentComments={sortComments(props.parentComments, sortAlgo)}
      />
    </div>
  );
}

interface CommentsSorterProps {
  setSort: (s: string) => void;
}
function CommentsSorter(props: CommentsSorterProps) {
  const commentsSortAlgo = ["New", "Popular", "Old"];
  return (
    <div className="flex w-full justify-between items-center">
      <p className="font-semibold text-xs md:text-sm">All Comments</p>
      <div className="flex gap-2 items-center">
        <p className="text-xs md:text-sm">SORT BY:</p>
        <div className="flex items-center text-xs md:text-sm rounded-3xl text-indigo-600 bg-white focus:border-0 border-[1px] border-indigo-600 p-2 ">
          <select
            className={"outline-0 "}
            id="comments-sort"
            onChange={(e) => props.setSort(e.target.value)}
          >
            {commentsSortAlgo.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function CommentsList(props: { parentComments: CommentType[] }) {
  return (
    <div className="flex flex-col gap-2 justify-start items-center w-full">
      {props.parentComments.length > 0 ? (
        props.parentComments.map((c) => <CommentCard comment={c} key={c._id} />)
      ) : (
        <p>No comments yet!</p>
      )}
    </div>
  );
}

function sortComments(c: CommentType[], sAlgo: string) {
  if (sAlgo == "Popular")
    //Upvotes diff
    return c.sort((a: CommentType, b: CommentType) =>
      a.upvotersId.length - a.downvotersId.length >
      b.upvotersId.length - b.downvotersId.length
        ? 1
        : -1
    );
  else if (sAlgo == "Old")
    //Created earlier
    return c.sort((a: CommentType, b: CommentType) =>
      a.createdAt > b.createdAt ? 1 : -1
    );
  else
    return c.sort((a: CommentType, b: CommentType) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
  //Default sort by New - Created later
}
