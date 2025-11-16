
import React from 'react';
import { supabase } from '../../services/supabase';
import { LogoIcon, LogoutIcon } from '../ui/Icons';

interface NavbarProps {
    userEmail: string | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ userEmail }) => {
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <LogoIcon className="w-8 h-8 text-primary-500"/>
                        <span className="ml-3 text-xl font-semibold text-slate-100">AI Resume Optimizer</span>
                    </div>
                    <div className="flex items-center">
                        <span className="hidden text-sm text-slate-300 sm:block">{userEmail}</span>
                        <button
                            onClick={handleLogout}
                            className="p-2 ml-4 text-slate-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"
                            aria-label="Logout"
                        >
                            <LogoutIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
