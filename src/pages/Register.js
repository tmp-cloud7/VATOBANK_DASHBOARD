import React, { useEffect, useState } from 'react';
import { FaPiggyBank } from 'react-icons/fa';
import InputComponent from '../component/InputComponent';
import validateUser from '../helper/register/validateUser';
import avatar from "../Assets/avatar.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStatus, registerUser, resetStatus } from '../features/user/userSlice';
import Spinner from '../component/Spinner';
import { closeSpinner, openSpinner, showSpinner } from '../features/user/page/pageSlice';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const dispatch = useDispatch()
  const status = useSelector(fetchUserStatus)
  const enableSpinner = useSelector(showSpinner)
  const navigate = useNavigate()
   // Capturing the User DP Upload
  //  const [file, setFile] = useState(avatar);
  //  const [userFile, setUserFile] = useState(avatar);
  //  const [fileErr, setFileErr] = useState("");

  // //  Function to handle imageUpload
  // const handleFileUpload = (e) => {
  //   const image = e.target.files[0];

  //   // If no image is selected, set default image
  //   if (!image) {
  //     setFile(avatar); // Set default image if none is uploaded
  //     setUserFile(avatar); // Set default image if none is uploaded
  //     setFileErr(""); // Clear error message if no file is selected
  //     return;
  //   }

  //   if (image) {
  //     if (image.type === "image/jpeg" || image.type === "image/jpg" || image.type === "image/png") {
  //       if (image.size >= 3 * 1024 * 1024) {
  //         setFileErr("Image size is too large");
  //       } else {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           setFile(reader.result); // This will set the base64 string in the state
  //           setUserFile(reader.result); // Store the base64 string in userFile
  //         };
  //         reader.readAsDataURL(image); // Convert the image to base64 format
  //         setFileErr("");
  //       }
  //     } else {
  //       setFileErr("File type is not supported");
  //     }
  //   }
  // };
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email: '',
    // username: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    sog: '',
    address: '',
    // profile_image: ''
  }
)
  const [errors, setErrors] = useState({ status: false })
  
  const signUp = async (e) => {

    dispatch(openSpinner());
    dispatch(registerUser(user)); 
    // e.preventDefault();
    // const formData = new FormData();
    
    // // Append form data
    // formData.append('name', user.name);
    // formData.append('lastname', user.lastname);
    // formData.append('email', user.email);
    // formData.append('phone_number', user.phone_number);
    // formData.append('password', user.password);
    // formData.append('confirmPassword', user.confirmPassword);
    // formData.append('gender', user.gender);
    // formData.append('dob', user.dob);
    // formData.append('sog', user.sog);
    // formData.append('address', user.address);
    
    // // Append profile image if available
    // if (userFile && userFile !== avatar) {
    //     formData.append('profile_image', userFile); // send the actual file (binary data)
    // }

    // console.log('Form data before dispatch:', formData);
    // dispatch(openSpinner());
    // dispatch(registerUser(formData)); // send FormData in the request

    // e.preventDefault();  // Prevent page reload on form submit

    // // Check validation before dispatching
    // const { errors, hasErrors } = validateUser(user, userFile);

    // // If there are errors, do not proceed
    // if (hasErrors) {
    //     setErrors(errors);  // Set the errors to show them in the form
    //     return;
    // }

    // // Proceed with the form submission if no errors
    // const userData = {
    //     ...user,
    //     profile_image: userFile === avatar ? '' : userFile // Send empty string if no image is uploaded
    // };
    
    // console.log('Sending user data:', userData);  // Log to check if profile_image is being passed correctly
    
    // dispatch(openSpinner())
    // dispatch(registerUser(userData)) 
  }

  const handleInputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const errorStyle = (fieldname) => errors[fieldname] ? 'text-red-500' : '';
  const disabledStyle = validateUser(user).hasErrors ? 'bg-blue-300 hover:bg-blue-300' : 'hover:bg-opacity-90 bg-blue-500'
  useEffect(() => {
    if(status === 'SUCCESS') {
      setTimeout(() => {
        dispatch(resetStatus())
        dispatch(closeSpinner())
        navigate("/successful")
      }, 3000)
    }
    if(status === 'FAILED') {
      setTimeout(() => {
        alert('Invalid Credentials')
        dispatch(resetStatus())
        dispatch(closeSpinner())
      }, 3000)   
    }
  }, [dispatch, navigate, status])
  // useEffect(() => {
  //   console.log(validateUser(user));
  // }, [user]);
  return (
    <main className='font-roboto flex flex-col w-full min-h-screen justify-center items-center bg-gradient-to-r from-gray-300 to-white-500 pb-8 relative'>
    {enableSpinner && <Spinner />}
      <section className='flex flex-col justity-center p-2 w-full w-3/5 gap-8 items-center sm:w-3/5 xl:w-2/5 sm:p-6'>
        <h1 className='text-xl font-bold flex flex-col items-center'>
          <FaPiggyBank size={40}/>
          VATO BANK</h1>
        <form className='flex flex-col sm:min-w-500 flex-l w-full gap-3 bg-white p-5 rounded-md'>
          <h2 className='md font-bold'>Create your account</h2>
          {/* <div className='flex flex-col items-center'>
          {fileErr && <span className="bg-red-500 p-4">{fileErr}</span>}
            <label htmlFor="profilePicture" className="mb-2">Profile Picture</label>
            <input
              type="file"
              id="profile_picture"
              name="profile_picture"
              onChange={handleFileUpload} 
              accept="image/*"
              className="mb-4"
            />
           
           {userFile && (
               <img 
                 src={file} 
                 alt="Profile Preview" 
                 className="w-24 h-24 rounded-full object-cover"
               />
             )}
             
            </div> */}
          <div className='flex flex-col sm:flex-row gap-1 flex-1 w-full sm:gap-6'>
            <InputComponent inputProp={{name: user.name, type: 'text', label: 'Provide Firstname', field: 'name', placeholder: 'Julius', onChange: handleInputChange }} />
            <InputComponent inputProp={{name: user.lastname, type: 'text', label: 'Provide Lastname', field: 'lastname', placeholder: 'Anderson', onChange: handleInputChange }} />
          </div> 
            <InputComponent inputProp={{name: user.email, type: 'email', label: 'Provide Email', field: 'email', placeholder: 'JuliAnderson@gmail.com', onChange: handleInputChange }} />
            <InputComponent inputProp={{name: user.phone_number, type: 'number', label: 'Provide Tel', field: 'phone_number', placeholder: '+2349043456789', onChange: handleInputChange }} />
            <InputComponent inputProp={{name: user.dob, type: 'date', label: 'Provide Date of birth', field: 'dob', onChange: handleInputChange }} />
            <InputComponent inputProp={{name: user.address, type: 'text', label: 'Provide Address', field: 'address', placeholder: '123 Main St, Anytown, USA', onChange: handleInputChange }} />
            <InputComponent inputProp={{name: user.sog, type: 'text', label: 'Provide State of Origin', field: 'sog', placeholder: 'Adamawa state', onChange: handleInputChange }} />
          
            <div className='flex flex-col gap-1 flex-1 w-full mt-2'>
              <label htmlFor='gender'>Gender<span className={errorStyle('gender')}>*</span></label>
              <select value={user.gender} name='gender' onChange={handleInputChange} id='gender' className='flex w-full border border-blue-500 p-3 rounded-md focus:border-yellow-400 leading-none' required>
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className='flex flex-col sm:flex-row gap-1 flex-1 w-full sm:gap-6'>
              <InputComponent inputProp={{name: user.password, type: 'password', label: 'Password', field: 'password', placeholder: 'Enter Your Password', onChange: handleInputChange }} />
              <InputComponent inputProp={{name: user.confirmPassword, type: 'password', label: 'Confirm Password', field: 'confirmPassword', placeholder: 'Confirm Your Password', onChange: handleInputChange }} />             
            </div>
            <button
              disabled={validateUser(user).hasErrors} 
              onClick={signUp} 
              type='button' 
              className={`${disabledStyle} p-2 rounded-xl text-white font-bold mt-2 transition-all`}>
              SIGN UP
            </button>
        </form>
        <p>Have an account? <a href='/login' className='underline text-blue-500'>Login</a></p>        
      </section>
    </main>
  )
}

export default Register
