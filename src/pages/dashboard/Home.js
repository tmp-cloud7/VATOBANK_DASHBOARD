import { useState } from 'react';
import api from '../../api/api'; // Import your API handler
import SectionContainer from '../../component/SectionContainer';
import { TbCurrencyNaira } from "react-icons/tb";
import Transaction from './Transaction'; // Import the Transaction component
import AccNo from './AccNo'; // Import the Transaction component

const Home = () => {
    const [balance, setBalance] = useState(null); // State to store balance
    const [status, setStatus] = useState('IDLE'); // Track status (IDLE, PENDING, SUCCESS, FAILED)
    const [error, setError] = useState(null); // Store error messages

    const handleGetBalance = async () => {
        setStatus('PENDING'); // Set status to pending when the request starts
        try {
            const response = await api.post('/onboarding/generate/account-number');
    
            // Check if response is successful and has the account data
            if (response.data.success && response.data.result && response.data.result.acccount) {
                let accountBalance = response.data.result.acccount.balance; // Extract balance
                
                // Format the balance to two decimal places
                accountBalance = parseFloat(accountBalance).toFixed(2);
    
                setBalance(accountBalance); // Set the balance state
                setStatus('SUCCESS'); // Set status to success when the request is successful
            } else {
                // If the backend doesn't return the expected structure or success flag
                const backendError = response.data.message || 'Account data or balance is missing';
                setError(backendError); // Set error from the backend
                setStatus('FAILED');
            }
        } catch (err) {
            // In case of a network error or unexpected failure
            const backendError = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : err.message; // Use the backend error message or fallback to a generic message
            setError(backendError); // Set error message from the backend
            setStatus('FAILED');
        }
    };
    
    
    // Handle balance extraction
    // const handleGetBalance = async () => {
    //     setStatus('PENDING'); // Set status to pending when the request starts
    //     try {
    //         const response = await api.post('/onboarding/generate/account-number');

    //         // Check if response is successful and has the account data
    //         if (response.data.success && response.data.result && response.data.result.acccount) {
    //             const accountBalance = response.data.result.acccount.balance; // Extract balance
    //             setBalance(accountBalance); // Set the balance state
    //             setStatus('SUCCESS'); // Set status to success when the request is successful
    //         } else {
    //             // If the backend doesn't return the expected structure or success flag
    //             const backendError = response.data.message || 'Account data or balance is missing';
    //             setError(backendError); // Set error from the backend
    //             setStatus('FAILED');
    //         }
    //     } catch (err) {
    //         // In case of a network error or unexpected failure
    //         const backendError = err.response && err.response.data && err.response.data.message
    //             ? err.response.data.message
    //             : err.message; // Use the backend error message or fallback to a generic message
    //         setError( backendError); // Set error message from the backend
    //         setStatus('FAILED');
    //     }
    // };

    return (
       
        <SectionContainer className="mt-8 bg-blue">
             < AccNo />
            <div className="content-wrapper mt-6">
                {/* Conditionally render the button based on status */}
                {(status === 'IDLE' || status === 'FAILED') && (
                    <button 
                        onClick={handleGetBalance} 
                        disabled={status === 'PENDING'}
                        className={`fetch-button ${status === 'PENDING' ? 'bg-blue-400 cursor-not-allowed w-1/4'
                            : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:translate-y-1 cursor-pointer w-1/4'
                    } px-6 py-3 text-xs text-white font-semibold rounded-lg transition-all duration-300`} // Reduced font size with text-xs
               
                    >
                        {status === 'PENDING' ? 'Fetching...' : 'Show Balance'}
                    </button>
                )}

                {status === 'PENDING' && <p className="status-text loading-text">Fetching balance...</p>}

                {status === 'SUCCESS' && balance !== null && (
                   <div className="success-message">
                        <h2>Balance Retrieved Successfully</h2>
                        <p className="balance-text flex items-center">
                            <TbCurrencyNaira className="mr-1" /> {/* This will position the currency symbol before the balance */}
                            <strong>{balance}</strong>
                        </p>
                    </div>
               
                )}

                {status === 'FAILED' && (
                    <div className="error-message">
                        {/* <h2>Error</h2> */}
                        <p className="error-text text-red-500">{error}</p>
                    </div>
                )}

                {status === 'IDLE' && <p className="status-text mt-3">**********</p>}

                {/* Render the Transaction component below the balance section */}
                <Transaction className='mt-8'/>
            </div>
        </SectionContainer>
    );
};

export default Home;
// import { useState } from 'react';
// import api from '../../api/api'; // Import your API handler
// import SectionContainer from '../../component/SectionContainer';
// import Transaction from './Transaction'; // Import the Transaction component
// // import Settings from './Settings';

// const Home = () => {
//     const [balance, setBalance] = useState(null); // State to store balance
//     const [status, setStatus] = useState('IDLE'); // Track status (IDLE, PENDING, SUCCESS, FAILED)
//     const [error, setError] = useState(null); // Store error messages

//     // Handle balance extraction
//     const handleGetBalance = async () => {
//         setStatus('PENDING'); // Set status to pending when the request starts
//         try {
//             const response = await api.post('/onboarding/generate/account-number');

//             // Check if response is successful and has the account data
//             if (response.data.success && response.data.result && response.data.result.acccount) {
//                 const accountBalance = response.data.result.acccount.balance; // Extract balance
//                 setBalance(accountBalance); // Set the balance state
//                 setStatus('SUCCESS'); // Set status to success when the request is successful
//             } else {
//                 setError('Account data or balance is missing'); // If the data structure is not correct
//                 setStatus('FAILED');
//             }
//         } catch (err) {
//             setError('Error fetching balance: ' + err.message); // Handle any errors from the API request
//             setStatus('FAILED');
//         }
//     };

//     return (
//         <SectionContainer className="mt-8 bg-blue">
//             {/* < Settings /> */}
//             <div className="content-wrapper mt-6">
//                 {/* Conditionally render the button based on status */}
//                 {(status === 'IDLE' || status === 'FAILED') && (
//                     <button 
//                         onClick={handleGetBalance} 
//                         disabled={status === 'PENDING'}
//                         className={`fetch-button ${status === 'PENDING' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:translate-y-1 cursor-pointer'} px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300`}
//                     >
//                         {status === 'PENDING' ? 'Fetching...' : 'Show Balance'}
//                     </button>
//                 )}

//                 {status === 'PENDING' && <p className="status-text loading-text">Fetching balance...</p>}

//                 {status === 'SUCCESS' && balance !== null && (
//                     <div className="success-message">
//                         <h2>Balance Retrieved Successfully</h2>
//                         <p className="balance-text">Current Balance: <strong>N{balance}</strong></p>
//                     </div>
//                 )}

//                 {status === 'FAILED' && (
//                     <div className="error-message">
//                         <h2>Error</h2>
//                         <p className="error-text">{error}</p>
//                     </div>
//                 )}

//                 {status === 'IDLE' && <p className="status-text mt-3">**********</p>}

//                 {/* Render the Transaction component below the balance section */}
//                 <Transaction className='mt-8'/>
//             </div>
//         </SectionContainer>
//     );
// };

// export default Home;

    //    <SectionContainer className="mt-8 bg-blue">
    //         <div className="content-wrapper">
    //             {/* Conditionally render the button based on status */}
    //             {(status === 'IDLE' || status === 'FAILED') && (
    //                 <button 
    //                     onClick={handleGetBalance} 
    //                     disabled={status === 'PENDING'}
    //                     className={`fetch-button ${status === 'PENDING' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:translate-y-1 cursor-pointer'} px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300`}
    //                 >
    //                     {status === 'PENDING' ? 'Fetching...' : 'Get Balance'}
    //                 </button>
    //             )}

    //             {status === 'PENDING' && <p className="status-text loading-text">Fetching balance...</p>}

    //             {status === 'SUCCESS' && balance !== null && (
    //                 <div className="success-message">
    //                     <h2>Balance Retrieved Successfully</h2>
    //                     <p className="balance-text">Current Balance: <strong>N{balance}</strong></p>
    //                 </div>
    //             )}

    //             {status === 'FAILED' && (
    //                 <div className="error-message">
    //                     <h2>Error</h2>
    //                     <p className="error-text">{error}</p>
    //                 </div>
    //             )}

    //             {status === 'IDLE' && <p className="status-text mt-3">Ready to fetch your balance.</p>}
    //         </div>
    //     </SectionContainer>
        // <SectionContainer className="mt-8">
        //     <button onClick={handleGetBalance} disabled={status === 'PENDING'}>
        //         Get Balance
        //     </button>

        //     {status === 'PENDING' && <p>Fetching balance...</p>}
        //     {status === 'SUCCESS' && balance !== null && (
        //         <div>
        //             <h2>Balance Retrieved Successfully</h2>
        //             <p>Current Balance: N{balance}</p>
        //         </div>
        //     )}
        //     {status === 'FAILED' && <div><p>Error: {error}</p></div>}
        //     {status === 'IDLE' && <p>Ready to fetch your balance.</p>}

        // </SectionContainer>
       
//     );
// };




// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { generateAccount, resetStatus, fetchAccount, fetchAccountStatus } from '../../features/account/generateAccountSlice';

// const Home = () => {
//   const dispatch = useDispatch();

//   // Fetch the generated account data and status from the Redux store
//   const account = useSelector(fetchAccount);
//   const accountStatus = useSelector(fetchAccountStatus);

//   // Reset the account status when the component mounts
//   useEffect(() => {
//     dispatch(resetStatus());
//     // Automatically trigger account generation on mount
//     const accountDetails = {
//       // Example details to pass for account generation
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       phone: '123-456-7890',
//     };
    
//     dispatch(generateAccount(accountDetails));
//   }, [dispatch]);

//   // Render status message based on the account generation status
//   const renderStatus = () => {
//     switch (accountStatus) {
//       case 'PENDING':
//         return <p className="text-blue-500">Generating your account number...</p>;
//       case 'SUCCESS':
//         return (
//           <div className="text-green-500">
//             <p>Account Generated Successfully!</p>
//             <p className="text-xl font-semibold">Account Number: {account?.accountNumber}</p>
//           </div>
//         );
//       case 'FAILED':
//         return <p className="text-red-500">Error occurred while generating the account. Please try again.</p>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center mb-4">Your Generated Account</h2>

//         {/* Display the status of the account generation */}
//         {renderStatus()}

//         {/* Optional: You can show the generated account data */}
//         {accountStatus === 'SUCCESS' && account && account.accountNumber && (
//           <div className="mt-6">
//             <p className="text-lg font-medium text-gray-800">Account Number:</p>
//             <p className="text-2xl font-bold text-blue-600">{account.accountNumber}</p>
//             {/* <p className="text-sm text-gray-500">Account Type: {account.accountType}</p> Example of another detail */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { generateAccount, resetStatus, fetchAccount, fetchAccountStatus } from '../../features/account/generateAccountSlice';

// const Home = () => {
//   const dispatch = useDispatch();

//   // Fetch the generated account data and status from the Redux store
//   const account = useSelector(fetchAccount);
//   const accountStatus = useSelector(fetchAccountStatus);

//   // Reset the account status when the component mounts
//   useEffect(() => {
//     dispatch(resetStatus());
//     // Automatically trigger account generation on mount
//     const accountDetails = {
//       // Example details to pass for account generation
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       phone: '123-456-7890',
//     };
    
//     dispatch(generateAccount(accountDetails));
//   }, [dispatch]);

//   // Render status message based on the account generation status
//   const renderStatus = () => {
//     switch (accountStatus) {
//       case 'PENDING':
//         return <p className="text-blue-500">Generating your account number...</p>;
//       case 'SUCCESS':
//         return (
//           <div className="text-green-500">
//             <p>Account Generated Successfully!</p>
//             <p className="text-xl font-semibold">Account Number: {account?.accountNumber}</p>
//           </div>
//         );
//       case 'FAILED':
//         return <p className="text-red-500">Error occurred while generating the account. Please try again.</p>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center mb-4">Your Generated Account</h2>

//         {/* Display the status of the account generation */}
//         {renderStatus()}

//         {/* Optional: You can show the generated account data */}
//         {accountStatus === 'SUCCESS' && account && (
//           <div className="mt-6">
//             <p className="text-lg font-medium text-gray-800">Account Number:</p>
//             <p className="text-2xl font-bold text-blue-600">{account.accountNumber}</p>
//             {/* <p className="text-sm text-gray-500">Account Type: {account.accountType}</p> Example of another detail */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
