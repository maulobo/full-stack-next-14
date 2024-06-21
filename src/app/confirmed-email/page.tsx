"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ConfirmedEmailPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Optional: Redirect to another page after a delay
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000); // Redirect to homepage after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Mail Confirmed!</h1>
      <p>Your email has been successfully confirmed.</p>
      {/* Optionally, you can add a link to redirect */}
      <p>You will be redirected to the homepage shortly...</p>
    </div>
  );
};

export default ConfirmedEmailPage;
