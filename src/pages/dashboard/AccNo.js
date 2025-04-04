import { useState } from 'react';
import api from '../../api/api';
import SectionContainer from '../../component/SectionContainer';

const AccNo = () => {
    const [account, setAccount] = useState(null);
    const [status, setStatus] = useState('IDLE');
    const [error, setError] = useState(null);

    // Handle account generation
    const handleGenerateAccount = async () => {
        setStatus('PENDING');
        try {
            const response = await api.post('/onboarding/generate/account-number');
            
            // Check if response has the expected structure and account data
            if (response.data && response.data.result && response.data.result.acccount) {
                setAccount(response.data.result.acccount);
                setStatus('SUCCESS');
            } else {
                // If the response does not contain the expected account data
                const backendError = response.data.message || 'Account data is missing';
                setError(backendError); // Set error from the backend response
                setStatus('FAILED');
            }
        } catch (err) {
            // Check if the backend error is in the response
            const backendError = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : err.message; // Use the backend error message or fallback to a generic message
            setError(backendError); // Set error message
            setStatus('FAILED');
        }
    };

    return (
        <div className="mt-5">
            {/* Conditionally render the button based on the status */}
            {(status === 'IDLE' || status === 'FAILED') && (
                <button
                onClick={handleGenerateAccount}
                disabled={status === 'PENDING'}
                className={`${
                    status === 'PENDING'
                        ? 'bg-blue-400 cursor-not-allowed w-1/4'
                        : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:translate-y-1 cursor-pointer w-1/4'
                } px-6 py-3 text-xs text-white font-semibold rounded-lg transition-all duration-300`} // Reduced font size with text-xs
            >
                {status === 'PENDING' ? 'Generating account...' : 'Show Account Number'}
            </button>
            
            )}

            {/* Loading State */}
            {status === 'PENDING' && <p>Generating account...</p>}

            {/* Success State */}
            {status === 'SUCCESS' && account && (
                <div className="mt-4">
                    <p>Account Number: {account.account_number}</p>
                </div>
            )}

            {/* Error State */}
            {status === 'FAILED' && (
                <div>
                    <p className='text-red-500'>{error}</p>
                </div>
            )}

            {/* Idle State */}
            {status === 'IDLE' && <p>***********</p>}
        </div>
    );
};

export default AccNo;
// import { useState } from 'react';
// import api from '../../api/api';
// import SectionContainer from '../../component/SectionContainer';

// const Settings = () => {
//     const [account, setAccount] = useState(null);
//     const [status, setStatus] = useState('IDLE');
//     const [error, setError] = useState(null);

//     // Handle account generation
//     const handleGenerateAccount = async () => {
//       setStatus('PENDING');
//       try {
//           const response = await api.post('/onboarding/generate/account-number');
          
//           if (response.data && response.data.result && response.data.result.acccount) {
//               setAccount(response.data.result.acccount);
//               setStatus('SUCCESS');
//           } else {
//               setError('Account data is missing');
//               setStatus('FAILED');
//           }
//       } catch (err) {
//           setError('Error generating account: ' + err.message);
//           setStatus('FAILED');
//       }
//   };
  

//     return (
      
//           <div className="mt-5">
//           {/* Conditionally render the button based on the status */}
//           {status === 'IDLE' || status === 'FAILED' ? (
//             <button
//               onClick={handleGenerateAccount}
//               disabled={status === 'PENDING'}
//               className={`${
//                 status === 'PENDING'
//                   ? 'bg-blue-400 cursor-not-allowed'
//                   : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:translate-y-1 cursor-pointer'
//               } px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300`}
//             >
//               Show Account Number
//             </button>
//           ) : null}
        
//           {status === 'PENDING' && <p>Generating account...</p>}
//           {status === 'SUCCESS' && account && (
//             <div className="mt-4">
//               <p>Account Number: {account.account_number}</p>
//             </div>
//           )}
//           {status === 'FAILED' && <div><p>Error: {error}</p></div>}
//           {status === 'IDLE' && <p>***********</p>}
//         </div>
        
   
//     );
// };

// export default Settings;


