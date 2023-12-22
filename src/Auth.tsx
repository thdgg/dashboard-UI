// Layout.tsx
import React from 'react';
import { Link } from "react-router-dom";

const Auth: React.FC = () => {
    return (
        <div className="flex h-screen bg-blue-900 text-white">
            <div className="w-2/5 bg-blue-950 p-10">
                <h1 className="text-3xl font-bold">MPAP</h1>
                <p className="mt-4">A multi platform app</p>
                <p>For Nitro, Photpho and Kali prediction</p>
            </div>
            <div className="w-3/5 p-10 flex flex-col justify-between bg-black">
                <div className="text-right">
                    <h2 className="text-xl font-semibold">Welcome</h2>
                    <Link to='/login'><button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded my-3 focus:outline-none focus:shadow-outline">Login</button></Link>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
                </div>
                <div className="text-right">
                    <p className="text-white font-bold px">A4D2H</p>
                    <p>Learn more about us</p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
