import { useState } from 'react';
import api from '../../api/api';
import { FaTimes } from 'react-icons/fa';

const EditProfile = ({ setActiveForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    middlename: '',
    email: '',
    phone_number: '',
    password: '',
    address: '',
    sog: '',
    dob: '',
    gender: '',
  });

  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);

  const closeEditForm = () => {
    setActiveForm(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setStatus('PENDING');
    try {
      const response = await api.put('/auth/editUser', formData);

      if (response.data && response.data.success) {
        setStatus('SUCCESS');
      } else {
        setError('Profile update failed');
        setStatus('FAILED');
      }
    } catch (err) {
      setError('Error updating profile: ' + err.message);
      setStatus('FAILED');
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-6 bg-white border rounded-xl mt-12 sm:max-w-lg md:max-w-xl w-full mx-auto">
      <div className="relative w-full max-w-2xl p-6">
        <button className="absolute top-2 right-2" type="button" onClick={closeEditForm}>
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">Edit Your Profile</h2>
        
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">First Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="middlename" className="block text-sm font-medium text-gray-600">Middle Name</label>
            <input
              type="text"
              id="middlename"
              name="middlename"
              value={formData.middlename}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Enter your middle name (Optional)"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            placeholder="Enter your email"
            required
            />
        </div>

        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            placeholder="Enter your password"
            required
            />
        </div> 

        <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            placeholder="Enter your phone number"
            />
      </div> 


        
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Enter your address"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sog" className="block text-sm font-medium text-gray-600">State Of Origin</label>
              <input
                type="text"
                id="sog"
                name="sog"
                value={formData.sog}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Enter your State of Origin"
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-600">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => setActiveForm(null)}
              className="px-6 py-2 text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={status === 'PENDING'}
              className={`${status === 'PENDING'
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg cursor-pointer'} 
                px-6 py-2 text-white font-semibold rounded-lg transition-all duration-300`}
            >
              {status === 'PENDING' ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {status === 'SUCCESS' && <p className="text-green-500 mt-4 text-center">Profile updated successfully!</p>}
          {status === 'FAILED' && <p className="text-red-500 mt-4 text-center">Error: {error}</p>}
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
