import WrapperDiv from "@/components/layout/WrapperDiv";
import LoginForm from "@/components/auth/loginForm";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function page() {
  // const session = await getServerSession(options);
  // console.log("session", session);

  // // Check if there is a session and the user has a role
  // if (session && session.user && session.user.role) {
  //   // Store the role in local storage
  //   localStorage.setItem("role", session.user.role);
  // }
  // const role = localStorage.getItem("role");

  // if (role === "User") {
  //   if (session) redirect("/user");
  // } else {
  //   if (session) redirect("/buyers");
  // }

  return (
    <div className="flex items-center justify-center text-center">
      <WrapperDiv>
        <LoginForm />
      </WrapperDiv>
    </div>
  );
}
