// import { useState, useEffect } from 'react';
// import { FaTimes } from 'react-icons/fa';
// import api from '../../api/api';

// const EditProfile = ({ setActiveForm, currentProfileImage, userData, onProfileUpdate }) => {
//   // Initialize form with current user data
//   const [formData, setFormData] = useState({
//     name: userData?.name || '',
//     lastname: userData?.lastname || '',
//     middlename: userData?.middlename || '',
//     address: userData?.address || '',
//     sog: userData?.sog || '',
//     dob: userData?.dob ? userData.dob.split('T')[0] : '', // Format date if needed
//     gender: userData?.gender || ''
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageError, setImageError] = useState('');
//   const [status, setStatus] = useState('IDLE');
//   const [error, setError] = useState(null);

//   // Update form data when userData changes
//   useEffect(() => {
//     if (userData) {
//       setFormData({
//         name: userData.name || '',
//         lastname: userData.lastname || '',
//         middlename: userData.middlename || '',
//         address: userData.address || '',
//         sog: userData.sog || '',
//         dob: userData.dob ? userData.dob.split('T')[0] : '',
//         gender: userData.gender || ''
//       });
//     }
//   }, [userData]);

//   const closeEditForm = () => {
//     setActiveForm(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
    
//     if (!file) {
//       setPreviewImage(null);
//       setSelectedImage(null);
//       return;
//     }

//     // Validate file type
//     const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (!validTypes.includes(file.type)) {
//       setImageError('Only JPEG, PNG or JPG images allowed');
//       return;
//     }

//     // Validate file size (2MB)
//     if (file.size > 2 * 1024 * 1024) {
//       setImageError('Image must be less than 2MB');
//       return;
//     }

//     setImageError('');
//     setSelectedImage(file);

//     // Create preview
//     const reader = new FileReader();
//     reader.onload = () => setPreviewImage(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setStatus('PENDING');
//     setError(null);

//     // Validate required fields
//     if (!formData.name.trim() || !formData.lastname.trim()) {
//       setError("First name and last name are required");
//       setStatus("FAILED");
//       return;
//     }

//     try {
//       const formDataObj = new FormData();

//       // Append all form data
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== '') {
//           formDataObj.append(key, value);
//         }
//       });

//       // Append the image if selected
//       if (selectedImage) {
//         formDataObj.append('profile_image', selectedImage);
//       }

//       const response = await api.put('/auth/editUser', formDataObj, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.data?.success) {
//         setStatus('SUCCESS');
        
//         // Call the callback function to update parent component
//         if (onProfileUpdate) {
//           onProfileUpdate(response.data.user);
//         }
        
//         // Close form after 2 seconds
//         setTimeout(() => {
//           setActiveForm(null);
//         }, 2000);
//       } else {
//         throw new Error(response.data?.message || 'Profile update failed');
//       }
//     } catch (err) {
//       console.error('Profile update error:', err);
//       const errorMessage = err.response?.data?.message || 
//                          err.response?.data?.error || 
//                          err.message || 
//                          'Failed to update profile';
//       setError(errorMessage);
//       setStatus('FAILED');
//     }
//   };

//   return (
//     <section className="flex items-center justify-center min-h-screen p-4 bg-white border rounded-xl mt-12 sm:max-w-lg md:max-w-xl w-full mx-auto">
//       <div className="w-full max-w-2xl p-6 relative">
//         <button 
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" 
//           type="button" 
//           onClick={closeEditForm}
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>

//         <form onSubmit={handleUpdateProfile} className="space-y-4">
//           {/* Profile Image Upload */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="relative group mb-3">
//               {previewImage ? (
//                 <img 
//                   src={previewImage}
//                   alt="Profile Preview"
//                   className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
//                 />
//               ) : (
//                 <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500 shadow-md">
//                   {currentProfileImage ? (
//                     <img 
//                       src={`${process.env.REACT_APP_VATOBANK_SERVER_API_URL || 'http://localhost:8000'}/storage/${currentProfileImage}`}
//                       alt="Current Profile"
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-gray-500">No Image</span>
//                   )}
//                 </div>
//               )}
//               <label 
//                 htmlFor="profile_image"
//                 className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
//               >
//                 <span className="text-white text-sm bg-blue-500 px-3 py-1 rounded-full">
//                   Change
//                 </span>
//               </label>
//             </div>
            
//             <input
//               type="file"
//               id="profile_image"
//               name="profile_image"
//               accept="image/jpeg, image/png, image/jpg"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//             <p className="text-xs text-gray-500 mt-1">JPEG, PNG or JPG (Max 2MB)</p>
//             {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
//           </div>

//           {/* Personal Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 First Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
//                 Last Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="lastname"
//                 name="lastname"
//                 value={formData.lastname}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="middlename" className="block text-sm font-medium text-gray-700 mb-1">
//                 Middle Name
//               </label>
//               <input
//                 type="text"
//                 id="middlename"
//                 name="middlename"
//                 value={formData.middlename}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
//                 Gender
//               </label>
//               <select
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 id="dob"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="sog" className="block text-sm font-medium text-gray-700 mb-1">
//                 State of Origin
//               </label>
//               <input
//                 type="text"
//                 id="sog"
//                 name="sog"
//                 value={formData.sog}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//               Address
//             </label>
//             <textarea
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-center pt-4">
//             <button
//               type="submit"
//               disabled={status === 'PENDING'}
//               className={`px-6 py-2 rounded-md text-white font-medium ${
//                 status === 'PENDING'
//                   ? 'bg-blue-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700'
//               } transition-colors`}
//             >
//               {status === 'PENDING' ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </form>

//         {status === 'SUCCESS' && (
//           <p className="mt-4 text-center text-green-600">Profile updated successfully!</p>
//         )}
//         {status === 'FAILED' && error && (
//           <p className="mt-4 text-center text-red-600">{error}</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default EditProfile;
// import React, { useState, useEffect } from 'react';
// import api from '../../api/api'; // API handler

// const EditProfile = ({ setActiveForm, currentProfileImage }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         lastname: '',
//         middlename: '',
//         gender: '',
//         // email: '',
//         // phone_number: '',
//         address: '',
//         dob: '',
//         sog: ''
//     });
//     const [status, setStatus] = useState('IDLE');
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState('');

//     // Load the current user data into the form when the component mounts
//     useEffect(() => {
//         // Assuming 'user' data is passed as a prop or loaded globally
//         // Initialize form data with the current user data
//         setFormData({
//             name: '', // Use the current values here (user.name, etc.)
//             lastname: '', // user.lastname
//             middlename: '', // user.middlename
//             gender: '', // user.gender
//             // email: '', // user.email
//             // phone_number: '', // user.phone_number
//             address: '', // user.address
//             dob: '', // user.dob
//             sog: '' // user.sog
//         });
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setStatus('PENDING');
//         try {
//             const response = await api.put('/auth/editUser', formData);
//             if (response.data.result.user) {
//                 setSuccessMessage('Profile updated successfully!');
//                 setStatus('SUCCESS');
//             } else {
//                 setError('Failed to update profile.');
//                 setStatus('FAILED');
//             }
//         } catch (err) {
//             setError('Error updating profile.');
//             setStatus('FAILED');
//         }
//     };

//     return (
//         <div className="p-6 bg-white border rounded-xl shadow-lg mt-8">
//             <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Profile</h2>

//             {status === 'PENDING' && <p className="text-center text-gray-500">Updating...</p>}

//             {status === 'FAILED' && (
//                 <div className="bg-red-200 text-red-800 p-3 mb-6 rounded">
//                     <p>{error}</p>
//                 </div>
//             )}

//             {status === 'SUCCESS' && successMessage && (
//                 <div className="bg-green-200 text-green-800 p-3 mb-6 rounded">
//                     <p>{successMessage}</p>
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Profile Image */}
//                 <div className="flex justify-center">
//                     {currentProfileImage ? (
//                         <img
//                             src={`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/storage/${currentProfileImage}`}
//                             alt="Profile"
//                             className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
//                         />
//                     ) : (
//                         <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500 shadow-md">
//                             <span className="text-gray-500 text-lg">No Image</span>
//                         </div>
//                     )}
//                 </div>

//                 {/* Form Fields */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                         <label className="font-semibold text-lg text-gray-700" htmlFor="name">First Name</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//                         />
//                     </div>

//                     <div>
//                         <label className="font-semibold text-lg text-gray-700" htmlFor="lastname">Last Name</label>
//                         <input
//                             type="text"
//                             id="lastname"
//                             name="lastname"
//                             value={formData.lastname}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//                         />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                         <label className="font-semibold text-lg text-gray-700" htmlFor="middlename">Middle Name</label>
//                         <input
//                             type="text"
//                             id="middlename"
//                             name="middlename"
//                             value={formData.middlename}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//                         />
//                     </div>

//                     <div>
//                       <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
//                         Gender
//                       </label>
//                       <select
//                         id="gender"
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>
//                 </div>

//                 {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                         <label className="font-semibold text-lg text-gray-700" htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//                         />
//                     </div>

//                     <div>
//                         <label className="font-semibold text-lg text-gray-700" htmlFor="phone_number">Phone</label>
//                         <input
//                             type="text"
//                             id="phone_number"
//                             name="phone_number"
//                             value={formData.phone_number}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//                         />
//                     </div>
//                 </div> */}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                         <label className="font-semibold text-lg text-gray-700" htmlFor="address">Address</label>
//                         <input
//                             type="text"
//                             id="address"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//                         />
//                     </div>

//                     <div>
//                         <label className="font-semibold text-lg text-gray-700" htmlFor="dob">Date of Birth</label>
//                         <input
//                             type="date"
//                             id="dob"
//                             name="dob"
//                             value={formData.dob}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//                         />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                         <label className="font-semibold text-lg text-gray-700" htmlFor="sog">State of Origin</label>
//                         <input
//                             type="text"
//                             id="sog"
//                             name="sog"
//                             value={formData.sog}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg mt-2"
//                         />
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-center mt-6">
//                     <button
//                         type="submit"
//                         className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full sm:w-48 text-center transition-colors"
//                     >
//                         Save Changes
//                     </button>
//                 </div>
//             </form>

//             {/* Cancel Button */}
//             <div className="flex justify-center mt-4">
//                 <button
//                     onClick={() => setActiveForm(null)}
//                     className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-white font-semibold w-full sm:w-48 text-center transition-colors"
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default EditProfile;

// import { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';
// import api from '../../api/api';

// const EditProfile = ({ setActiveForm, currentProfileImage }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     lastname: '',
//     middlename: '',
//     address: '',
//     sog: '',
//     dob: '',
//     gender: ''
//     // profile_image: ''
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageError, setImageError] = useState('');
//   const [status, setStatus] = useState('IDLE');
//   const [error, setError] = useState(null);

//   const closeEditForm = () => {
//     setActiveForm(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
    
//     if (!file) {
//       setPreviewImage(null);
//       setSelectedImage(null);
//       return;
//     }

//     // Validate file type
//     const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (!validTypes.includes(file.type)) {
//       setImageError('Only JPEG, PNG or JPG images allowed');
//       return;
//     }

//     // Validate file size (2MB)
//     if (file.size > 2 * 1024 * 1024) {
//       setImageError('Image must be less than 2MB');
//       return;
//     }

//     setImageError('');
//     setSelectedImage(file);

//     // Create preview
//     const reader = new FileReader();
//     reader.onload = () => setPreviewImage(reader.result);
//     reader.readAsDataURL(file);
//   };

//   // const handleUpdateProfile = async (e) => {
//   //   e.preventDefault();
//   //   setStatus('PENDING');
    
//   //   try {
//   //     const formDataObj = new FormData();
      
//   //     // Append all form data
//   //     Object.entries(formData).forEach(([key, value]) => {
//   //       if (value !== undefined && value !== null) {
//   //         formDataObj.append(key, value);
//   //       }
//   //     });

//   //     // Append the image if selected
//   //     if (selectedImage) {
//   //       formDataObj.append('profile_image', selectedImage);
//   //     }

//   //     const response = await api.put('/auth/editUser', formDataObj, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data'
//   //       }
//   //     });

//   //     if (response.data?.success) {
//   //       setStatus('SUCCESS');
//   //       setTimeout(() => setActiveForm(null), 2000);
//   //     } else {
//   //       throw new Error(response.data?.message || 'Profile update failed');
//   //     }
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || err.message);
//   //     setStatus('FAILED');
//   //   }
//   // };
//  const handleUpdateProfile = async (e) => {
//   e.preventDefault();
//   setStatus('PENDING');

//   // Check if required fields are filled
//   if (!formData.name || !formData.lastname) {
//     setError("First name and last name are required");
//     setStatus("FAILED");
//     return;
//   }

//   try {
//     const formDataObj = new FormData();

//     // Append all form data
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== undefined && value !== null) {
//         formDataObj.append(key, value);
//       }
//     });

//     // Append the image if selected
//     if (selectedImage) {
//       formDataObj.append('profile_image', selectedImage);
//     }

//     // Log the form data to inspect it
//     console.log('FormData to be sent:', formDataObj);

//     const response = await api.put('/auth/editUser', formDataObj, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });

//     console.log('API response:', response); // Log response to inspect the result

//     if (response.data?.success) {
//       // Set the new user data in the state
//       const updatedUserData = response.data.result.user;

//       setFormData({
//         name: updatedUserData.name,
//         lastname: updatedUserData.lastname,
//         middlename: updatedUserData.middlename,
//         address: updatedUserData.address,
//         sog: updatedUserData.sog,
//         dob: updatedUserData.dob,
//         gender: updatedUserData.gender,
//       });

//       setPreviewImage(null);  // Clear preview image
//       setSelectedImage(null);  // Clear selected image
//       setImageError('');  // Reset any image error

//       setStatus('SUCCESS');
//       setTimeout(() => {
//         setActiveForm(null); // Close form after success
//       }, 2000);
//     } else {
//       throw new Error(response.data?.message || 'Profile update failed');
//     }
//   } catch (err) {
//     console.log('Error:', err);
//     setError(err.response?.data?.message || err.message);
//     setStatus('FAILED');
//   }
// };

  
  
//   return (
//     <section className="flex items-center justify-center min-h-screen p-4 bg-white border rounded-xl mt-12 sm:max-w-lg md:max-w-xl w-full mx-auto">
//       <div className="w-full max-w-2xl p-6 relative">
//         <button 
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" 
//           type="button" 
//           onClick={closeEditForm}
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>

//         <form onSubmit={handleUpdateProfile} className="space-y-4">
//           {/* Profile Image Upload */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="relative group mb-3">
//               {previewImage ? (
//                 <img 
//                   src={previewImage}
//                   alt="Profile Preview"
//                   className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
//                 />
//               ) : (
//                 <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500 shadow-md">
//                   {currentProfileImage ? (
//                     <img 
//                       src={`${process.env.REACT_APP_VATOBANK_SERVER_API_URL || 'http://localhost:8000'}/storage/${currentProfileImage}`}
//                       alt="Current Profile"
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-gray-500">No Image</span>
//                   )}
//                 </div>
//               )}
//               <label 
//                 htmlFor="profile_image"
//                 className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
//               >
//                 <span className="text-white text-sm bg-blue-500 px-3 py-1 rounded-full">
//                   Change
//                 </span>
//               </label>
//             </div>
            
//             <input
//               type="file"
//               id="profile_image"
//               name="profile_image"
//               accept="image/jpeg, image/png, image/jpg"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//             <p className="text-xs text-gray-500 mt-1">JPEG, PNG or JPG (Max 2MB)</p>
//             {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
//           </div>

//           {/* Personal Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 First Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
//                 Last Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="lastname"
//                 name="lastname"
//                 value={formData.lastname}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="middlename" className="block text-sm font-medium text-gray-700 mb-1">
//                 Middle Name
//               </label>
//               <input
//                 type="text"
//                 id="middlename"
//                 name="middlename"
//                 value={formData.middlename}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
//                 Gender
//               </label>
//               <select
//                 id="gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 id="dob"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="sog" className="block text-sm font-medium text-gray-700 mb-1">
//                 State of Origin
//               </label>
//               <input
//                 type="text"
//                 id="sog"
//                 name="sog"
//                 value={formData.sog}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//               Address
//             </label>
//             <textarea
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-center pt-4">
//             <button
//               type="submit"
//               disabled={status === 'PENDING'}
//               className={`px-6 py-2 rounded-md text-white font-medium ${
//                 status === 'PENDING'
//                   ? 'bg-blue-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700'
//               } transition-colors`}
//             >
//               {status === 'PENDING' ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </form>

//         {status === 'SUCCESS' && (
//           <p className="mt-4 text-center text-green-600">Profile updated successfully!</p>
//         )}
//         {status === 'FAILED' && (
//           <p className="mt-4 text-center text-red-600">{error}</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default EditProfile;
// import { useState } from 'react';
// import api from '../../api/api';
// // import SectionContainer from '../SectionContainer';
// import { FaTimes } from 'react-icons/fa';

// const EditProfile = ({ setActiveForm }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     lastname: '',
//     middlename: '',
//     // email: '',
//     // password: '',
//     // phone_number: '',
//     address: '',
//     sog: '',
//     dob: '',
//     gender: '',
//     // profile_image: ''
//   });

//   const [status, setStatus] = useState('IDLE');
//   const [error, setError] = useState(null);

//   const closeEditForm = () => {
//     setActiveForm(null);
//     // setShowDepositForm(false);
//     // setStatus('IDLE');
//     // setError(null);
// };

//   // Handle form field change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   // Handle profile update
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setStatus('PENDING');
//     try {
//       const response = await api.put('/auth/editUser', formData);

//       if (response.data && response.data.success) {
//         setStatus('SUCCESS');
//       } else {
//         setError('Profile update failed');
//         setStatus('FAILED');
//       }
//     } catch (err) {
//       setError('Error updating profile: ' + err.message);
//       setStatus('FAILED');
//     }
//   };

//   return (
//     <section className="flex items-center justify-center min-h-screen p-4 gap-6 bg-white border rounded-xl mt-12 sm:max-w-lg md:max-w-xl w-full mx-auto">
//   <div className="w-full max-w-2xl p-6">
//     <button className="absolute top-2 right-2" type="button" onClick={closeEditForm}>
//       <FaTimes />
//     </button>
//     <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Edit Your Profile</h2>

//     <form onSubmit={handleUpdateProfile} className="space-y-5" encType="multipart/form-data">
//       {/* Profile Image Upload */}
//       {/* <div className="flex flex-col items-center mb-6">
//         <div className="relative group mb-4">
//           {previewImage ? (
//             <img 
//               src={previewImage}
//               alt="Profile Preview"
//               className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
//             />
//           ) : (
//             <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500 shadow-md">
//               {currentProfileImage ? (
//                 <img 
//                   src={`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/storage/${currentProfileImage}`}
//                   alt="Current Profile"
//                   className="w-full h-full rounded-full object-cover"
//                 />
//               ) : (
//                 <span className="text-gray-500 text-lg">No Image</span>
//               )}
//             </div>
//           )}
//           <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//             <label 
//               htmlFor="profile_image"
//               className="text-white text-sm bg-blue-500 px-3 py-1 rounded-full cursor-pointer"
//             >
//               Change
//             </label>
//           </div>
//         </div>
        
//         <input
//           type="file"
//           id="profile_image"
//           name="profile_image"
//           accept="image/jpeg, image/png, image/jpg"
//           onChange={handleImageChange}
//           className="hidden"
//         />
//         <p className="text-xs text-gray-500 mt-2">JPEG, PNG or JPG (Max 2MB)</p>
//         {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
//       </div> */}

//       {/* Personal Information */}
//       <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
//         <div className="flex-1">
//           <label htmlFor="name" className="block text-sm font-medium text-gray-600">First Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//             placeholder="Enter your first name"
//             required
//           />
//         </div>
//         <div className="flex-1">
//           <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">Last Name</label>
//           <input
//             type="text"
//             id="lastname"
//             name="lastname"
//             value={formData.lastname}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//             placeholder="Enter your last name"
//             required
//           />
//         </div>
//         <div className="w-full max-w-2xl p-6">
//     <button className="absolute top-2 right-2" type="button" onClick={closeEditForm}>
//       <FaTimes />
//     </button>
//     <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Edit Your Profile</h2>

    
//       <div className="flex-1">
//         <label htmlFor="middlename" className="block text-sm font-medium text-gray-600">Middle Name</label>
//         <input
//           type="text"
//           id="middlename"
//           name="middlename"
//           value={formData.middlename}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//           placeholder="Enter your middle name (Optional)"
//         />
//       </div>

//       {/* <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//           placeholder="Enter your email"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//           placeholder="Enter your password"
//           required
//         />
//       </div> */}

//       {/* <div>
//         <label htmlFor="phone_number" className="block text-sm font-medium text-gray-600">Phone Number</label>
//         <input
//           type="text"
//           id="phone_number"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//           placeholder="Enter your phone number"
//         />
//       </div> */}

//       <div>
//         <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
//         <textarea
//           id="address"
//           name="address"
//           value={formData.address}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//           placeholder="Enter your address"
//         />
//       </div>

//       <div>
//         <label htmlFor="sog" className="block text-sm font-medium text-gray-600">State Of Origin</label>
//         <input
//           type="text"
//           id="sog"
//           name="sog"
//           value={formData.sog}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//           placeholder="Enter your SOG"
//         />
//       </div>

//       <div>
//         <label htmlFor="dob" className="block text-sm font-medium text-gray-600">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           value={formData.dob}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//         />
//       </div>

//       <div>
//         <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender</label>
//         <select
//           id="gender"
//           name="gender"
//           value={formData.gender}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//         >
//           <option value="">Select gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </div>
// {/* 
//       <div className="flex justify-center mt-6">
//         <button
//           type="submit"
//           disabled={status === 'PENDING'}
//           className={`${
//             status === 'PENDING'
//               ? 'bg-blue-400 cursor-not-allowed'
//               : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:translate-y-1 cursor-pointer'
//           } px-6 py-2 text-white font-semibold rounded-lg transition-all duration-300`}
//         >
//           Save Changes
//         </button>
//       </div> */}
    

//     {/* {status === 'PENDING' && <p>Updating profile...</p>}
//     {status === 'SUCCESS' && <p className="text-green-500 mt-4">Profile updated successfully!</p>}
//     {status === 'FAILED' && <p className="text-red-500 mt-4">Error: {error}</p>} */}
//   </div>
//       </div>

//       {/* Other form fields remain the same... */}

//       <div className="flex justify-center mt-6">
//         <button
//           type="submit"
//           disabled={status === 'PENDING'}
//           className={`${
//             status === 'PENDING'
//               ? 'bg-blue-400 cursor-not-allowed'
//               : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:translate-y-1 cursor-pointer'
//           } px-6 py-2 text-white font-semibold rounded-lg transition-all duration-300`}
//         >
//           {status === 'PENDING' ? 'Saving...' : 'Save Changes'}
//         </button>
//       </div>
//     </form>
//     <div className="flex justify-center mt-4">
//                 <button
//                     onClick={() => setActiveForm(null)}
//                     className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-white font-semibold w-full sm:w-48 text-center transition-colors"
//                 >
//                      Cancel
//                  </button>
//     </div>

//     {status === 'SUCCESS' && <p className="text-green-500 mt-4 text-center">Profile updated successfully!</p>}
//     {status === 'FAILED' && <p className="text-red-500 mt-4 text-center">Error: {error}</p>}
//   </div>
// </section>
//   )}
 
/* <section className="flex items-center justify-center min-h-screen p-4 gap-6 bg-white border rounded-xl mt-12 sm:max-w-lg md:max-w-xl w-full mx-auto">
  <div className="w-full max-w-2xl p-6">
    <button className="absolute top-2 right-2" type="button" onClick={closeEditForm}>
      <FaTimes />
    </button>
    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Edit Your Profile</h2>

    <form onSubmit={handleUpdateProfile} className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
        <div className="flex-1">
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
        <div className="flex-1">
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

      <div className="flex-1">
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

      {/* <div>
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
      </div> */

      /* <div>
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
      </div> */

//       <div>
//         <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
//         <textarea
//           id="address"
//           name="address"
//           value={formData.address}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//           placeholder="Enter your address"
//         />
//       </div>

//       <div>
//         <label htmlFor="sog" className="block text-sm font-medium text-gray-600">State Of Origin</label>
//         <input
//           type="text"
//           id="sog"
//           name="sog"
//           value={formData.sog}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//           placeholder="Enter your SOG"
//         />
//       </div>

//       <div>
//         <label htmlFor="dob" className="block text-sm font-medium text-gray-600">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           value={formData.dob}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//         />
//       </div>

//       <div>
//         <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender</label>
//         <select
//           id="gender"
//           name="gender"
//           value={formData.gender}
//           onChange={handleInputChange}
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//         >
//           <option value="">Select gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           type="submit"
//           disabled={status === 'PENDING'}
//           className={`${
//             status === 'PENDING'
//               ? 'bg-blue-400 cursor-not-allowed'
//               : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:translate-y-1 cursor-pointer'
//           } px-6 py-2 text-white font-semibold rounded-lg transition-all duration-300`}
//         >
//           Save Changes
//         </button>
//       </div>
//     </form>

//     {status === 'PENDING' && <p>Updating profile...</p>}
//     {status === 'SUCCESS' && <p className="text-green-500 mt-4">Profile updated successfully!</p>}
//     {status === 'FAILED' && <p className="text-red-500 mt-4">Error: {error}</p>}
//   </div>
// </section> */}


  
//   );
// };


// export default EditProfile
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


          {/* Address and Other Details */}
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

          {/* Gender */}
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

          {/* Action Buttons */}
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

          {/* Status Message */}
          {status === 'SUCCESS' && <p className="text-green-500 mt-4 text-center">Profile updated successfully!</p>}
          {status === 'FAILED' && <p className="text-red-500 mt-4 text-center">Error: {error}</p>}
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
