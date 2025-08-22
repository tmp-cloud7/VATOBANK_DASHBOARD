import { useState } from "react";
import { close, logo, menu } from "../Assets";
import { navLinks } from "./constants";
import { useLocation } from "react-router-dom"; 

const NavbarLanding = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

 
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar border-b border-gray-300 bg-blue-400">
      <img src={logo} alt="vatobank" className="w-[124px] h-[32px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => {
          if (isRegisterPage && nav.title === "Register") {
            return null; 
          }
          if (isLoginPage && nav.title === "Login") {
            return null;
          }

          return (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title ? "text-white" : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              {nav.title === "Register" ? (
                <button className="py-2 px-4 text-[16px] font-medium bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
                  <a href={nav.link}>{nav.title}</a>
                </button>
              ) : nav.title === "Login" ? (
                <button className="py-2 px-4 text-[16px] font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                  <a href={nav.link}>{nav.title}</a>
                </button>
              ) : (
                <a
                  href={nav.link || `#${nav.id}`}
                  className="text-[16px] font-medium text-dimWhite hover:text-white"
                >
                  {nav.title}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-blue-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-50`} // Ensure menu is on top
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => {
              if (isRegisterPage && nav.title === "Register") {
                return null;
              }
              if (isLoginPage && nav.title === "Login") {
                return null;
              }

              return (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                >
                  {nav.title === "Register" ? (
                    <button className="py-2 px-4 text-[16px] font-medium bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
                      <a href={nav.link} aria-label={nav.title}>{nav.title}</a>
                    </button>
                  ) : nav.title === "Login" ? (
                    <button className="py-2 px-4 text-[16px] font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                      <a href={nav.link} aria-label={nav.title}>{nav.title}</a>
                    </button>
                  ) : (
                    <a
                      href={nav.link || `#${nav.id}`}
                      className="text-[16px] font-medium text-dimWhite hover:text-white"
                      aria-label={nav.title}
                    >
                      {nav.title}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;


