// import { useState } from "react";
// import { close, logo, menu } from "../Assets";
// import { navLinks } from "./constants";
// import { useLocation } from "react-router-dom"; // Importing useLocation

// const NavbarLanding = () => {
//   const [active, setActive] = useState("Home");
//   const [toggle, setToggle] = useState(false);
//   const location = useLocation(); // Get the current route

//   // Check if the current page is "Register" or "Login"
//   const isRegisterOrLoginPage = location.pathname === "/register" || location.pathname === "/login";

//   return (
//     <nav className="w-full flex py-6 justify-between items-center navbar border-b border-gray-300 bg-blue-400">
//       <img src={logo} alt="vatobank" className="w-[124px] h-[32px]" />

//       <ul className="list-none sm:flex hidden justify-end items-center flex-1">
//         {navLinks.map((nav, index) => {
//           if (isRegisterOrLoginPage && (nav.title === "Register" || nav.title === "Login")) {
//             return null; // Hide Register and Login if we're on the Register or Login page
//           }

//           return (
//             <li
//               key={nav.id}
//               className={`font-poppins font-normal cursor-pointer text-[16px] ${
//                 active === nav.title ? "text-white" : "text-dimWhite"
//               } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
//               onClick={() => setActive(nav.title)}
//             >
//               {nav.title === "Register" ? (
//                 <button className="py-2 px-4 text-[16px] font-medium bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
//                   <a href={nav.link}>{nav.title}</a>
//                 </button>
//               ) : nav.title === "Login" ? (
//                 <button className="py-2 px-4 text-[16px] font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
//                   <a href={nav.link}>{nav.title}</a>
//                 </button>
//               ) : (
//                 <a
//                   href={nav.link || `#${nav.id}`}
//                   className="text-[16px] font-medium text-dimWhite hover:text-white"
//                 >
//                   {nav.title}
//                 </a>
//               )}
//             </li>
//           );
//         })}
//       </ul>

//       <div className="sm:hidden flex flex-1 justify-end items-center">
//         <img
//           src={toggle ? close : menu}
//           alt="menu"
//           className="w-[28px] h-[28px] object-contain"
//           onClick={() => setToggle(!toggle)}
//         />

//         <div
//           className={`${
//             !toggle ? "hidden" : "flex"
//           } p-6 bg-blue-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-50`} // Ensure menu is on top
//         >
//           <ul className="list-none flex justify-end items-start flex-1 flex-col">
//             {navLinks.map((nav, index) => {
//               if (isRegisterOrLoginPage && (nav.title === "Register" || nav.title === "Login")) {
//                 return null; // Hide Register and Login in mobile menu if we're on the Register or Login page
//               }

//               return (
//                 <li
//                   key={nav.id}
//                   className={`font-poppins font-medium cursor-pointer text-[16px] ${
//                     active === nav.title ? "text-white" : "text-dimWhite"
//                   } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
//                   onClick={() => setActive(nav.title)}
//                 >
//                   {nav.title === "Register" ? (
//                     <button className="py-2 px-4 text-[16px] font-medium bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
//                       <a href={nav.link} aria-label={nav.title}>{nav.title}</a>
//                     </button>
//                   ) : nav.title === "Login" ? (
//                     <button className="py-2 px-4 text-[16px] font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
//                       <a href={nav.link} aria-label={nav.title}>{nav.title}</a>
//                     </button>
//                   ) : (
//                     <a
//                       href={nav.link || `#${nav.id}`}
//                       className="text-[16px] font-medium text-dimWhite hover:text-white"
//                       aria-label={nav.title}
//                     >
//                       {nav.title}
//                     </a>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavbarLanding;
import { useState } from "react";
import { close, logo, menu } from "../Assets";
import { navLinks } from "./constants";
import { useLocation } from "react-router-dom"; // Importing useLocation

const NavbarLanding = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const location = useLocation(); // Get the current route

  // Check if the current page is "Register" or "Login"
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar border-b border-gray-300 bg-blue-400">
      <img src={logo} alt="vatobank" className="w-[124px] h-[32px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => {
          // Show only the "Login" button on the "Register" page
          if (isRegisterPage && nav.title === "Register") {
            return null; // Hide Register if we're on the Register page
          }
          // Show only the "Register" button on the "Login" page
          if (isLoginPage && nav.title === "Login") {
            return null; // Hide Login if we're on the Login page
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
              // Show only the "Login" button on the "Register" page
              if (isRegisterPage && nav.title === "Register") {
                return null; // Hide Register if we're on the Register page
              }
              // Show only the "Register" button on the "Login" page
              if (isLoginPage && nav.title === "Login") {
                return null; // Hide Login if we're on the Login page
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


// import { useState } from "react";
// import { close, logo, menu } from "../Assets";
// import { navLinks } from "./constants";

// const NavbarLanding = () => {
//   const [active, setActive] = useState("Home");
//   const [toggle, setToggle] = useState(false); 

//   return (
//     <nav className="w-full flex py-6 justify-between items-center navbar border-b border-gray-300 bg-blue-400">
//       <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />

//       <ul className="list-none sm:flex hidden justify-end items-center flex-1">
//       {navLinks.map((nav, index) => (
//   <li
//     key={nav.id}
//     className={`font-poppins font-normal cursor-pointer text-[16px] ${
//       active === nav.title ? "text-white" : "text-dimWhite"
//     } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
//     onClick={() => setActive(nav.title)}
//   >
//     {nav.title === "Register" ? (
//       <button className="py-2 px-4 text-[16px] font-medium bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
//         <a href={nav.link}>{nav.title}</a>
//       </button>
//     ) : nav.title === "Login" ? (
//       <button className="py-2 px-4 text-[16px] font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
//         <a href={nav.link}>{nav.title}</a>
//       </button>
//     ) : nav.title === "Blogs" ? (
//       <a
//         href={nav.link}
//         className="text-[16px] font-medium text-dimWhite hover:text-white"
//       >
//         {nav.title}
//       </a>
//     ) : nav.title === "Our Services" ? (
//       <a
//         href={nav.link}
//         className="text-[16px] font-medium text-dimWhite hover:text-white"
//       >
//         {nav.title}
//       </a>
//     ) : nav.title === "Home" ? (
//       <a
//         href={nav.link}
//         className="text-[16px] font-medium text-dimWhite hover:text-white"
//       >
//         {nav.title}
//       </a>
//     ) : (
//       <a
//         href={`#${nav.id}`}
//         className="text-[16px] font-medium text-dimWhite hover:text-white"
//       >
//         {nav.title}
//       </a>
//     )}
//   </li>
// ))}

//       </ul>

//       <div className="sm:hidden flex flex-1 justify-end items-center">
//   <img
//     src={toggle ? close : menu}
//     alt="menu"
//     className="w-[28px] h-[28px] object-contain"
//     onClick={() => setToggle(!toggle)}
//   />

//   <div
//     className={`${
//       !toggle ? "hidden" : "flex"
//     } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
//   >
//     <ul className="list-none flex justify-end items-start flex-1 flex-col">
//       {navLinks.map((nav, index) => (
//         <li
//           key={nav.id}
//           className={`font-poppins font-medium cursor-pointer text-[16px] ${
//             active === nav.title ? "text-white" : "text-dimWhite"
//           } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
//           onClick={() => setActive(nav.title)}
//         >
//           {nav.title === "Register" ? (
//             <button className="py-2 px-4 text-[16px] font-medium bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
//               <a href={nav.link} aria-label={nav.title}>{nav.title}</a>
//             </button>
//           ) : nav.title === "Login" ? (
//             <button className="py-2 px-4 text-[16px] font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
//               <a href={nav.link} aria-label={nav.title}>{nav.title}</a>
//             </button>
//           ) : (
//             <a
//               href={nav.link || `#${nav.id}`}
//               className="text-[16px] font-medium text-dimWhite hover:text-white"
//               aria-label={nav.title}
//             >
//               {nav.title}
//             </a>
//           )}
//         </li>
//       ))}
//     </ul>
//   </div>
// </div>


//       {/* <div className="sm:hidden flex flex-1 justify-end items-center">
//         <img
//           src={toggle ? close : menu}
//           alt="menu"
//           className="w-[28px] h-[28px] object-contain"
//           onClick={() => setToggle(!toggle)}
//         />

//         <div
//           className={`${
//             !toggle ? "hidden" : "flex"
//           } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
//         >
//           <ul className="list-none flex justify-end items-start flex-1 flex-col">
//             {navLinks.map((nav, index) => (
//               <li
//                 key={nav.id}
//                 className={`font-poppins font-medium cursor-pointer text-[16px] ${
//                   active === nav.title ? "text-white" : "text-dimWhite"
//                 } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
//                 onClick={() => setActive(nav.title)}
//               >
//                 {nav.title === "Register" ? (
//                   <button className="py-2 px-4 text-[16px] font-medium bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
//                     <a href={nav.link}>{nav.title}</a>
//                   </button>
//                 ) : nav.link ? (
//                   <button className="py-2 px-4 text-[16px] font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
//                     <a href={nav.link}>{nav.title}</a>
//                   </button>
//                 ) : (
//                   <a href={`#${nav.id}`} className="text-[16px] font-medium text-dimWhite hover:text-white">
//                     {nav.title}
//                   </a>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div> */}
//     </nav>
//   );
// };

// export default NavbarLanding;
