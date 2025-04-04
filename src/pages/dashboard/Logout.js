import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // Import your API handler
import Spinner from '../../component/Spinner'; // Import a spinner component to show loading state

const Logout = () => {
    const [status, setStatus] = useState('IDLE'); // Track status (IDLE, PENDING, SUCCESS, FAILED)
    const [error, setError] = useState(null); // Store error messages
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    // Handle logout on component mount
    useEffect(() => {
        const handleLogout = async () => {
            setStatus('PENDING'); // Set status to pending when the request starts
            try {
                const response = await api.get('/auth/logout'); // Logout request

                console.log('API Response:', response); // Log the response to verify the structure

                // Checking if the logout request is successful
                if (response.data.success) {
                    setStatus('SUCCESS'); // Set status to success if logout is successful
                    setTimeout(() => {
                        // Redirect to login page after 2 seconds to show success message
                        navigate('/login');
                    }, 2000);
                } else {
                    // Use the backend error message if it exists
                    const backendError = response.data.message || 'Logout failed. Please try again.';
                    setError(backendError);
                    setStatus('FAILED');
                }
            } catch (err) {
                console.error('Error logging out:', err); // Log the error
                // If the error is from the backend, show that message, else show a generic message
                const backendError = err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : err.message;
                setError('Error logging out: ' + backendError); // Handle any errors from the API request
                setStatus('FAILED');
            }
        };

        handleLogout();
    }, [navigate]); // Empty dependency array to run the logout only once when the component mounts

    return (
        <div className="p-6 bg-white border rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Logging Out...</h2>

            {status === 'PENDING' && <Spinner />} {/* Show spinner while logging out */}
            {status === 'FAILED' && <p className="text-red-500">{error}</p>} {/* Show error message if logout fails */}
            {status === 'SUCCESS' && (
                <p className="text-green-500">You have been successfully logged out. Redirecting...</p>
            )}
        </div>
    );
};

export default Logout;
