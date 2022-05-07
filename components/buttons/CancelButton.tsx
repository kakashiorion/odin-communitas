import { useRouter } from "next/router";

export default function CancelButton() {
  const router = useRouter();
  const goBack = (e: any) => {
    e.preventDefault();
    router.back();
  };
  return (
    <button
      className="px-3 h-10 rounded-md bg-gray-600 hover:bg-gray-800 text-white text-xs md:text-sm "
      onClick={goBack}
    >
      CANCEL
    </button>
  );
}
