"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/navbar/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import useProfile from "@/app/hooks/useProfile";
import { useRouter } from "next/navigation";
import { navItem } from "./data";
import NavbarItem from "./navbarItem";
import NavbarItemMobile from "./navbarItemMobile";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { profile, isLoading, error } = useProfile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Manejar el cierre del menú de usuario cuando se hace clic fuera de él

  return (
    <nav className="relative z-10  shadow-md flex justify-between items-center p-4">
      <div className="flex items-center">
        <button
          className="md:hidden block focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <ul className="hidden md:flex p-4 space-x-4">
          {navItem.map((item, index) => (
            <NavbarItem key={index} href={item.href} page={item.page} />
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        {session ? (
          <button
            onClick={toggleUserMenu}
            className="focus:outline-none avatar-button"
          >
            <Avatar>
              <AvatarImage src={profile?.profile?.avatarUrl} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </button>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="px-3 py-2 rounded-md text-sm hover:bg-gray-100 hover:text-gray-700"
            >
              Sign In
            </button>
            <button
              onClick={
                () => {
                  router.push("/auth/register");
                } /* Handle Sign Up */
              }
              className="px-3 py-2 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-600"
            >
              Sign Up
            </button>
          </>
        )}
        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20 right-0 mt-2 min-w-36  bg-white shadow-lg rounded-md py-2 z-20"
            >
              {session ? (
                <>
                  <button
                    onClick={() => router.push("/profile")}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                >
                  Login
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 md:hidden"
          >
            <ul className="space-y-4">
              {navItem.map((item, index) => (
                <NavbarItemMobile
                  key={index}
                  href={item.href}
                  page={item.page}
                />
              ))}
              {!session && (
                <>
                  <button
                    onClick={() => signIn()}
                    className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {} /* Handle Sign Up */}
                    className="block px-3 py-2 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-600"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
