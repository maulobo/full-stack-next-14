"use client";
import { SessionProvider } from "next-auth/react";

interface SessionProviderWrapperProps {
  children: React.ReactNode; // Accept any valid React child element
}

export default function SessionProviderWrapper({
  children,
}: SessionProviderWrapperProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
