"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  console.log(status);
  if (status === "authenticated") {
    router.push("/dashboard");
  }
  return (
    <>
      <div className="w-full xl:px-20 sm:px-10  h-full flex lg:flex-row flex-col min-h-screen items-center   justify-center   bg-[#f8f8f8]">
        <div className="bg-white h-full  sm:p-10 p-8 xl:max-w-md lg:max-w-sm max-w-xs lg:order-1 order-2 w-full  rounded-xl sm:shadow-xl">
          <h2 className="text-3xl text-indigo-900 font-bold">Login</h2>
          <p className="text-gray-500 mt-2">Signup using google</p>
          <div>
            <div className="flex mt-8 gap-4">
              <button
                onClick={() => signIn()}
                className="w-full text-red-500 hover:bg-red-500 hover:text-white font-semibold text-sm border-2 border-red-500 rounded-lg py-2"
              >
                Google
              </button>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto lg:order-2 order-1">
          <img className="" src="/icon.png" />
        </div>
      </div>
    </>
  );
}
