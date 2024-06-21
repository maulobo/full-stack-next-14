"use client";
import { useSearchParams } from "next/navigation";

const ErrorPage = () => {
  let confirmedError = false;
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error?.includes("confirmed")) {
    confirmedError = true;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>{error}</h1>
      {confirmedError && <h2>Check your email and try again</h2>}
    </div>
  );
};

export default ErrorPage;
