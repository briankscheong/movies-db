"use client"
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import "@/app/globals.css";

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateForm = (): boolean => {
    if (isSignUp && !username) {
      setError('Username is required');
      return false;
    }
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    router.push('/dashboard')

    // Handle sign-up or sign-in logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 font-mono">
          {/* {isSignUp ? 'Sign Up' : 'Sign In'} */}
          Movies.DB
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {isSignUp && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-required="true"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-cyan-600 rounded hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="flex items-center justify-center mt-6 space-x-4">
          <button
            onClick={() => signIn('apple')}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Sign in with Microsoft"
          >
            <FaApple size={30} />
          </button>
          <button
            onClick={() => signIn('google')}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Sign in with Google"
          >
            <FcGoogle size={30} />
          </button>
          <button
            onClick={() => signIn('microsoft')}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Sign in with Microsoft"
          >
            <FaMicrosoft size={30} />
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600 text-sm">
          {isSignUp
            ? 'Already have an account? '
            : "Don't have an account? "}
          <span
            className="font-bold text-cyan-600 cursor-pointer hover:underline text-sm"
            onClick={() => setIsSignUp(!isSignUp)}
            role="button"
            tabIndex={0}
            aria-pressed={isSignUp}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
