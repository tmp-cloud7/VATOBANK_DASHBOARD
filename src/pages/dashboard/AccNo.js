import { useState } from 'react';
import api from '../../api/api';
import SectionContainer from '../../component/SectionContainer';

const AccNo = () => {
    const [account, setAccount] = useState(null);
    const [status, setStatus] = useState('IDLE');
    const [error, setError] = useState(null);

    const handleGenerateAccount = async () => {
        setStatus('PENDING');
        try {
            const response = await api.post('/onboarding/generate/account-number');
            
            if (response.data && response.data.result && response.data.result.acccount) {
                setAccount(response.data.result.acccount);
                setStatus('SUCCESS');
            } else {
                
                const backendError = response.data.message || 'Account data is missing';
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
        <div className="mt-5">
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


