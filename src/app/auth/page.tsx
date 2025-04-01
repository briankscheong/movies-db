"use client"
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from "react-icons/fa";
// import { FaMicrosoft } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import "@/app/globals.css";

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateForm = (): boolean => {
    if (isSignUp && !username) {
      setError('Username is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const url = process.env.NEXT_PUBLIC_NODEJS_BACKEND_URL + `/auth/${isSignUp ? "signup" : "login"}`; 

    const options = {
      method: 'POST',
      credentials: 'include' as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username, password: password}),
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      }
      else {
        setCookie("accessToken", `${json.access_token}`, {
          httpOnly: false,
          maxAge: 24 * 60 * 60,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          secure: process.env.NODE_ENV === "production",
        });
        setCookie("refreshToken", `${json.refresh_token}`, {
          httpOnly: false, 
          maxAge: 24 * 60 * 60,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          secure: process.env.NODE_ENV === "production",
        });
        // deleteCookie("accessToken");
        // deleteCookie("foo");
        // deleteCookie("refreshToken");
        // router.push('/movies/trending');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-white font-mono">
          Movies.DB
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-required="true"
              className="bg-white text-black w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-800"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              className="bg-white text-black w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-800"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-cyan-700 rounded hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="flex items-center justify-center mt-6 space-x-4">
          <button
            onClick={() => signIn('apple')}
            className="text-white hover:text-gray-400 focus:outline-none"
            aria-label="Sign in with Microsoft"
          >
            <FaApple size={30} />
          </button>
          <button
            onClick={() => signIn('google')}
            className="text-white hover:text-gray-400 focus:outline-none"
            aria-label="Sign in with Google"
          >
            <FcGoogle size={30} />
          </button>
          {/* <button
            onClick={() => signIn('microsoft')}
            className="text-white hover:text-gray-400 focus:outline-none"
            aria-label="Sign in with Microsoft"
          >
            <FaMicrosoft size={30} />
          </button> */}
        </div>
        <p className="mt-4 text-center text-white text-sm">
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
