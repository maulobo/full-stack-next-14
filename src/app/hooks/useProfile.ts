"use client";
import { useEffect, useState, useCallback } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface ProfileData {
  profile: any;
  username: string;
}

const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      const session = await getSession();

      if (session) {
        const fetchProfile = async (session: Session) => {
          if (session.user?.name) {
            const user = session.user.name;
            const response = await fetch(`/api/auth/profile?user=${user}`);

            if (response.ok) {
              const data = await response.json();
              setProfile(data);
            } else {
              setError("Failed to fetch profile");
            }
          }
        };

        await fetchProfile(session);
      }
    } catch (err) {
      setError("An error occurred while fetching the profile");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return { profile, isLoading, error, loadProfile };
};

export default useProfile;
