"use client";
import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import "./profile.css";
import Link from "next/link";

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

export const Profile = () => {
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

  return (
    <div className="profile-container">
      {profile && (
        <>
          <div className="profile-header">
            <h2 className="profile-title">PROFILE {profile.firstName}</h2>
            {profile.avatarUrl && (
              <img
                src={profile.avatarUrl}
                alt="User Avatar"
                className="avatar"
              />
            )}
          </div>
          <div className="flex flex-col gap-8">
            <div className="detail-item">
              <h3 className="detail-label">Email</h3>
              <span className="detail-value">{profile.email}</span>
            </div>
            <div className="detail-item">
              <h3 className="detail-label">First Name</h3>
              <span className="detail-value">{profile.firstName}</span>
            </div>
            <div className="detail-item">
              <h3 className="detail-label">Last Name</h3>
              <span className="detail-value">{profile.lastName}</span>
            </div>
            <div className="detail-item">
              <h3 className="detail-label">Bio</h3>
              <p className="detail-value">{profile.bio}</p>
            </div>
            <Link href="profile/edit">Editar</Link>
          </div>
        </>
      )}
    </div>
  );
};
