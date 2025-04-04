import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionContainer from '../../component/SectionContainer';
import api from '../../api/api';  // Assuming you have an API handler
import WithdrawForm from '../../component/account/Withdrawform';
import DepositForm from '../../component/account/Depositform';
import TransferForm from '../../component/account/Transferform';
import { TbCurrencyNaira } from "react-icons/tb";
const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [balance, setBalance] = useState(null);  // State to store balance
  const [status, setStatus] = useState('IDLE');  // Track status (IDLE, PENDING, SUCCESS, FAILED)
  const [activeForm, setActiveForm] = useState(null);  // Track the active form ('withdraw', 'deposit', 'transfer')

  // Function to format the balance
  const formatBalance = (balance) => {
    if (balance !== null && balance !== undefined) {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <TbCurrencyNaira style={{ marginRight: '4px' }} /> 
          {parseFloat(balance).toFixed(2)} {/* Display balance with currency icon in line */}
        </span>
      );
    }
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <TbCurrencyNaira style={{ marginRight: '4px' }} />
        0.00 {/* Default value when balance is null or undefined */}
      </span>
    );
  };
  // Handle balance extraction
  const handleGetBalance = async () => {
    setStatus('PENDING');  // Set status to pending when the request starts
    try {
      const response = await api.post('/onboarding/generate/account-number');  // Adjust API path if necessary

      console.log("API Response:", response.data);  // Log the entire response to check the structure

      // Check if response is successful and has the account data
      if (response.data.success && response.data.result && response.data.result.acccount) {
        const accountBalance = response.data.result.acccount.balance;  // Extract balance from the correct field (acccount)
        setBalance(accountBalance);  // Set the balance state
        setStatus('SUCCESS');  // Set status to success when the request is successful
      } else {
        // If the backend doesn't return the expected structure or success flag
        console.error("Unexpected response structure:", response.data);  // Log unexpected response
        setStatus('FAILED');  // Set status to failed
      }
    } catch (err) {
      // If there is an error from the backend or network
      console.error('Error fetching balance:', err);  // Log error to console for more information
      setStatus('FAILED');  // Set status to failed
    }
  };

  // Call handleGetBalance when the component is mounted
  useEffect(() => {
    handleGetBalance();
  }, []);

  // Current page style logic (hide the balance display if a form is open)
  const currentPageStyle = activeForm ? 'hidden' : 'flex';

  return (
    <SectionContainer extraStyles={'overflow-x-auto items-center'}>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <p className="font-bold text-grey-600 text-sm">Balance</p>
      </div>

      <div className={`mt-4 p-4 rounded-xl border bg-white shadow-sm ${currentPageStyle}`}>
        {status === 'PENDING' && <p>Fetching balance...</p>}
        {status === 'SUCCESS' && balance !== null && (
          <div>
            <p className="text-xl">Current Balance: {formatBalance(balance)}</p> {/* Display formatted balance */}
          </div>
        )}
        {status === 'FAILED' && (
          <div>
            <p className="text-red-500 font-semibold">Error: Something went wrong while fetching your balance.</p> {/* Generic error message */}
          </div>
        )}
        {status === 'IDLE' && <p>Ready to fetch your balance.</p>}
      </div>

      <div className="text-sm sm:text-xl p-2 rounded-xl flex gap-2 mt-32">
        <button
          onClick={() => setActiveForm('withdraw')}
          className="p-2 rounded-xl bg-gray-50 hover:bg-blue-500 hover:text-white pt-2 pb-2"
        >
          Withdraw
        </button>
        <button
          onClick={() => setActiveForm('deposit')}
          className="p-2 rounded-xl bg-gray-50 hover:bg-blue-500 hover:text-white pt-2 pb-2"
        >
          Deposit
        </button>
        <button
          onClick={() => setActiveForm('transfer')}
          className="p-2 rounded-xl bg-gray-50 hover:bg-blue-500 hover:text-white pt-2 pb-2"
        >
          Transfer
        </button>
      </div>

      {/* Conditional rendering of forms */}
      {activeForm === 'withdraw' && <WithdrawForm setActiveForm={setActiveForm} />}
      {activeForm === 'deposit' && <DepositForm setActiveForm={setActiveForm} />}
      {activeForm === 'transfer' && <TransferForm setActiveForm={setActiveForm} />}
    </SectionContainer>
  );
};

export default Account;




// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import SectionContainer from '../../component/SectionContainer';
// import api from '../../api/api';  // Assuming you have an API handler
// import WithdrawForm from '../../component/account/Withdrawform';
// import DepositForm from '../../component/account/Depositform';
// import TransferForm from '../../component/account/Transferform';

// const Account = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [balance, setBalance] = useState(null);  // State to store balance
//   const [status, setStatus] = useState('IDLE');  // Track status (IDLE, PENDING, SUCCESS, FAILED)
//   const [error, setError] = useState(null);  // Store error messages
//   const [activeForm, setActiveForm] = useState(null);  // Track the active form ('withdraw', 'deposit', 'transfer')

//   // Handle balance extraction
//   const handleGetBalance = async () => {
//     setStatus('PENDING');  // Set status to pending when the request starts
//     try {
//       const response = await api.post('/onboarding/generate/account-number');  // Adjust API path if necessary

//       // Check if response is successful and has the account data
//       if (response.data.success && response.data.result && response.data.result.account) {
//         const accountBalance = response.data.result.account.balance;  // Extract balance
//         setBalance(accountBalance);  // Set the balance state
//         setStatus('SUCCESS');  // Set status to success when the request is successful
//       } else {
//         const backendError = response.data.message || 'Account data or balance is missing';  // Get error message from backend
//         setError(backendError);  // Set error from backend
//         setStatus('FAILED');  // Set status to failed
//       }
//     } catch (err) {
//       // If there is an error from the backend or network
//       const backendError = err.response && err.response.data && err.response.data.message
//         ? err.response.data.message
//         : err.message;  // Use backend error message if available, otherwise generic message
//       setError(backendError);  // Set error message
//       setStatus('FAILED');  // Set status to failed
//     }
//   };

//   // Call handleGetBalance when the component is mounted
//   useEffect(() => {
//     handleGetBalance();
//   }, []);

//   // Current page style logic (hide the balance display if a form is open)
//   const currentPageStyle = activeForm ? 'hidden' : 'flex';

//   return (
//     <SectionContainer extraStyles={'overflow-x-auto items-center'}>
//       <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
//         <p className="font-bold text-grey-600 text-sm">Balance</p>
//       </div>

//       <div className={`mt-4 p-4 rounded-xl border bg-white shadow-sm ${currentPageStyle}`}>
//         {status === 'PENDING' && <p>Fetching balance...</p>}
//         {status === 'SUCCESS' && balance !== null && (
//           <div>
//             <p className="text-xl">Current Balance: N{balance}</p>
//           </div>
//         )}
//         {status === 'FAILED' && (
//           <div>
//             {/* Show the error message */}
//             <p className="text-red-500 font-semibold"> {error}</p>
//           </div>
//         )}
//         {status === 'IDLE' && <p>Ready to fetch your balance.</p>}
//       </div>

//       <div className="text-sm sm:text-xl p-2 rounded-xl flex gap-2 mt-32">
//         <button
//           onClick={() => setActiveForm('withdraw')}
//           className="p-2 rounded-xl bg-gray-50 hover:bg-blue-500 hover:text-white pt-2 pb-2"
//         >
//           Withdraw
//         </button>
//         <button
//           onClick={() => setActiveForm('deposit')}
//           className="p-2 rounded-xl bg-gray-50 hover:bg-blue-500 hover:text-white pt-2 pb-2"
//         >
//           Deposit
//         </button>
//         <button
//           onClick={() => setActiveForm('transfer')}
//           className="p-2 rounded-xl bg-gray-50 hover:bg-blue-500 hover:text-white pt-2 pb-2"
//         >
//           Transfer
//         </button>
//       </div>

//       {/* Conditional rendering of forms */}
//       {activeForm === 'withdraw' && <WithdrawForm setActiveForm={setActiveForm} />}
//       {activeForm === 'deposit' && <DepositForm setActiveForm={setActiveForm} />}
//       {activeForm === 'transfer' && <TransferForm setActiveForm={setActiveForm} />}
//     </SectionContainer>
//   );
// };

// export default Account;


// import React, { useState, useEffect } from 'react';
// import { FaExchangeAlt, FaPlus } from 'react-icons/fa';
// import { useLocation, useNavigate } from 'react-router-dom';
// import SectionContainer from '../../component/SectionContainer';
// import api from '../../api/api';  // Assuming you have an API handler
// import WithdrawForm from '../../component/account/Withdrawform';
// import DepositForm from '../../component/account/Depositform';
// import TransferForm from '../../component/account/Transferform';

// const Account = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [balance, setBalance] = useState(null);  // State to store balance
//   const [status, setStatus] = useState('IDLE');  // Track status (IDLE, PENDING, SUCCESS, FAILED)
//   const [error, setError] = useState(null);  // Store error messages
//   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
//   const [showDepositForm, setShowDepositForm] = useState(false);
//   const [showTransferForm, setShowTransferForm] = useState(false);

//   // Handle balance extraction
//   const handleGetBalance = async () => {
//     setStatus('PENDING');  // Set status to pending when the request starts
//     try {
//       const response = await api.post('/onboarding/generate/account-number');  // Adjust API path if necessary

//       // Check if response is successful and has the account data
//       if (response.data.success && response.data.result && response.data.result.acccount) {
//         const accountBalance = response.data.result.acccount.balance;  // Extract balance
//         setBalance(accountBalance);  // Set the balance state
//         setStatus('SUCCESS');  // Set status to success when the request is successful
//       } else {
//         setError('Account data or balance is missing');
//         setStatus('FAILED');
//       }
//     } catch (err) {
//       setError(err.message);  // Handle any errors from the API request
//       setStatus('FAILED');
//     }
//   };

//   // Call handleGetBalance when the component is mounted
//   useEffect(() => {
//     handleGetBalance();
//   }, []);

//   const currentPageStyle = showWithdrawForm || showDepositForm || showTransferForm ? 'hidden' : 'flex';

//   return (
//     <SectionContainer extraStyles={'overflow-x-auto items-center'}>
//       <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
//         <p className="font-bold text-grey-600 text-sm">Balance</p>
//         {/* <h1 className="font-bold text-grey-600 text-sm">Account Balance</h1> */}
//       </div>

      

//       <div className={`mt-4 p-4 rounded-xl border bg-white shadow-sm ${currentPageStyle}`}>
//         {status === 'PENDING' && <p>Fetching balance...</p>}
//         {status === 'SUCCESS' && balance !== null && (
//           <div>
//             {/* <h2 className="text-lg font-semibold">Balance Retrieved Successfully</h2> */}
//             <p className="text-xl">Current Balance: N{balance}</p>
//           </div>
//         )}
//         {status === 'FAILED' && <div><p>Error: {error}</p></div>}
//         {status === 'IDLE' && <p>Ready to fetch your balance.</p>}
//       </div>

//       <div className="text-sm sm:text-xl p-2 rounded-xl flex gap-2 mt-32">
//     <button
//         onClick={() => setShowWithdrawForm(true)}
//         className="p-2 rounded-xl bg-gray-50 hover:bg-blue-500 hover:text-white pt-2 pb-2"
//       >
//         Withdraw
//       </button>
//       <button
//         onClick={() => setShowDepositForm(true)}
//         className="p-2 rounded-xl bg-gray-50 hover:bg-blue-500 hover:text-white pt-2 pb-2"
//       >
//         Deposit
//       </button>
//       <button
//         onClick={() => setShowTransferForm(true)}
//         className="p-2 rounded-xl bg-gray-50 hover:bg-blue-500 hover:text-white pt-2 pb-2"
//       >
//         Transfer
//       </button>
// </div>


//       {/* Conditional rendering of forms */}
//       {showWithdrawForm && <WithdrawForm setShowWithdrawForm={setShowWithdrawForm} />}
//       {showDepositForm && <DepositForm setShowDepositForm={setShowDepositForm} />}
//       {showTransferForm && <TransferForm setShowTransferForm={setShowTransferForm} />}
//     </SectionContainer>
//   );
// };

// export default Account;

// import React, {useEffect, useState} from 'react'
// import { FaExchangeAlt, FaPlus } from 'react-icons/fa'
// import { useLocation, useNavigate } from 'react-router-dom'
// import SectionContainer from '../../component/SectionContainer'

// const Account = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const navigatePage = (path) => {
//     navigate(path);
//   }
//   const [ showWithdrawForm, setShowWithdrawForm] = useState(false);
//   const [showDepositForm, setShowDepositForm] = useState(false);
//   const [showTransferForm, setShowTransferForm] = useState(false);

//   const currentPageStyle = showWithdrawForm || showDepositForm || showTransferForm ? 'hidden' : 'flex';
//   return (
//   //  { { showWithdrawForm && <Withdraw setShowWithdrawForm={setShowWithdrawForm}/>}}
//   //  { { showDepositForm && <Deposit setShowDepositForm={setShowDepositForm}/>}}
//   //  { { showTransferForm && <Deposit setShowTransferForm={setShowTransferForm}/>}}
//     <SectionContainer extraStyles={'overflow-x-auto items-center'}>
//       <div className='w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
//         <p className='font-bold text-grey-600 text-sm'> Balance</p>
//         <h1 className='font-bold text-grey-600 text-sm'> Balance</h1>
//       </div>

//       <div className='text-sm sm:text-xl p-2 rounded-xl flex gap-2'>
//         <button onClick={()=> setShowWithdrawForm(true)}className='p-2 rounded-xl bg-grey-50 hover:bg-grey-200 pt-2 pb-2 hover:bg-white'>Withdraw</button>
//         <button onClick={()=> setShowDepositForm(true)}className='p-2 rounded-xl bg-grey-50 hover:bg-grey-200 pt-2 pb-2 hover:bg-white'>Deposit</button>
//         <button onClick={()=> setShowTransferForm(true)}className='p-2 rounded-xl bg-grey-50 hover:bg-grey-200 pt-2 pb-2 hover:bg-white'>Transfer</button>

//       </div>
//     </SectionContainer>
//   )
// }

// export default Account
