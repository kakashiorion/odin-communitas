import LoginCard from "../components/cards/LoginCard";
import Header from "../components/Header";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Header type="onlysignup" />
      <LoginCard />
    </div>
  );
}
