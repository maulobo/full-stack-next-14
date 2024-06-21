"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Check = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [message, setMessage] = useState("");

  const handleResendEmail = async () => {
    setLoading(true);
    setMessage("");

    if (!session || !session.user.email) {
      setMessage("No user is signed in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/resend-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (response.ok) {
        setMessage("Confirmation email resent successfully.");
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to resend confirmation email.");
      }
    } catch (error) {
      console.error("Error resending email:", error);
      setMessage("Failed to resend confirmation email.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-24 w-auto" src="/logo.png" alt="Appobo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We have sent you an email with a confirmation link. Please check
            your inbox and click on the link to complete your registration.
          </p>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleResendEmail}
            className="font-medium text-indigo-600 hover:text-indigo-500"
            disabled={loading}
          >
            {loading ? "Resending..." : "Resend Email"}
          </button>
          {message && (
            <p className="mt-2 text-center text-sm text-gray-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Check;
