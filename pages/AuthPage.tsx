
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { Spinner } from '../components/ui/Spinner';
import { LogoIcon } from '../components/ui/Icons';
import { Button } from '../components/ui/Button';

const AuthForm: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMessage('Check your email for the confirmation link!');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            }
        } catch (err: any) {
            setError(err.error_description || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-center text-white">
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <form className="space-y-6" onSubmit={handleAuth}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-3 py-2 mt-1 text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-400">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full px-3 py-2 mt-1 text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full !bg-blue-600 hover:!bg-blue-700 focus:ring-blue-500"
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                </div>
            </form>
            {error && <p className="text-sm text-center text-red-400">{error}</p>}
            {message && <p className="text-sm text-center text-green-400">{message}</p>}
            <p className="text-sm text-center text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }} className="font-medium text-blue-500 hover:text-blue-400">
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </div>
    );
};

const AuthPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-900 text-gray-200">
            <div className="flex flex-col items-center mb-10 text-center">
                 <LogoIcon className="w-12 h-12 text-blue-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">AI Resume Optimizer</h1>
                <p className="max-w-md mt-3 text-lg text-gray-400">
                    Optimize your resume to match any job description and land your dream job.
                </p>
            </div>
            <AuthForm />
        </div>
    );
};

export default AuthPage;