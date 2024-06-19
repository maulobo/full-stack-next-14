"use client";
import React from "react";

export default function ButonMail() {
  return (
    <button
      className="bg-black text-white"
      onClick={async () => {
        const res = await fetch("/api/send", {
          method: "POST",
        });
        const data = await res.json();
        console.log(data);
      }}
    >
      Send email
    </button>
  );
}
