import React from 'react';
import { useForm } from 'react-hook-form';
import  { useAuth }  from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log('Form data:', data);

    signInUser(data.email, data.password)
      .then(result => {
        console.log('Logged in user:', result.user);

        // Success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back, ${result.user.email}!`,
          timer: 2000,
          showConfirmButton: false
        });

        // Redirect to home or dashboard
        navigate('/');
      })
      .catch(error => {
        console.error('Login error:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message
        });
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
      <h3 className='text-3xl text-center font-bold'>Welcome back</h3>
      <p className='text-center'>Please Login</p>

      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="input input-bordered w-full"
          placeholder="Email"
        />
        {errors.email?.type === 'required' && (
          <p className='text-red-500'>Email is required</p>
        )}

        {/* Password */}
        <label className="label mt-3">Password</label>
        <input
          type="password"
          {...register('password', { required: true, minLength: 6 })}
          className="input input-bordered w-full"
          placeholder="Password"
        />
        {errors.password?.type === 'required' && (
          <p className='text-red-500'>Password is required</p>
        )}
        {errors.password?.type === 'minLength' && (
          <p className='text-red-500'>Password must be 6 characters or longer</p>
        )}

        <div className="mt-2">
          <Link className="link link-hover">Forgot password?</Link>
        </div>

        <button type="submit" className="btn btn-neutral w-full mt-4">Login</button>

        <p className="mt-4 text-center">
          New to ClubSphere? <Link to="/register" className="text-blue-600 underline">Register</Link>
        </p>

        {/* Social Login (Google) */}
        <SocialLogin />
      </form>
    </div>
  );
};

export default Login;
