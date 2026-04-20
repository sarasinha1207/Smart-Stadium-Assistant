import React from 'react';
import { Compass, Bell } from './Icons';

export default function Navbar({ isRefreshing, alertsCount }) {
    return (
        <nav className="glass-panel sticky top-0 z-50 border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="bg-brand-500 p-2 rounded-lg text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <Compass />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">Smart Stadium</h1>
                            <p className="text-[10px] text-brand-300 font-medium uppercase tracking-widest leading-none">AI Assistant Core</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                            <div className="relative flex h-2 w-2">
                                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isRefreshing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 animate-ping'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${isRefreshing ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                            </div>
                            <span className="text-xs font-semibold text-slate-300">{isRefreshing ? 'Syncing Sensors...' : 'System Active – Live Updates Running'}</span>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                            <Bell />
                            {alertsCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-[#0f172a]"></span>}
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-purple-500 border border-slate-600 cursor-pointer"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
