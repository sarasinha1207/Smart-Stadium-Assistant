import React, { useMemo } from 'react';
import { Clock, RefreshCw, DoorOpen, Utensils, Zap } from './Icons';
import { densityColors, densityShadows, densityTextColors } from '../data/mockData';

export default function WaitTimes({ mapData, isRefreshing, handleRefreshData }) {
    const fastestGate = useMemo(() => {
        const gates = mapData.filter(s => s.type === 'gate');
        return gates.reduce((prev, curr) => (prev.waitTime < curr.waitTime ? prev : curr), gates[0]);
    }, [mapData]);

    const fastestFood = useMemo(() => {
        const foods = mapData.filter(s => s.type === 'food');
        return foods.reduce((prev, curr) => (prev.waitTime < curr.waitTime ? prev : curr), foods[0]);
    }, [mapData]);

    return (
        <section className="glass-panel rounded-2xl p-6 border border-slate-700/50 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold flex items-center text-white mb-1">
                        <Clock className="mr-3 text-brand-400 w-6 h-6" /> 
                        Waiting Times
                    </h2>
                    <p className="text-sm text-slate-400 ml-9">Live queue estimates for amenities.</p>
                </div>
                <button 
                    onClick={handleRefreshData} 
                    disabled={isRefreshing}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white px-3 py-2 rounded-lg border border-slate-600 transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-brand-400' : ''}`} />
                    <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Refresh Data'}</span>
                </button>
            </div>
            
            <div className="space-y-6 flex-1 relative mt-2">
                {/* Gates */}
                <div>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-2">
                            <DoorOpen className="w-4 h-4 text-slate-400" />
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Exit Gates</h3>
                        </div>
                    </div>
                    <div className="space-y-2 relative">
                        {mapData.filter(s => s.type === 'gate').map(gate => (
                            <div key={gate.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors group relative overflow-hidden">
                                {fastestGate.id === gate.id && (
                                    <div className="absolute top-0 right-0 bg-brand-500/20 text-brand-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg flex items-center gap-1 border-b border-l border-brand-500/30">
                                        <Zap /> Fastest
                                    </div>
                                )}
                                
                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${densityColors[gate.density]} ${densityShadows[gate.density]}`}></div>
                                    <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-sm">{gate.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-16 h-2 rounded-full bg-slate-700 overflow-hidden`}>
                                        <div className={`h-full transition-all duration-700 ease-out ${densityColors[gate.density]}`} style={{width: `${Math.min(100, Math.max(10, gate.waitTime * 4))}%`}}></div>
                                    </div>
                                    <div className={`text-sm font-black w-8 text-right transition-colors duration-500 ${densityTextColors[gate.density]}`}>
                                        {gate.waitTime}m
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Food */}
                <div>
                    <div className="flex items-center gap-2 mb-3 px-1 mt-2">
                        <Utensils className="w-4 h-4 text-slate-400" />
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Concessions</h3>
                    </div>
                    <div className="space-y-2">
                        {mapData.filter(s => s.type === 'food').map(food => (
                            <div key={food.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors group relative overflow-hidden">
                                {fastestFood.id === food.id && (
                                    <div className="absolute top-0 right-0 bg-brand-500/20 text-brand-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg flex items-center gap-1 border-b border-l border-brand-500/30">
                                        <Zap /> Fastest
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${densityColors[food.density]} ${densityShadows[food.density]}`}></div>
                                    <span className="font-semibold text-slate-300 group-hover:text-white transition-colors text-sm">{food.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-16 h-2 rounded-full bg-slate-700 overflow-hidden`}>
                                        <div className={`h-full transition-all duration-700 ease-out ${densityColors[food.density]}`} style={{width: `${Math.min(100, Math.max(10, food.waitTime * 4))}%`}}></div>
                                    </div>
                                    <div className={`text-sm font-black w-8 text-right transition-colors duration-500 ${densityTextColors[food.density]}`}>
                                        {food.waitTime}m
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
