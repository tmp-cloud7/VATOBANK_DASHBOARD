import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Spinner from '../Spinner';
import { TbCurrencyNaira } from "react-icons/tb";
import api from '../../api/api'; 
const DepositForm = ({   setActiveForm }) => {
    const [transactionInfo, setTransactionInfo] = useState({
        account_number: '',
        amount: '',
        description: '',
    });
    const [status, setStatus] = useState('IDLE'); 
    const [error, setError] = useState(null); 

    // Close the deposit form
    const closeDepositForm = () => {
        setActiveForm(null);
    };

    // Handle form submission (deposit request)
    const handleDeposit = async (e) => {
        e.preventDefault();
        setStatus('PENDING'); 

        try {
            const response = await api.post('/account/deposit', {
                account_number: transactionInfo.account_number,
                amount: transactionInfo.amount,
                description: transactionInfo.description,
            });

            if (response.data.success) {
                setStatus('SUCCESS');
            } else {
                const errorMessage = response.data.exception?.message || 'Deposit failed. Please check your details and try again.';
                setError(errorMessage); 
                setStatus('FAILED');
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.exception?.message || 'Error processing deposit. Please try again later.';
            setError(errorMessage);
            setStatus('FAILED');
        }
    };

    return (
        <section className="flex flex-col p-2 gap-8 sm:w-3/5 xl:w-2/5 sm:p-6 h-3/5 bg-white border rounded-xl absolute right-5 left-5 sm:left-auto sm:h-[550px] mt-12">
            <form className="p-2 w-full flex flex-col justify-between h-full relative" onSubmit={handleDeposit}>
                {status === 'PENDING' && <Spinner />}
                <button className="absolute top-1 right-2" type="button" onClick={closeDepositForm}><FaTimes /></button>

                <div className="flex flex-col gap-4">
                    <label>Deposit Funds</label>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="account_number">Account Number</label>
                    <input
                        type="text"
                        id="account_number"
                        placeholder="Enter your account number"
                        className="flex-1 p-2 lg:p-3 border-grey-200 border-2 rounded-md"
                        value={transactionInfo.account_number}
                        onChange={(e) => setTransactionInfo({ ...transactionInfo, account_number: e.target.value })}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="amount">Amount</label>
                    <div className="flex items-center border-grey-200 border-2 rounded-md">
                        <TbCurrencyNaira className="mr-2" />
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
                    <textarea
                        id="description"
                        placeholder="Enter transaction description"
                        className="flex-1 p-2 lg:p-3 border-grey-200 border-2 rounded-md"
                        value={transactionInfo.description}
                        onChange={(e) => setTransactionInfo({ ...transactionInfo, description: e.target.value })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'PENDING' || !transactionInfo.account_number || !transactionInfo.amount || !transactionInfo.description}
                    className="bg-blue-500 p-2 rounded-xl text-white font-bold mt-2 hover:bg-opacity-90 transition-all"
                >
                    Deposit
                </button>

                {status === 'FAILED' && error && <p className="text-red-500 mt-2">{error}</p>} 
                {status === 'SUCCESS' && <p className="text-green-500 mt-2">Deposit successful!</p>} 
            </form>
        </section>
    );
};

export default DepositForm;
