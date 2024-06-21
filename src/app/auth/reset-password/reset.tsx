"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsSuccess(false);
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resJson = await res.json();
    if (res.ok) {
      setMessage("Password reset successful");
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000); // Redirige a la página de inicio de sesión después de 3 segundos
    } else {
      setMessage(resJson.message);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 shadow-lg bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Reset Password
      </h2>
      {message && (
        <p
          className={`text-center mb-4 ${isSuccess ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
