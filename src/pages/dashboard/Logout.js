import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Spinner from '../../component/Spinner'; 

const Logout = () => {
    const [status, setStatus] = useState('IDLE'); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const handleLogout = async () => {
            setStatus('PENDING'); 
            try {
                const response = await api.get('/auth/logout');

                console.log('API Response:', response); 

                // Checking if the logout request is successful
                if (response.data.success) {
                    setStatus('SUCCESS'); 
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else {
                    const backendError = response.data.message || 'Logout failed. Please try again.';
                    setError(backendError);
                    setStatus('FAILED');
                }
            } catch (err) {
                console.error('Error logging out:', err);
                const backendError = err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : err.message;
                setError('Error logging out: ' + backendError);
                setStatus('FAILED');
            }
        };

        handleLogout();
    }, [navigate]); 

    return (
        <div className="p-6 bg-white border rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Logging Out...</h2>

            {status === 'PENDING' && <Spinner />} 
            {status === 'FAILED' && <p className="text-red-500">{error}</p>}
            {status === 'SUCCESS' && (
                <p className="text-green-500">You have been successfully logged out. Redirecting...</p>
            )}
        </div>
    );
};

export default Logout;
