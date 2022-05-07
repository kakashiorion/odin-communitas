import { useRouter } from "next/router";

interface CommentButtonProps {
  disabled: boolean;
  text?: string;
}
export default function CommentButton(props: CommentButtonProps) {
  return (
    <button
      disabled={props.disabled}
      className="px-3 py-2 rounded-md bg-indigo-600 disabled:bg-indigo-300 hover:bg-indigo-800 text-white whitespace-nowrap text-xs md:text-sm "
    >
      {props.text}
    </button>
  );
}
