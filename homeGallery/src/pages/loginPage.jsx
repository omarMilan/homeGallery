import "../App.css";
import Login from "../components/login";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-Primary flex items-center justify-center text-black flex-col gap-y-[26px]">
      <Login />
    </div>
  );
}
