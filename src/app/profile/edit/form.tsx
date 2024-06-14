"use client";
import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  userId: number;
  avatarUrl: string;
}

interface ProfileBtnProps {
  setProfile: (profile: UserProfile) => void;
}

export const FormProfile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const session = await getSession();

      if (session) {
        const fetchProfile = async (session: Session) => {
          if (session) {
            const user = session.user?.name;
            const response = await fetch(`/api/profile?user=${user}`);

            if (response.ok) {
              const data = await response.json();

              console.log(data.profile);
              setProfile(data.profile);
              setUsername(data.username);
            } else {
              console.error("Failed to fetch profile");
            }
          }
        };
        fetchProfile(session);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (profile) {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profile) {
      try {
        const response = await fetch(`/api/profile/${profile.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        router.push(`/profile/${profile.userId}`);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {profile && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="block text-sm font-medium text-gray-700">
              PROFILE {username}
            </h2>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
              <input
                type="text"
                name="firstName"
                value={profile.firstName || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
              <input
                type="text"
                name="lastName"
                value={profile.lastName || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bio
              <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Avatar URL
              <input
                type="text"
                name="avatarUrl"
                value={profile.avatarUrl || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};
