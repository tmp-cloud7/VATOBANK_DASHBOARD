import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaApplePay, FaLandmark, FaFileInvoiceDollar, FaPiggyBank, FaUser } from 'react-icons/fa6';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { LuWallet } from 'react-icons/lu';
import { openNavbarSelector } from '../../features/page/pageSlice';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const location = useLocation();
    const openNav = useSelector(openNavbarSelector);
    const [currentPage, setCurrentPage] = useState(location.pathname.split('/')[2] || 'home');
    const currentPageStyle = 'bg-blue-400 text-white';
    const navigate = useNavigate();

    // Safely handle click and update current page state
    const handleClick = (path) => {
        const pageLabel = path.split('/')[2] || 'home'; // Extract page label more reliably
        setCurrentPage(pageLabel); // Update currentPage
        navigate(path);
    };

    // useEffect to update currentPage on location change
    useEffect(() => {
        setCurrentPage(location.pathname.split('/')[2] || 'home'); // Ensure currentPage is valid
    }, [location]);

    const pages = [
        { path: '/dashboard', icon: <FaLandmark />, label: 'Home' },
        { path: '/dashboard/accounts', icon: <LuWallet />, label: 'Accounts' },
        { path: '/dashboard/payments', icon: <FaApplePay />, label: 'Payments' },
        { path: '/dashboard/transactions', icon: <FaFileInvoiceDollar />, label: 'Transactions' },
        // { path: '/dashboard/settings', icon: <FaFileInvoiceDollar />, label: 'Settings' },
        { path: '/dashboard/profile', icon: <FaUser />, label: 'Profile' },
        // { path: '/dashboard/pinpage', icon: <FaUser />, label: 'PinPage' },
    ];

    return (
        <nav className={`${!openNav ? 'hidden lg:flex' : 'block'} fixed top-0 left-0 bottom-0 z-50 bg-white lg:flex flex-col w-250 border-l-2 gap-2 items-start border-r border-gray-300 shadow-xl`}>
            <h1 className='text-xl font-bold w-full flex gap-2 items-center p-5 border-b border-gray-300 shadow-sm'>
                <FaPiggyBank size={40} /> VATO BANK
            </h1>
            <ul className='w-full text-grey-600'>
                {pages.map((page, id) => (
                    <li key={id} className='p-1'>
                        <button
                            onClick={() => handleClick(page.path)}
                            className={`rounded-md flex gap-2 items-center p-4 pt-2 pb-2 hover:bg-blue-400 hover:text-white w-full ${currentPage && currentPage.startsWith(page.label.toLowerCase()) ? currentPageStyle : ''}`}
                        >
                            {page.icon}
                            {page.label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-auto w-full"> {/* This div creates the separation between regular items and the logout item */}
                <ul className='w-full'>
                    <li className='p-1'>
                        <button
                            onClick={() => handleClick('/dashboard/logout')}
                            className={`rounded-md flex gap-2 items-center p-4 pt-2 pb-2 hover:bg-blue-400 hover:text-white w-full ${currentPage && currentPage.startsWith('logout') ? currentPageStyle : ''}`}
                        >
                            <RiLogoutBoxRLine />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaApplePay, FaLandmark, FaFileInvoiceDollar, FaPiggyBank, FaUser } from 'react-icons/fa6';
// import { RiLogoutBoxRLine } from "react-icons/ri";
// import { LuWallet } from 'react-icons/lu';
// import { openNavbarSelector } from '../../features/page/pageSlice';
// import { useSelector } from 'react-redux';

// const NavBar = () => {
//     const location = useLocation();
//     const openNav = useSelector(openNavbarSelector);
//     const [currentPage, setCurrentPage] = useState(location.pathname.split('/')[2] || 'home');
//     const currentPageStyle = 'bg-blue-400 text-white';
//     const navigate = useNavigate();

//     // Safely handle click and update current page state
//     const handleClick = (path) => {
//         const pageLabel = path.split('/')[2] || 'home'; // Extract page label more reliably
//         setCurrentPage(pageLabel); // Update currentPage
//         navigate(path);
//     };

//     // useEffect to update currentPage on location change
//     useEffect(() => {
//         setCurrentPage(location.pathname.split('/')[2] || 'home'); // Ensure currentPage is valid
//     }, [location]);

//     const pages = [
//         { path: '/dashboard', icon: <FaLandmark />, label: 'Home' },
//         { path: '/dashboard/accounts', icon: <LuWallet />, label: 'Accounts' },
//         { path: '/dashboard/payments', icon: <FaApplePay />, label: 'Payments' },
//         { path: '/dashboard/transactions', icon: <FaFileInvoiceDollar />, label: 'Transactions' },
//         { path: '/dashboard/settings', icon: <FaFileInvoiceDollar />, label: 'Settings' },
//         { path: '/dashboard/profile', icon: <FaUser />, label: 'Profile' },
//         { path: '/dashboard/pinpage', icon: <FaUser />, label: 'PinPage' },
//         { path: '/dashboard/logout', icon: <RiLogoutBoxRLine />, label: 'Logout' },
//     ];

//     return (
//         <nav className={`${!openNav ? 'hidden lg:flex' : 'block'} fixed top-0 left-0 bottom-0 z-50 bg-white lg:flex flex-col w-250 border-l-2 gap-2 items-start border-r border-gray-300 shadow-xl`}>
//             <h1 className='text-xl font-bold w-full flex gap-2 items-center p-5 border-b border-gray-300 shadow-sm'>
//                 <FaPiggyBank size={40} /> VATO BANK
//             </h1>
//             <ul className='w-full text-grey-600'>
//                 {pages.map((page, id) => (
//                     <li key={id} className='p-1'>
//                         <button
//                             onClick={() => handleClick(page.path)}
//                             className={`rounded-md flex gap-2 items-center p-4 pt-2 pb-2 hover:bg-blue-400 hover:text-white w-full ${currentPage && currentPage.startsWith(page.label.toLowerCase()) ? currentPageStyle : ''}`}
//                         >
//                             {page.icon}
//                             {page.label}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     );
// };

// export default NavBar;

