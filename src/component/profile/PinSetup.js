import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPin, verifyPin, resetPinStatus, fetchPinStatus, fetchPinError } from '../../features/onboard/pinSlice';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const PinSetup = ({ setActiveForm }) => {
  const [pin, setPinInput] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Getting the status and error of pin operation (set or verify)
  const pinStatus = useSelector(fetchPinStatus);
  const pinError = useSelector(fetchPinError); // To display error if any

  // Reset pin status when the component is mounted
  useEffect(() => {
    dispatch(resetPinStatus());
  }, [dispatch]);

  const closePinForm = () => {
    setActiveForm(null);
  };

  // Handle setting the pin
  const handleSetPin = (e) => {
    e.preventDefault();
    if (pin !== pinConfirm) {
      alert("Pins don't match! Please try again.");
      return;
    }

    // Dispatching setPin async action
    dispatch(setPin({ pin }));
  };

  // Handle verifying the pin
  const handleVerifyPin = (e) => {
    e.preventDefault();

    if (!pin) {
      alert("Please enter your pin to verify.");
      return;
    }

    // Dispatching verifyPin async action
    dispatch(verifyPin({ pin }));
  };

  // Render status messages based on pin operation status
  const renderStatus = () => {
    switch (pinStatus) {
      case 'PENDING':
        return <p className="text-blue-500">Processing...</p>;
      case 'SUCCESS':
        return <p className="text-green-500">Success!</p>;
      case 'FAILED':
        // Assuming pinError is an object with properties like `message` or `error_code`
        if (pinError) {
          return (
            <div className="text-red-500">
              <p>{pinError.message || 'Error occurred. Please try again.'}</p>
              {pinError.error_code && <p>Error Code: {pinError.error_code}</p>}
            </div>
          );
        }
        return <p className="text-red-500">Error occurred. Please try again.</p>;
      default:
        return null;
    }
  };

  // Redirect on successful pin set or verify
  useEffect(() => {
    if (pinStatus === 'SUCCESS') {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [pinStatus, navigate]);

  return (
    <section className="flex items-center justify-center min-h-screen p-4 gap-6 bg-white border rounded-xl mt-12 sm:max-w-lg md:max-w-xl w-full mx-auto">
      <div className="relative w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        {/* Close button with absolute positioning */}
        <button className="absolute top-2 right-2 text-gray-600" type="button" onClick={closePinForm}>
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          {isVerifying ? 'Verify Your Pin' : 'Enter your 4 digit pin'}
        </h2>

        <form onSubmit={isVerifying ? handleVerifyPin : handleSetPin} className="space-y-4">
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Enter Pin</label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {!isVerifying && (
            <div>
              <label htmlFor="pinConfirm" className="block text-sm font-medium text-gray-700">Confirm Pin</label>
              <input
                id="pinConfirm"
                type="password"
                value={pinConfirm}
                onChange={(e) => setPinConfirm(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
              disabled={pinStatus === 'PENDING'}
            >
              {isVerifying ? 'Verify Pin' : 'Set Pin'}
            </button>
          </div>
        </form>

        {renderStatus()}
      </div>
    </section>
  );
};

export default PinSetup;
