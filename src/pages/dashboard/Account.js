import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionContainer from '../../component/SectionContainer';
import api from '../../api/api'; 
import WithdrawForm from '../../component/account/Withdrawform';
import DepositForm from '../../component/account/Depositform';
import TransferForm from '../../component/account/Transferform';
import { TbCurrencyNaira } from "react-icons/tb";
const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [balance, setBalance] = useState(null);  // State to store balance
  const [status, setStatus] = useState('IDLE');  
  const [activeForm, setActiveForm] = useState(null);  // Track active form ('withdraw', 'deposit', 'transfer')

  // Function to format balance
  const formatBalance = (balance) => {
    if (balance !== null && balance !== undefined) {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <TbCurrencyNaira style={{ marginRight: '4px' }} /> 
          {parseFloat(balance).toFixed(2)} 
        </span>
      );
    }
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <TbCurrencyNaira style={{ marginRight: '4px' }} />
        0.00
      </span>
    );
  };
  // Handle balance extraction
  const handleGetBalance = async () => {
    setStatus('PENDING'); 
    try {
      const response = await api.post('/onboarding/generate/account-number');  

      console.log("API Response:", response.data);  

      // Check if response is successful and has the account data
      if (response.data.success && response.data.result && response.data.result.acccount) {
        const accountBalance = response.data.result.acccount.balance;  
        setBalance(accountBalance); 
        setStatus('SUCCESS'); 
      } else {
        
        console.error("Unexpected response structure:", response.data); 
        setStatus('FAILED'); 
      }
    } catch (err) {
      console.error('Error fetching balance:', err);  
      setStatus('FAILED'); 
    }
  };

  
  useEffect(() => {
    handleGetBalance();
  }, []);

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
            <p className="text-xl">Current Balance: {formatBalance(balance)}</p>
          </div>
        )}
        {status === 'FAILED' && (
          <div>
            <p className="text-red-500 font-semibold">Error: Something went wrong while fetching your balance.</p>
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




