import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex gap-2'>
            <img className='w-9 h-11' src={logo} alt="" />
            <h3 className='text-3xl'>ClubSphere</h3>
        </div>
    );
};

export default Logo;