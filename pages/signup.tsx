import { getCookie } from "cookies-next";
import SignupCard from "../components/cards/SignupCard";
import Header from "../components/Header";

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  const loggedInUser = getCookie("user", { req, res });
  if (loggedInUser) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
export default function SignupPage() {
  return (
    <div className="flex flex-col h-screen gap-4 pb-4 items-center">
      <Header type="onlylogin" />
      <SignupCard />
    </div>
  );
}
