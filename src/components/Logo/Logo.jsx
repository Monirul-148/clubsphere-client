import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div className='flex gap-2'>
            <img className='w-9 h-11' src={logo} alt="" />
            <Link to='/'><h3 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-pink-500 bg-clip-text text-transparent">
  ClubSphere
</h3></Link>

        </div>
    );
};

export default Logo;