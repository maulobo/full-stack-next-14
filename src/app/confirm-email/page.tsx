import Link from "next/link";
import React from "react";

export default function ConfirmEmailPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2l4-4M12 4.5c-4.142 0-7.5 3.358-7.5 7.5S7.858 19.5 12 19.5s7.5-3.358 7.5-7.5S16.142 4.5 12 4.5z"
          />
        </svg>
        <h1 className="text-2xl font-bold mt-4">Email Confirmed</h1>
        <p className="mt-2 text-gray-600">
          Your email has been successfully confirmed. You can now enjoy all our
          services.
        </p>
        <Link
          href="/auth/login"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
