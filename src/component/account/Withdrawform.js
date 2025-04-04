import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Spinner from '../Spinner';
import { TbCurrencyNaira } from "react-icons/tb";
import api from '../../api/api'; // Import your API handler (make sure to set up the API handler accordingly)

const WithdrawForm = ({ setActiveForm }) => {
    const [transactionInfo, setTransactionInfo] = useState({
        amount: '',
        description: '',
        enteredPin: '',
    });
    const [status, setStatus] = useState('IDLE'); // IDLE, PENDING, SUCCESS, FAILED
    const [error, setError] = useState(null); // Error message

    // Close the withdraw form
    const closeWithdrawForm = () => {
        setActiveForm(null);
    };

    // Handle form submission (withdraw request)
    const handleWithdraw = async (e) => {
        e.preventDefault();
        setStatus('PENDING'); // Set status to pending when the request starts

        // Call the API to make the withdraw request
        try {
            const response = await api.post('/account/withdraw', {
                amount: transactionInfo.amount,
                description: transactionInfo.description,
                pin: transactionInfo.enteredPin,
            });

            if (response.data.success) {
                setStatus('SUCCESS'); // Set status to success
            } else {
                // Handle backend validation errors
                const errorMessage = response.data.exception?.message || 'Withdraw failed. Please check your details and try again.';
                setError(errorMessage); // Set error from backend response
                setStatus('FAILED');
            }
        } catch (err) {
            // Handle errors in case of API failure (network errors, etc.)
            const errorMessage = err?.response?.data?.exception?.message || 'Error processing withdawal. Please try again later.';
            setError(errorMessage); // Set error message from API response
            setStatus('FAILED');
        }
    };

    return (
        <section className="flex flex-col p-2 gap-8 sm:w-3/5 xl:w-2/5 sm:p-6 h-3/5 bg-white border rounded-xl absolute right-5 left-5 sm:left-auto sm:h-[550px] mt-12">
            <form className="p-2 w-full flex flex-col justify-between h-full relative" onSubmit={handleWithdraw}>
                {status === 'PENDING' && <Spinner />} {/* Show spinner when the status is pending */}
                <button className="absolute top-1 right-2" type="button" onClick={closeWithdrawForm}><FaTimes /></button>

                <div className="flex flex-col gap-4">
                    <label>Withdraw Funds</label>
                </div>

                <div className="flex flex-col gap-2">
                        <label htmlFor="amount">Amount</label>
                        <div className="flex items-center border-grey-200 border-2 rounded-md">
                            <TbCurrencyNaira className="mr-2" /> {/* Add a margin-right to separate the symbol from the input */}
                            <input
                            type="number"
                            id="amount"
                            placeholder="Enter Amount"
                            className="flex-1 p-2 lg:p-3"
                            value={transactionInfo.amount}
                            onChange={(e) => setTransactionInfo({ ...transactionInfo, amount: e.target.value })}
                            required
                            />
                        </div>
                    </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Enter description"
                        className="flex-1 p-2 lg:p-3 border-grey-200 border-2 rounded-md"
                        value={transactionInfo.description}
                        onChange={(e) => setTransactionInfo({ ...transactionInfo, description: e.target.value })}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="enteredPin">Enter Pin</label>
                    <input
                        type="password"  // Make the pin field hidden
                        id="enteredPin"
                        placeholder="Enter your 4-digit pin"
                        className="flex-1 p-2 lg:p-3 border-grey-200 border-2 rounded-md"
                        value={transactionInfo.enteredPin}
                        onChange={(e) => setTransactionInfo({ ...transactionInfo, enteredPin: e.target.value })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'PENDING' || !transactionInfo.amount || !transactionInfo.description || !transactionInfo.enteredPin}
                    className="bg-blue-500 p-2 rounded-xl text-white font-bold mt-2 hover:bg-opacity-90 transition-all"
                >
                    Withdraw
                </button>

                {status === 'FAILED' && error && <p className="text-red-500 mt-2">{error}</p>} {/* Show error if the request fails */}
                {status === 'SUCCESS' && <p className="text-green-500 mt-2">Withdrawal successful!</p>} {/* Show success message */}
            </form>
        </section>
    );
};

export default WithdrawForm;

// import React, { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';
// import Spinner from '../Spinner';
// import api from '../../api/api'; // Import your API handler (make sure to set up the API handler accordingly)

// const WithdrawForm = ({ setShowWithdrawForm }) => {
//     const [transactionInfo, setTransactionInfo] = useState({
//         amount: '',
//         description: '',
//         enteredPin: '',
//     });
//     const [status, setStatus] = useState('IDLE'); // IDLE, PENDING, SUCCESS, FAILED
//     const [error, setError] = useState(null); // Error message

//     // Close the withdraw form
//     const closeWithdrawForm = () => {
//         setShowWithdrawForm(false);
//         setStatus('IDLE');
//         setError(null);
//     };

//     // Handle form submission (withdraw request)
//     const handleWithdraw = async (e) => {
//         e.preventDefault();
//         setStatus('PENDING'); // Set status to pending when the request starts

//         // Call the API to make the withdraw request
//         try {
//             const response = await api.post('/account/withdraw', {
//                 amount: transactionInfo.amount,
//                 description: transactionInfo.description,
//                 pin: transactionInfo.enteredPin,
//             });

//             if (response.data.success) {
//                 setStatus('SUCCESS'); // Set status to success
//             } else {
//                 setError('Withdrawal failed. Please check your details and try again.');
//                 setStatus('FAILED');
//             }
//         } catch (err) {
//             setError('Error processing withdrawal: ' + err.message);
//             setStatus('FAILED');
//         }
//     };

//     return (
//         <section className="flex flex-col p-2 gap-8 sm:w-3/5 xl:w-2/5 sm:p-6 h-3/5 bg-white border rounded-xl absolute right-5 left-5 sm:left-auto sm:h-[550px] mt-12">
//             <form className="p-2 w-full flex flex-col justify-between h-full relative" onSubmit={handleWithdraw}>
//                 {status === 'PENDING' && <Spinner />} {/* Show spinner when the status is pending */}
//                 <button className="absolute top-1 right-2" type="button" onClick={closeWithdrawForm}><FaTimes /></button>

//                 <div className="flex flex-col gap-4">
//                     <label>Withdraw Funds</label>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                     <label htmlFor="amount">Amount</label>
//                     <input
//                         type="number"
//                         id="amount"
//                         placeholder="Enter Amount"
//                         className="flex-1 p-2 lg:p-3 border-grey-200 border-2 rounded-md"
//                         value={transactionInfo.amount}
//                         onChange={(e) => setTransactionInfo({ ...transactionInfo, amount: e.target.value })}
//                         required
//                     />
//                 </div>

//                 <div className="flex flex-col gap-2">
//                     <label htmlFor="description">Description</label>
//                     <input
//                         type="text"
//                         id="description"
//                         placeholder="Enter description"
//                         className="flex-1 p-2 lg:p-3 border-grey-200 border-2 rounded-md"
//                         value={transactionInfo.description}
//                         onChange={(e) => setTransactionInfo({ ...transactionInfo, description: e.target.value })}
//                         required
//                     />
//                 </div>

//                 <div className="flex flex-col gap-2">
//                     <label htmlFor="enteredPin">Enter Pin</label>
//                     <input
//                         type="password"  // Make the pin field hidden
//                         id="enteredPin"
//                         placeholder="Enter your 4-digit pin"
//                         className="flex-1 p-2 lg:p-3 border-grey-200 border-2 rounded-md"
//                         value={transactionInfo.enteredPin}
//                         onChange={(e) => setTransactionInfo({ ...transactionInfo, enteredPin: e.target.value })}
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={status === 'PENDING' || !transactionInfo.amount || !transactionInfo.description || !transactionInfo.enteredPin}
//                     className="bg-blue-500 p-2 rounded-xl text-white font-bold mt-2 hover:bg-opacity-90 transition-all"
//                 >
//                     Withdraw
//                 </button>

//                 {status === 'FAILED' && error && <p className="text-red-500 mt-2">{error}</p>} {/* Show error if the request fails */}
//                 {status === 'SUCCESS' && <p className="text-green-500 mt-2">Withdrawal successful!</p>} {/* Show success message */}
//             </form>
//         </section>
//     );
// };

// export default WithdrawForm;
