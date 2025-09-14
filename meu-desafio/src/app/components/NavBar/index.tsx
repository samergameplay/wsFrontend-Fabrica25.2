"use client";

import Link from "next/link";
import Image from "next/image";
import NavItem, { NavItemInterface } from "../NavItem";
import "./index.css";
import { usePathname } from "next/navigation";

export default function Navbar(){
    const items: NavItemInterface[] = [
        {
            url: "/",
            label: "Inicio"
        },
        {
            url: "/favorite",
            label: "Favoritos"
        },
        {
            url: "/about",
            label: "Sobre"
        }
    ]

    const pathname = usePathname();

    return(
        <header>
            <nav className="navbar">
                <Link href="/" className="logo">
                    <Image src="iconNavbar.svg" 
                    width={10} 
                    height={10} 
                    alt="logo do Navbar"/>
                </Link>

                <ul className="nav-items">
                    {items.map((item, index)=>(
                        <NavItem 
                            key={index}
                            url={item.url}
                            label={item.label}
                            isActive={pathname === item.url}
                        />
                    ))}
                </ul>

                <button className="btn-login">Login</button>

            </nav>
        </header>
    )
}