import React, { useEffect, useState } from 'react';
import api from '../../api/api'; // Import your API handler
import Spinner from '../../component/Spinner'; // Import a spinner component to show loading state

const Transaction = () => {
    const [transactions, setTransactions] = useState([]); // Store transaction data
    const [status, setStatus] = useState('IDLE'); // Track status (IDLE, PENDING, SUCCESS, FAILED)
    const [error, setError] = useState(null); // Store error messages

    // Fetch transaction history on component mount
    useEffect(() => {
        const fetchTransactionHistory = async () => {
            setStatus('PENDING'); // Set status to pending when the request starts
            try {
                const response = await api.get('/transactions/history'); // Fetch transactions from the API

                // console.log('API Response:', response); // Log the response to verify the structure

                // Check if response is valid and contains data
                if (response.data.success && response.data.result && response.data.result.transactions) {
                    setTransactions(response.data.result.transactions.data); // Store the transaction data
                    setStatus('SUCCESS'); // Set status to success if data is fetched successfully
                } else {
                    setTransactions([]); // Explicitly setting empty array if no transactions
                    setStatus('SUCCESS');
                }
            } catch (err) {
                // console.error('Error fetching transactions:', err); // Log the error
                // If it's a 401 error, set error to null (or a custom message)
                if (err.response && err.response.status === 401) {
                    setError(null); // Set error as null if 401 happens
                    setStatus('SUCCESS'); // Set status to success when no data is found
                } else {
                    setError(err.message); // Handle any other errors
                    setStatus('FAILED');
                }
            }
        };

        fetchTransactionHistory();
    }, []); // Empty dependency array to run the fetch only once when the component mounts

    // If no transactions, return null
    if (status === 'SUCCESS' && transactions.length === 0) {
        return null;
    }

    return (
        <div className="p-6 bg-white border rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

            {status === 'PENDING' && <Spinner />} {/* Show spinner while fetching data */}
            {status === 'FAILED' && <p className="text-red-500">{error}</p>} {/* Show error message if fetching fails */}
            {status === 'SUCCESS' && transactions.length === 0 && (
                <p>No transactions available.</p>
            )}

            {status === 'SUCCESS' && transactions.length > 0 && (
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left border-b">Date</th>
                            <th className="py-2 px-4 text-left border-b">Description</th>
                            <th className="py-2 px-4 text-left border-b">Amount</th>
                            <th className="py-2 px-4 text-left border-b">Balance</th>
                            <th className="py-2 px-4 text-left border-b">Category</th>
                            <th className="py-2 px-4 text-left border-b">Reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">
                                    {new Date(transaction.date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {transaction.description || 'N/A'}
                                </td>
                                <td className="py-2 px-4 border-b">{transaction.amount}</td>
                                <td className="py-2 px-4 border-b">{transaction.balance}</td>
                                <td className="py-2 px-4 border-b">{transaction.category}</td>
                                <td className="py-2 px-4 border-b">{transaction.reference}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Transaction;

// // import React, { useEffect, useState } from 'react';
// // import api from '../../api/api'; // Import your API handler
// // import Spinner from '../../component/Spinner'; // Import a spinner component to show loading state

// // const Transaction = () => {
// //     const [transactions, setTransactions] = useState([]); // Store transaction data
// //     const [status, setStatus] = useState('IDLE'); // Track status (IDLE, PENDING, SUCCESS, FAILED)
// //     const [error, setError] = useState(null); // Store error messages

// //     // Fetch transaction history on component mount
// //     useEffect(() => {
// //         const fetchTransactionHistory = async () => {
// //             setStatus('PENDING'); // Set status to pending when the request starts
// //             try {
// //                 const response = await api.get('/transactions/history'); // Fetch transactions from the API

// //                 console.log('API Response:', response); // Log the response to verify the structure

// //                 // Checking the correct structure of the response
// //                 if (response.data.success && response.data.result && response.data.result.transactions) {
// //                     setTransactions(response.data.result.transactions.data); // Store the transaction data
// //                     setStatus('SUCCESS'); // Set status to success if data is fetched successfully
// //                 } else {
// //                     setError('No transaction history found.');
// //                     setStatus('FAILED');
// //                 }
// //             } catch (err) {
// //                 console.error('Error fetching transactions:', err); // Log the error
// //                 setError('Error fetching transactions: ' + err.message); // Handle any errors from the API request
// //                 setStatus('FAILED');
// //             }
// //         };

// //         fetchTransactionHistory();
// //     }, []); // Empty dependency array to run the fetch only once when the component mounts

// //     return (
// //         <div className="p-4 bg-white border rounded-xl shadow-lg mt-4 w-full max-w-2xl mx-auto">
// //             <h2 className="text-xl font-semibold mb-3">Transaction History</h2>

// //             {status === 'PENDING' && <Spinner />} {/* Show spinner while fetching data */}
// //             {status === 'FAILED' && <p className="text-red-500 text-sm">{error}</p>} {/* Show error message if fetching fails */}
// //             {status === 'SUCCESS' && transactions.length === 0 && (
// //                 <p>No transactions available.</p>
// //             )}

// //             {status === 'SUCCESS' && transactions.length > 0 && (
// //                 <table className="min-w-full table-auto border-collapse text-sm">
// //                     <thead>
// //                         <tr className="bg-gray-100">
// //                             <th className="py-1 px-2 text-left border-b">ID</th>
// //                             <th className="py-1 px-2 text-left border-b">Date</th>
// //                             <th className="py-1 px-2 text-left border-b">Description</th>
// //                             <th className="py-1 px-2 text-left border-b">Amount</th>
// //                             <th className="py-1 px-2 text-left border-b">Balance</th>
// //                             <th className="py-1 px-2 text-left border-b">Category</th>
// //                             <th className="py-1 px-2 text-left border-b">Reference</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {transactions.map((transaction) => (
// //                             <tr key={transaction.id} className="hover:bg-gray-50">
// //                                 <td className="py-1 px-2 border-b">{transaction.id}</td>
// //                                 <td className="py-1 px-2 border-b">
// //                                     {new Date(transaction.date).toLocaleDateString()}
// //                                 </td>
// //                                 <td className="py-1 px-2 border-b">
// //                                     {transaction.description || 'N/A'}
// //                                 </td>
// //                                 <td className="py-1 px-2 border-b">{transaction.amount}</td>
// //                                 <td className="py-1 px-2 border-b">{transaction.balance}</td>
// //                                 <td className="py-1 px-2 border-b">{transaction.category}</td>
// //                                 <td className="py-1 px-2 border-b">{transaction.reference}</td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             )}
// //         </div>
// //     );
// // };

// // export default Transaction;

// import React, { useEffect, useState } from 'react';
// import api from '../../api/api'; // Import your API handler
// import Spinner from '../../component/Spinner'; // Import a spinner component to show loading state

// const Transaction = () => {
//     const [transactions, setTransactions] = useState([]); // Store transaction data
//     const [status, setStatus] = useState('IDLE'); // Track status (IDLE, PENDING, SUCCESS, FAILED)
//     const [error, setError] = useState(null); // Store error messages

//     // Fetch transaction history on component mount
//     useEffect(() => {
//         const fetchTransactionHistory = async () => {
//             setStatus('PENDING'); // Set status to pending when the request starts
//             try {
//                 const response = await api.get('/transactions/history'); // Fetch transactions from the API

//                 console.log('API Response:', response); // Log the response to verify the structure

//                 // Checking the correct structure of the response
//                 if (response.data.success && response.data.result && response.data.result.transactions) {
//                     setTransactions(response.data.result.transactions.data); // Store the transaction data
//                     setStatus('SUCCESS'); // Set status to success if data is fetched successfully
//                 } else {
//                     setError('No transaction history found.');
//                     setStatus('FAILED');
//                 }
//             } catch (err) {
//                 console.error('Error fetching transactions:', err); // Log the error
//                 setError(err.message); // Handle any errors from the API request
//                 setStatus('FAILED');
//             }
//         };

//         fetchTransactionHistory();
//     }, []); // Empty dependency array to run the fetch only once when the component mounts

//     return (
//         <div className="p-6 bg-white border rounded-xl shadow-lg mt-8">
//             <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

//             {status === 'PENDING' && <Spinner />} {/* Show spinner while fetching data */}
//             {status === 'FAILED' && <p className="text-red-500">{error}</p>} {/* Show error message if fetching fails */}
//             {status === 'SUCCESS' && transactions.length === 0 && (
//                 <p>No transactions available.</p>
//             )}

//             {status === 'SUCCESS' && transactions.length > 0 && (
//                 <table className="min-w-full table-auto border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             {/* <th className="py-2 px-4 text-left border-b">ID</th> */}
//                             <th className="py-2 px-4 text-left border-b">Date</th>
//                             <th className="py-2 px-4 text-left border-b">Description</th>
//                             <th className="py-2 px-4 text-left border-b">Amount</th>
//                             <th className="py-2 px-4 text-left border-b">Balance</th>
//                             <th className="py-2 px-4 text-left border-b">Category</th>
//                             {/* <th className="py-2 px-4 text-left border-b">Status</th> */}
//                             <th className="py-2 px-4 text-left border-b">Reference</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {transactions.map((transaction) => (
//                             <tr key={transaction.id} className="hover:bg-gray-50">
//                                 {/* <td className="py-2 px-4 border-b">{transaction.id}</td> */}
//                                 <td className="py-2 px-4 border-b">
//                                     {new Date(transaction.date).toLocaleDateString()}
//                                 </td>
//                                 <td className="py-2 px-4 border-b">
//                                     {transaction.description || 'N/A'}
//                                 </td>
//                                 <td className="py-2 px-4 border-b">{transaction.amount}</td>
//                                 <td className="py-2 px-4 border-b">{transaction.balance}</td>
//                                 <td className="py-2 px-4 border-b">{transaction.category}</td>
//                                 {/* <td className="py-2 px-4 border-b">{transaction.status}</td> */}
//                                 <td className="py-2 px-4 border-b">{transaction.reference}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default Transaction;

