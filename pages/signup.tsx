import SignupCard from "../components/cards/SignupCard";
import Header from "../components/Header";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Header type="onlylogin" />
      <SignupCard />
    </div>
  );
}
