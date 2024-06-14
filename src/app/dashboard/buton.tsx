"use client";
import { signOut } from "next-auth/react";
function buton() {
  return (
    <div className="flex align-middle justify-center bg-black h-screen items-center">
      <button
        className="bg-white text-black px-4 py-2 rounded-md"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}

export default buton;
