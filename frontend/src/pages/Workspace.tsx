// src/pages/Workspace.tsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';

const WorkspacePage = () => {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-black text-neutral-100 grid place-items-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <h1 className="text-lg font-semibold">Welcome to your Workspace</h1>
                <p className="text-sm text-neutral-500 mt-2">This is the workspace page</p>
                <Button onClick={logout} className="w-full mt-4">Logout</Button>
            </div>
        </div>
    );
};

export default WorkspacePage;
