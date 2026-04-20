import React from 'react';
import { MapPin, RefreshCw } from './Icons';
import { densityColors, densityShadows } from '../data/mockData';

export default function CrowdMap({ mapData, isRefreshing }) {
    return (
        <section className="glass-panel rounded-2xl p-1 glow-effect">
            <div className="bg-dark-card rounded-2xl p-6 h-full border border-slate-700/50 relative">
                
                {isRefreshing && (
                    <div className="absolute inset-0 z-20 bg-slate-900/50 backdrop-blur-[2px] rounded-2xl flex items-center justify-center transition-all">
                        <div className="bg-slate-800 px-5 py-3 rounded-full shadow-2xl border border-slate-600 flex items-center gap-3">
                            <RefreshCw className="w-5 h-5 text-brand-400 animate-spin" />
                            <span className="text-sm font-semibold text-white">Aggregating Live Sensor Data...</span>
                        </div>
                    </div>
                )}
                
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold flex items-center text-white mb-1">
                                <MapPin className="mr-3 text-brand-400 w-6 h-6" /> 
                                Crowd Movement
                            </h2>
                            <p className="text-sm text-slate-400 ml-9">Monitor real-time density across stadium zones to identify and avoid bottlenecks.</p>
                        </div>
                        
                        <div className="flex flex-col items-start sm:items-end">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">Density Key</span>
                            <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 shadow-inner">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                    <span className="text-xs font-semibold text-slate-300">Low</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                                    <span className="text-xs font-semibold text-slate-300">Med</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.8)]"></span>
                                    <span className="text-xs font-semibold text-slate-300">High</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-900 rounded-xl border border-slate-700/50 overflow-hidden p-6 flex flex-col justify-between shadow-inner group">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20"></div>

                    {/* North */}
                    <div className={`relative z-10 w-3/4 md:w-1/2 mx-auto h-14 rounded-lg flex items-center justify-center font-bold text-white transition-all duration-500 hover:scale-105 cursor-pointer ${densityColors[mapData.find(s=>s.id==='north').density]} ${densityShadows[mapData.find(s=>s.id==='north').density]}`}>
                        North Stand
                    </div>
                    
                    <div className="relative z-10 flex justify-between items-stretch flex-1 my-6 gap-6">
                        {/* West */}
                        <div className={`w-14 md:w-20 rounded-lg flex items-center justify-center font-bold text-white transition-all duration-500 hover:scale-105 cursor-pointer ${densityColors[mapData.find(s=>s.id==='west').density]} ${densityShadows[mapData.find(s=>s.id==='west').density]}`}>
                            <span className="transform -rotate-90 block whitespace-nowrap">West Stand</span>
                        </div>
                        
                        {/* Pitch */}
                        <div className="flex-1 border border-emerald-500/30 rounded-lg bg-emerald-500/5 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute inset-0 border border-emerald-500/20 m-4 rounded"></div>
                            <div className="absolute top-0 bottom-0 left-1/2 border-l border-emerald-500/20"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-emerald-500/20 rounded-full"></div>
                            <span className="text-emerald-500/30 font-black text-2xl md:text-4xl tracking-[0.3em]">PITCH</span>
                        </div>
                        
                        {/* East */}
                        <div className={`w-14 md:w-20 rounded-lg flex items-center justify-center font-bold text-white transition-all duration-500 hover:scale-105 cursor-pointer ${densityColors[mapData.find(s=>s.id==='east').density]} ${densityShadows[mapData.find(s=>s.id==='east').density]}`}>
                            <span className="transform rotate-90 block whitespace-nowrap">East Stand</span>
                        </div>
                    </div>
                    
                    {/* South */}
                    <div className={`relative z-10 w-3/4 md:w-1/2 mx-auto h-14 rounded-lg flex items-center justify-center font-bold text-white transition-all duration-500 hover:scale-105 cursor-pointer ${densityColors[mapData.find(s=>s.id==='south').density]} ${densityShadows[mapData.find(s=>s.id==='south').density]}`}>
                        South Stand
                    </div>
                </div>
            </div>
        </section>
    );
}
