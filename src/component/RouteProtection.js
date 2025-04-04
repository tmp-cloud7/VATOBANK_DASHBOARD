import { Navigate } from 'react-router-dom';

const RouteProtection = ({ cmp: Component, redirectTo = "/login" }) => {
    // Retrieve token and user data from sessionStorage
    const token = sessionStorage.getItem('access_token');
    const userData = sessionStorage.getItem('user');

    // Check if token or user data is missing
    if (!token || !userData) {
        // Redirect to login page if the user is not authenticated
        return <Navigate to={redirectTo} replace />;
    }

    // If authenticated, render the component passed to RouteProtection
    return <Component />;
};

export default RouteProtection;

// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// export default function RouteProtection(props) {
//     const navigate = useNavigate();
//     let Cmp = props.cmp;
//     useEffect(()=>{
//         if(sessionStorage.getItem('user')) {
//             Cmp = props.cmp;
//             return;
//         } else {
//             navigate("/login");
//         }
//     },[])
//   return (
//     <>
//         <Cmp/>
//     </>
//   )
// }
