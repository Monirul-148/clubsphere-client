import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../components/Logo/Logo';
import authImage from '../assets/login.png'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo></Logo>
            <div className='flex'> 
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img className='w-150 h-150' src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;