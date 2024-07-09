import React from "react";
import Logo from "../../assets/website/coffee_logo.png";
import { FaCoffee } from "react-icons/fa";
import Link from "next/link";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/home",
  },
  {
    id: 2,
    name: "Order Coffee",
    link: "/products",
  },
  {
    id: 2,
    name: "Wishlist",
    link: "/wishlist",
  },
];
const Navbar = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-secondary to-secondary/90 shadow-md bg-gray-900 text-white">
        <div className="container py-2">
          <div className="flex justify-between items-center">
            {/* Logo section */}
            <div data-aos="fade-down" data-aos-once="true">
              <Link href='/home' className="font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive">
                <img src={Logo.src} alt="Logo" className="w-14" />
                Coffee Cafe
              </Link>
            </div>

            {/* Link section */}
            <div
              data-aos="fade-down"
              data-aos-once="true"
              data-aos-delay="300"
              className="flex justify-between items-center gap-4"
            >
              <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <Link
                      href={menu.link}
                      className="inline-block text-xl py-4 px-4 text-white/70 hover:text-white duration-200"
                    >
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/checkout"
                className="bg-primary/70 hover:scale-105 duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3 relative"
              >
                Cart
                {6 > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full text-xs">
                    {5}
                  </span>
                )}
                <FaCoffee className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </Link>
              <Link href="/login" className="ml-4">
                LogIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
