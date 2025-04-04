import React, {useEffect} from 'react'
import { FaSmile, FaBars } from 'react-icons/fa'
import { MdNotificationsActive, MdSettings } from 'react-icons/md' 
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUser, authenticateUser } from '../../features/user/userSlice'
import { openNavbarSelector, toggleNavbar} from '../../features/page/pageSlice'
import {  FaX } from 'react-icons/fa6'


const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(fetchUser)
    const openNav = useSelector(openNavbarSelector)
    const navigate = useNavigate()
    const toggleNav = () => {
        console.log(`${openNav}`)
        console.log('closing navbar')
        dispatch(toggleNavbar())
    }
    const navigatePage = (path) => {
        navigate(path)
    }
    useEffect(() => {}, dispatch, openNav)
    useEffect(() => {
        if (!user) {
            dispatch(authenticateUser({/* pass login credentials here if needed */}));
        }
    }, [dispatch, user]);
  return (
    <header className={`fixed top-0 left-0 right-0 bg-white z-20 flex justify-between items-center p-3 lg:ml-64 border-l-2 border-r-2 border-t-2 border-b-2 ${openNav ? 'w-full' : 'w-4/5'}`}
    style={{ transition: 'width 0.3s ease' }}>
        <h1 className='flex items-center text-gray-center text-lg font-bold gap-1 p-1 '> Welcome {user.email } <FaSmile/></h1>
        <div className='flex items-center ml-auto'>
            {!openNav && <button className='lg:hidden' onClick={toggleNav}><FaBars size={25}/></button>}
            {openNav && <button className='lg:hidden' onClick={toggleNav}><FaX size={25}/></button>}
            <div className='hidden lg:flex gap-5'>
                <button onClick={()=> navigatePage('/dashboard/settings')} className='text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2"'>
                    <MdSettings size={30}/>
                </button>
                {/* <button className='text-blue-500 hover:text-blue-700 flex items-center text-xl transition duration-200 ease-in-out rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    {user.firstname.substring(0, 1) + user.name.substring(0, 1)}
                </button> */}
                <button>
                    <MdNotificationsActive size={30}/>
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header
