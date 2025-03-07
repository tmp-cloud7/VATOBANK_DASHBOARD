import React, { useEffect, useState } from 'react';
import { FaChevronRight, FaPiggyBank } from 'react-icons/fa';
import InputComponent from '../component/InputComponent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openSpinner, showSpinner, closeSpinner } from '../features/user/page/pageSlice';
import Spinner from '../component/Spinner';
import { fetchUserStatus, authenticateUser, resetStatus } from '../features/user/userSlice';



const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const status = useSelector(fetchUserStatus)
    const enableSpinner = useSelector(showSpinner)
    const handleInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value })
    }
    const enableButton = user.email.length > 0 && user.password.length > 0;
   const login = () => {
    dispatch(openSpinner())
    dispatch(authenticateUser(user))
    alert('Login Successful')
   }
   const disabledStyle = !enableButton ? 'bg-blue-300 hover:bg-blue-300' : 'hover:bg-opacity-90 bg-blue-500'
    useEffect(() => {
       if(status === 'SUCCESS') {
         setTimeout(() => {
           dispatch(resetStatus())
           dispatch(closeSpinner())
           navigate("/dashboard")
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
  return (
    <main className='font-roboto flex flex-col w-screen sm:w-full lg:w-screen md:w-screen h-screen justify-center items-center bg-gradient-to-r from-gray-300 to-white-500 relative'>
        {enableSpinner && <Spinner />}
        <section className='flex flex-col justify-center p-2 w-full w-3/5 gap-8 items-center sm:w-3/5 xl:w-2/5 sm:p-6'>
            <h1 className='text-xl font-bold flex flex-col items-center'>
                <FaPiggyBank size={40}/>VATO BANK</h1>
            <form className='flex flex-col sm:min-w-500 flex-l w-full gap-4 bg-white p-5 rounded-md'>
                <h2>Login to your account</h2>
                <InputComponent inputProp={{field: 'email', type: 'email', value: user.email, onChange: handleInputChange, label:'Email', placeholder: 'Enter Email Address'}}/>
                <InputComponent inputProp={{field: 'password', type: 'password', value: user.password, onChange: handleInputChange, label:'Password', placeholder: 'Enter Password'}}/>
                <a className='underline text-blue-500 flex items-center' href='/'>Forgot Password <FaChevronRight /></a>
                <button disabled={!enableButton} onClick={login} type='button' className= {`${disabledStyle} p-2 rounded-xl text-white font-bold mt-2 transition-all`}>LOGIN</button>
            </form>
            <p>Don't have an account? <a href='/register' className='underline text-blue-500'>Create One</a></p>
        </section>
    </main>
  )
}

export default Login
