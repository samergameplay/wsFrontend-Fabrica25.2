"use client";

import Link from "next/link";
import Image from "next/image";
import NavItem, { NavItemInterface } from "../NavItem";
import "./index.css";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const items: NavItemInterface[] = [
    {
      url: "/",
      label: "Inicio",
    },
    {
      url: "/favorite",
      label: "Favoritos",
    },
    {
      url: "/about",
      label: "Sobre",
    },
  ];

  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-center">
        <Link href="/" className="nameNavbar">
          <h1>POKÉDEX</h1>
        </Link>
        {openMenu && (
          <ul className="nav-items">
            {items.map((item, index) => (
              <NavItem
                key={index}
                url={item.url}
                label={item.label}
                isActive={pathname === item.url}
              />
            ))}
          </ul>
        )}
      </div>

        <button className="btn-bars" onClick={() => setOpenMenu(!openMenu)}>
          <FaBars />
        </button>
      </nav>
    </header>
  );
}