import React, { useEffect, useState } from 'react';
import InputComponent from '../component/InputComponent';
import avatar from "../Assets/avatar.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStatus, registerUser, resetStatus } from '../features/user/userSlice';
import Spinner from '../component/Spinner';
import { closeSpinner, openSpinner, showSpinner } from '../features/page/pageSlice';
import { useNavigate } from 'react-router-dom';
import { Footer, NavbarLanding } from '../component';

const Register = () => {
  const dispatch = useDispatch();
  const status = useSelector(fetchUserStatus);
  const enableSpinner = useSelector(showSpinner);
  const navigate = useNavigate();

  const [file, setFile] = useState(avatar);
  const [userFile, setUserFile] = useState(null);
  const [fileErr, setFileErr] = useState("");

  const handleFileUpload = (e) => {
    const image = e.target.files[0];

    if (!image) {
      setFile(avatar);
      setUserFile(null);
      setFileErr("");
      return;
    }

    if (image) {
      const fileType = image.type.toLowerCase();
      if (fileType === "image/jpeg" || fileType === "image/jpg" || fileType === "image/png") {
        if (image.size >= 2 * 1024 * 1024) {
          setFileErr("Image size is too large");
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFile(reader.result); 
            setUserFile(image);
          };
          reader.readAsDataURL(image);
          setFileErr("");
        }
      } else {
        setFileErr("File type is not supported");
      }
    }
  };

  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email: '',
    middlename: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    sog: '',
    address: '',
    profile_image: ''
  });

  const [errors, setErrors] = useState({ status: false });

  const validateUser = (user) => {
    const errors = {};
    let hasErrors = false;

    const addError = (field, message) => {
        errors[field] = message;
        hasErrors = true;
    }

    if (!user.name) addError('firstname', 'Firstname is required');
    if (!user.lastname) addError('lastname', 'Lastname is required');
    if (user.middlename && user.middlename.length > 200) addError('middlename', 'Middlename should not exceed 200 characters');
    if (!user.email) addError('email', 'Email is required');
    else if (!isValidEmail(user.email)) addError('email', 'Invalid email format');
    if (!user.phone_number) addError('phone_number', 'Phone number is required');
    else if (!isValidPhoneNumber(user.phone_number)) addError('phone_number', 'Invalid phone number format');
    if (!user.password) addError('password', 'Password is required');
    else if (user.password.length < 8) addError('password', 'Password must be at least 8 characters long');
    if (user.password !== user.confirmPassword) addError('confirmPassword', 'Passwords do not match');
    if (!user.gender) addError('gender', 'Gender is required');
    if (!user.dob) addError('dob', 'Date of birth is required');
    if (!user.sog) addError('sog', 'State of origin is required');
    if (!user.address) addError('address', 'Residence address is required');
    
    // Only validate image if skipImageCheck is false

    return { errors, hasErrors };
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const isValidPhoneNumber = (phone_number) => {
    const regex = /(^0[789][01]\d{8}$)/;
    return regex.test(phone_number) && phone_number.length === 11;
  };

  const signUp = async (e) => {
    e.preventDefault();

    // First validate all fields except image
    const { errors, hasErrors } = validateUser(user);
    setErrors(errors);
    if (hasErrors) return;

    // Then specifically check for image
    // if (!userFile) {
    //   setErrors({...errors, profile_image: 'Profile image is required', status: true});
    //   return;
    // }

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('lastname', user.lastname);
    formData.append('middlename', user.middlename || '');
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('phone_number', user.phone_number);
    formData.append('address', user.address);
    formData.append('sog', user.sog);
    formData.append('dob', user.dob);
    formData.append('gender', user.gender);
    // formData.append('profile_image', userFile);
    if (userFile) {
      formData.append('profile_image', userFile);
    }

    dispatch(openSpinner());
    dispatch(registerUser(formData));
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const errorStyle = (fieldname) => errors[fieldname] ? 'text-red-500' : '';
  const isFormValid = !validateUser(user).hasErrors;

  useEffect(() => {
    if (status === 'SUCCESS') {
      setTimeout(() => {
        alert('Registration Successful');
        dispatch(resetStatus());
        dispatch(closeSpinner());
        navigate("/login");
      }, 3000);
    }
    if (status === 'FAILED') {
      setTimeout(() => {
        alert('Invalid Credentials');
        dispatch(resetStatus());
        dispatch(closeSpinner());
      }, 3000);
    }
  }, [dispatch, navigate, status]);

  return (
    <div>
      <NavbarLanding />
      <main className='font-roboto flex flex-col w-full min-h-screen justify-center items-center bg-gradient-to-r from-gray-300 to-white-500 pb-8 relative'>
        {enableSpinner && <Spinner />}
        <section className='flex flex-col justify-center p-2 w-full w-3/5 gap-8 items-center sm:w-3/5 xl:w-2/5 sm:p-6'>
          <form className='flex flex-col sm:min-w-500 flex-l w-full gap-3 bg-white p-5 rounded-md'>
            <h2 className='md font-bold'>Create your account</h2>
            <div className='flex flex-col items-center'>
              {fileErr && <span className="text-red-500 text-sm">{fileErr}</span>}
              <label htmlFor="profilePicture" className="mb-2">Profile Picture</label>
              <div className="relative mb-4">
                <img
                  src={file}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <input
                  type="file"
                  id="profile_image"
                  name="profile_image"
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button 
                  type="button" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => document.getElementById('profile_image').click()}
                >
                  Choose Image
                </button>
              </div>
              {errors.profile_image && (
                <span className="text-red-500 text-sm mt-1">{errors.profile_image}</span>
              )}
            </div>
            <div>
              <InputComponent inputProp={{ name: user.name, type: 'text', label: 'Provide Firstname', field: 'name', placeholder: 'Julius', onChange: handleInputChange }} />
              {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname}</span>}
              <InputComponent inputProp={{ name: user.lastname, type: 'text', label: 'Provide Lastname', field: 'lastname', placeholder: 'Anderson', onChange: handleInputChange }} />
              {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}
            </div>
            <div className='sm:flex-row gap-1 flex-1 w-2/4'>
              <InputComponent inputProp={{ name: user.middlename, type: 'text', label: 'Provide Middlename (Optional)', field: 'middlename', placeholder: 'John', onChange: handleInputChange }} />
              {errors.middlename && <span className="text-red-500 text-sm">{errors.middlename}</span>}
            </div>
            <InputComponent inputProp={{ name: user.email, type: 'email', label: 'Provide Email', field: 'email', placeholder: 'JuliAnderson@gmail.com', onChange: handleInputChange }} />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            <InputComponent inputProp={{ name: user.phone_number, type: 'number', label: 'Provide Tel', field: 'phone_number', placeholder: '09043456789', onChange: handleInputChange }} />
            {errors.phone_number && <span className="text-red-500 text-sm">{errors.phone_number}</span>}
            <InputComponent inputProp={{ name: user.dob, type: 'date', label: 'Provide Date of birth', field: 'dob', onChange: handleInputChange }} />
            {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
            <div>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                onChange={handleInputChange}
                className="flex w-full border border-blue-500 p-3 rounded-md focus:border-yellow-400 leading-none"
                placeholder="Enter your address"
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
            </div>
            <InputComponent inputProp={{ name: user.sog, type: 'text', label: 'Provide State of Origin', field: 'sog', placeholder: 'Adamawa state', onChange: handleInputChange }} />
            {errors.sog && <span className="text-red-500 text-sm">{errors.sog}</span>}
            <div className='flex flex-col gap-1 flex-1 w-full mt-2'>
              <label htmlFor='gender'>Gender<span className={errorStyle('gender')}>*</span></label>
              <select 
                value={user.gender} 
                name='gender' 
                onChange={handleInputChange} 
                id='gender' 
                className='flex w-full border border-blue-500 p-3 rounded-md focus:border-yellow-400 leading-none' 
                required
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
            </div>
            <div className='flex flex-col sm:flex-row gap-1 flex-1 w-full sm:gap-6'>
              <InputComponent inputProp={{ name: user.password, type: 'password', label: 'Password', field: 'password', placeholder: 'Enter Your Password', onChange: handleInputChange }} />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              <InputComponent inputProp={{ name: user.confirmPassword, type: 'password', label: 'Confirm Password', field: 'confirmPassword', placeholder: 'Confirm Your Password', onChange: handleInputChange }} />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>
            <button
              disabled={!isFormValid}
              onClick={signUp}
              type='button'
              className={`${isFormValid ? 'bg-blue-600 hover:bg-opacity-90' : 'bg-blue-200 hover:bg-blue-300'} p-2 rounded-xl text-white font-bold mt-2 transition-all`}>
              SIGN UP
            </button>
          </form>
          <p>Have an account? <a href='/login' className='underline text-blue-500'>Login</a></p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Register;













































