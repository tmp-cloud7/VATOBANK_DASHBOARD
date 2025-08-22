import { useState } from 'react';
import api from '../../api/api';
import SectionContainer from '../../component/SectionContainer';
import { TbCurrencyNaira } from "react-icons/tb";
import Transaction from './Transaction';
import AccNo from './AccNo'; 

const Home = () => {
    const [balance, setBalance] = useState(null);
    const [status, setStatus] = useState('IDLE'); 
    const [error, setError] = useState(null);

    const handleGetBalance = async () => {
        setStatus('PENDING'); 
        try {
            const response = await api.post('/onboarding/generate/account-number');
    
            
            if (response.data.success && response.data.result && response.data.result.acccount) {
                let accountBalance = response.data.result.acccount.balance;
                

                accountBalance = parseFloat(accountBalance).toFixed(2);
    
                setBalance(accountBalance); 
                setStatus('SUCCESS'); 
            } else {                
                const backendError = response.data.message || 'Account data or balance is missing';
                setError(backendError); 
                setStatus('FAILED');
            }
        } catch (err) {
            const backendError = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : err.message; 
            setError(backendError); 
            setStatus('FAILED');
        }
    };
    

    return (
       
        <SectionContainer className="mt-8 bg-blue">
             < AccNo />
            <div className="content-wrapper mt-6">
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
                            <TbCurrencyNaira className="mr-1" /> 
                            <strong>{balance}</strong>
                        </p>
                    </div>
               
                )}

                {status === 'FAILED' && (
                    <div className="error-message">
                        <p className="error-text text-red-500">{error}</p>
                    </div>
                )}

                {status === 'IDLE' && <p className="status-text mt-3">**********</p>}
                <Transaction className='mt-8'/>
            </div>
        </SectionContainer>
    );
};

export default Home;
