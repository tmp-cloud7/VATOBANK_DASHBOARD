import React from 'react'
import styles from "../style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, NavbarLanding, Stats, Testimonials, Hero } from "../component";


const LandingPage = () => {
  return (  
  <div className="bg-primary w-full overflow-hidden">
    {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>  */}
        <NavbarLanding />
       {/* </div>
    </div> */}

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Business />
        <Billing />
        <CardDeal />
        <Testimonials />
        <Clients />
        <CTA />
       
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default LandingPage

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="font-sans bg-gray-100"> {/* Apply grey background to the whole page */}
//       {/* Navbar */}
//         <nav className="bg-blue-600 p-4">
//   <div className="container mx-auto flex justify-between items-center">
//     <div className="text-white text-2xl font-semibold">BankLogo</div>

//     {/* Mobile Hamburger Menu */}
//     <button
//       className="lg:hidden text-white ml-auto"
//       onClick={toggleMenu}
//     >
//       {isMenuOpen ? 'X' : '☰'}
//     </button>

//     {/* Desktop Navbar */}
//     <ul className={`lg:flex space-x-8 text-white ${isMenuOpen ? 'block' : 'hidden'} lg:block justify-center w-full`}>
//       <li><a href="#home" className="hover:text-gray-200">Home</a></li>
//       <li><a href="#services" className="hover:text-gray-200">Services</a></li>
//       <li><a href="#about" className="hover:text-gray-200">About</a></li>
//       <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>

//       {/* Register and Login buttons in the dropdown */}
//       <li className="lg:hidden">
//         <Link to="/register">
//           <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 w-full text-center">
//             Register
//           </button>
//         </Link>
//       </li>
//       <li className="lg:hidden">
//         <Link to="/login">
//           <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 w-full text-center">
//             Login
//           </button>
//         </Link>
//       </li>
//     </ul>

//     {/* Buttons moved to the right-end (for desktop view) */}
//     <ul className="lg:flex space-x-8 text-white ml-auto hidden lg:block">
//       <li>
//         <Link to="/register">
//           <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">
//             Register
//           </button>
//         </Link>
//       </li>
      
//       {/* Login Button */}
//       <li>
//         <Link to="/login">
//           <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
//             Login
//           </button>
//         </Link>
//       </li>
//     </ul>
//   </div>
// </nav>



//       {/* Hero Section */}
//       <section className="bg-blue-100 text-center py-20 px-6">
//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">Welcome to Our Bank</h1>
//         <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-700">Secure, fast, and reliable banking services for you.</p>
//         <div className="mt-8">
//           <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
//             Learn More
//           </button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="bg-gray-200 py-20" id="services"> {/* Lighter grey background */}
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-semibold text-blue-600">Our Services</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//               <img src="https://via.placeholder.com/150" alt="Service 1" className="w-full h-40 object-cover rounded-md"/>
//               <h3 className="text-xl font-semibold mt-4">Online Banking</h3>
//               <p className="mt-2 text-gray-600">Manage your finances anytime, anywhere with our online platform.</p>
//             </div>
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//               <img src="https://via.placeholder.com/150" alt="Service 2" className="w-full h-40 object-cover rounded-md"/>
//               <h3 className="text-xl font-semibold mt-4">Credit Cards</h3>
//               <p className="mt-2 text-gray-600">Earn rewards and manage your expenses with our credit card options.</p>
//             </div>
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//               <img src="https://via.placeholder.com/150" alt="Service 3" className="w-full h-40 object-cover rounded-md"/>
//               <h3 className="text-xl font-semibold mt-4">Loans</h3>
//               <p className="mt-2 text-gray-600">Get the financial assistance you need with our personal loan services.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="bg-gray-100 py-20" id="about"> {/* Lighter grey background */}
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-semibold text-blue-600">About Us</h2>
//           <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto">
//             We are a trusted bank offering a wide range of financial services. Our goal is to provide secure, easy, and reliable solutions to help you manage your money better.
//           </p>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="bg-gray-200 py-20" id="contact"> {/* Lighter grey background */}
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-semibold text-blue-600">Get in Touch</h2>
//           <p className="mt-4 text-lg sm:text-xl text-gray-700">Have questions? Reach out to us, and we'll be happy to assist you.</p>
//           <button className="bg-blue-600 text-white py-2 px-6 mt-6 rounded-md hover:bg-blue-700">
//             Contact Us
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-blue-600 text-white py-6">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2025 Banking Inc. All Rights Reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;

// // // src/components/LandingPage.js
// // // src/components/LandingPage.js
// // import React, { useState } from 'react';

// // const LandingPage = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   return (
// //     <div className="font-sans">
// //       {/* Navbar */}
// //       <nav className="bg-blue-600 p-4">
// //         <div className="container mx-auto flex justify-between items-center">
// //           <div className="text-white text-2xl font-semibold">BankLogo</div>
          
// //           {/* Mobile Hamburger Menu */}
// //           <button
// //             className="lg:hidden text-white"
// //             onClick={toggleMenu}
// //           >
// //             {isMenuOpen ? 'X' : '☰'}
// //           </button>
          
// //           {/* Desktop Navbar */}
// //           <ul className={`lg:flex space-x-8 text-white ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
// //             <li><a href="#home" className="hover:text-gray-200">Home</a></li>
// //             <li><a href="#services" className="hover:text-gray-200">Services</a></li>
// //             <li><a href="#about" className="hover:text-gray-200">About</a></li>
// //             <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>
// //           </ul>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <section className="bg-blue-100 text-center py-20 px-6">
// //         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">Welcome to Our Bank</h1>
// //         <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-700">Secure, fast, and reliable banking services for you.</p>
// //         <div className="mt-8">
// //           <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
// //             Learn More
// //           </button>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="bg-white py-20" id="services">
// //         <div className="container mx-auto text-center">
// //           <h2 className="text-3xl font-semibold text-blue-600">Our Services</h2>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
// //             <div className="bg-gray-50 p-6 rounded-lg shadow-md">
// //               <img src="https://via.placeholder.com/150" alt="Service 1" className="w-full h-40 object-cover rounded-md"/>
// //               <h3 className="text-xl font-semibold mt-4">Online Banking</h3>
// //               <p className="mt-2 text-gray-600">Manage your finances anytime, anywhere with our online platform.</p>
// //             </div>
// //             <div className="bg-gray-50 p-6 rounded-lg shadow-md">
// //               <img src="https://via.placeholder.com/150" alt="Service 2" className="w-full h-40 object-cover rounded-md"/>
// //               <h3 className="text-xl font-semibold mt-4">Credit Cards</h3>
// //               <p className="mt-2 text-gray-600">Earn rewards and manage your expenses with our credit card options.</p>
// //             </div>
// //             <div className="bg-gray-50 p-6 rounded-lg shadow-md">
// //               <img src="https://via.placeholder.com/150" alt="Service 3" className="w-full h-40 object-cover rounded-md"/>
// //               <h3 className="text-xl font-semibold mt-4">Loans</h3>
// //               <p className="mt-2 text-gray-600">Get the financial assistance you need with our personal loan services.</p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* About Section */}
// //       <section className="bg-blue-50 py-20" id="about">
// //         <div className="container mx-auto text-center">
// //           <h2 className="text-3xl font-semibold text-blue-600">About Us</h2>
// //           <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto">
// //             We are a trusted bank offering a wide range of financial services. Our goal is to provide secure, easy, and reliable solutions to help you manage your money better.
// //           </p>
// //         </div>
// //       </section>

// //       {/* Contact Section */}
// //       <section className="bg-gray-100 py-20" id="contact">
// //         <div className="container mx-auto text-center">
// //           <h2 className="text-3xl font-semibold text-blue-600">Get in Touch</h2>
// //           <p className="mt-4 text-lg sm:text-xl text-gray-700">Have questions? Reach out to us, and we'll be happy to assist you.</p>
// //           <button className="bg-blue-600 text-white py-2 px-6 mt-6 rounded-md hover:bg-blue-700">
// //             Contact Us
// //           </button>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-blue-600 text-white py-6">
// //         <div className="container mx-auto text-center">
// //           <p>&copy; 2025 Banking Inc. All Rights Reserved.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default LandingPage;


// // import React, { useState } from 'react'
// // import { FcMenu } from 'react-icons/fc'

// // const Nav = () => {
// //     const [ menu, setMenu ] = useState(false)
// //   return (
// //     <div className='md-5 md:mb-10 bg-blue-300'>
// //         <div className='container px-5 md:px-10 mx-auto relative font-poppins flex items-center justify-between py-8'>
// //             <div>
// //                 <h2 className='text-2xl'>VATO BANK</h2>
// //             </div>
// //             <div>
// //                 <ul className={`${menu ? "h-72 ": "h-0"} flex items-center sm:gap-10 gap-8 capitalize absolute sm:relative top-[70px] right-[20px] sm:top-0 bg-gray-gradient sm:bg-gradient-to-r from-transparent z-50 sm:flex-row flex-col rounded-lg w-[92%] xs:w-72 justify-center sm:h-auto transition-all duration-500 sm:w-auto sm:justify-normal overflow-hidden`}>
// //                     {navLinks.map((item)=> { 
// //                         <li key={item.id}>
// //                             <a href={`${item.id}`} className='font-[500]'>
// //                                 {item.title}
// //                             </a>

// //                         </li>
// //                     })}
// //                 </ul>
// //                 <FcMenu className='sm:hidden block cursor-pointer text-2xl text-white' onClick={()=> setMenu=(!menu)}/>
// //             </div>
// //         </div>      
// //     </div>
// //   )
// // }

// // export default Nav
