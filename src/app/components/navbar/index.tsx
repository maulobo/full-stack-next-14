"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import useProfile from "@/app/hooks/useProfile";
// Asegúrate de que la ruta sea correcta

const Navbar = () => {
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

  return (
    <nav className="relative z-10 bg-white shadow-md flex justify-between items-center p-4">
      <div className="flex items-center">
        <button
          className="md:hidden block text-gray-700 focus:outline-none"
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
          <li>
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="relative">
        <button onClick={toggleUserMenu} className="focus:outline-none">
          <Avatar>
            {session ? (
              <AvatarImage src={profile?.profile?.avatarUrl} />
            ) : (
              <AvatarImage src="" />
            )}
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </button>
        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20"
            >
              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Perfil
                  </Link>
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
              <li>
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
