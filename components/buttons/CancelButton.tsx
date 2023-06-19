import { useRouter } from "next/router";

export default function CancelButton() {
  const router = useRouter();
  const goBack = (e: any) => {
    e.preventDefault();
    router.back();
  };
  return (
    <button
      // className="px-4 py-3 rounded-full shadow bg-gray-600 hover:bg-gray-800 text-white text-xs md:text-sm"
      className=" text-gray-600 hover:text-red-800 text-xs md:text-sm"
      onClick={goBack}
    >
      CANCEL
    </button>
  );
}
