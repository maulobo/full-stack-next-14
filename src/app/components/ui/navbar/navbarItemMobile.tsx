import Link from "next/link";
import React from "react";

interface NavbarItemProps {
  href: string;
  page: string;
}

const NavbarItemMobile = ({ href, page }: NavbarItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
      >
        {page}
      </Link>
    </li>
  );
};

export default NavbarItemMobile;
