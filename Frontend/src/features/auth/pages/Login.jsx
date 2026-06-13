import { useState } from 'react';
import { Link,useNavigate } from 'react-router';
import {useAuth} from '../hook/useAuth'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';



export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const user = useSelector(state=>state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const {handleLogin} = useAuth()
 
  const navigate = useNavigate()


  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password
    }
   
    await handleLogin(payload)
    navigate('/')
  };

  if(!loading && user){
    return <Navigate to={'/'} replace />
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 sm:p-12 border border-slate-700 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#31b864]">
              Welcome Back
            </h1>
            <p className="text-slate-400 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#31b864] focus:border-transparent transition duration-200"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#31b864] focus:border-transparent transition duration-200"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-slate-700 border border-slate-600 rounded text-[#31b864] focus:ring-[#31b864] cursor-pointer"
                />
                <span className="ml-2 text-sm text-slate-400">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#31b864] hover:text-[#2aa059] font-medium transition duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-[#31b864] hover:bg-[#2aa059] disabled:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-[#31b864]/50"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-slate-600"></div>
            <span className="px-3 text-sm text-slate-500">or</span>
            <div className="flex-grow border-t border-slate-600"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#31b864] hover:text-[#2aa059] font-semibold transition duration-200">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-[#31b864] hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}
