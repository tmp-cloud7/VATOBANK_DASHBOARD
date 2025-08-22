import React, { useEffect, useState } from 'react';
import api from '../../api/api';

import Spinner from '../../component/Spinner';const Transaction = () => {
    const [transactions, setTransactions] = useState([]); 
    const [status, setStatus] = useState('IDLE'); 
    const [error, setError] = useState(null);

    // Fetch transaction history on component mount
    useEffect(() => {
        const fetchTransactionHistory = async () => {
            setStatus('PENDING');
            try {
                const response = await api.get('/transactions/history'); 
                

                // Check if response is valid and contains data
                if (response.data.success && response.data.result && response.data.result.transactions) {
                    setTransactions(response.data.result.transactions.data); 
                    setStatus('SUCCESS'); 
                } else {
                    setTransactions([]); 
                    setStatus('SUCCESS');
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError(null); 
                    setStatus('SUCCESS');
                } else {
                    setError(err.message); 
                    setStatus('FAILED');
                }
            }
        };

        fetchTransactionHistory();
    }, []); 

    // If no transactions, return null
    if (status === 'SUCCESS' && transactions.length === 0) {
        return null;
    }

    return (
        <div className="p-6 bg-white border rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

            {status === 'PENDING' && <Spinner />} 
            {status === 'FAILED' && <p className="text-red-500">{error}</p>}
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
