import React from 'react';
import { Navigation, Star, CheckCircle, AlertTriangle } from './Icons';
import { densityBgLight, densityBorder, densityColors, densityTextColors } from '../data/mockData';

export default function RouteSuggestion({ 
    selectedDestination, 
    setSelectedDestination, 
    suggestedRoute, 
    handleRouteSearch, 
    isCalculating, 
    isRefreshing 
}) {
    return (
        <section className="glass-panel rounded-2xl p-6 border border-slate-700/50">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center mb-1">
                    <Navigation className="mr-3 text-brand-400 w-6 h-6" /> 
                    Live Coordination
                </h2>
                <p className="text-sm text-slate-400 ml-9">AI-driven pathfinding to minimize your walking and waiting time.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Select Destination Type</label>
                    <select 
                        className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 block p-3 transition-all outline-none font-medium appearance-none"
                        value={selectedDestination}
                        onChange={(e) => setSelectedDestination(e.target.value)}
                        style={{ backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1em" }}
                    >
                        <option value="" className="bg-slate-800">Choose where to go...</option>
                        <option value="gate" className="bg-slate-800">Exit Gates</option>
                        <option value="food" className="bg-slate-800">Food & Beverages</option>
                        <option value="washroom" className="bg-slate-800">Washrooms</option>
                    </select>
                </div>
                <button 
                    onClick={handleRouteSearch}
                    disabled={!selectedDestination || isCalculating || isRefreshing}
                    className="w-full sm:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 flex items-center justify-center min-w-[160px]"
                >
                    {isCalculating ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Routing...</span>
                        </div>
                    ) : "Find Best Route"}
                </button>
            </div>
            
            {suggestedRoute && !isCalculating && (
                <div className="mt-5 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className={`p-6 rounded-2xl border-2 ${suggestedRoute.isHighlyCongested ? 'border-amber-500/50 bg-amber-500/10' : densityBgLight[suggestedRoute.status]} ${suggestedRoute.isHighlyCongested ? '' : densityBorder[suggestedRoute.status]} transition-all relative overflow-hidden`}>
                        
                        <div className={`absolute top-0 right-0 ${suggestedRoute.isHighlyCongested ? 'bg-amber-500 text-amber-950' : 'bg-brand-500 text-white'} text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5 shadow-lg`}>
                            {suggestedRoute.isHighlyCongested ? <AlertTriangle className="w-3 h-3" /> : <Star />} 
                            {suggestedRoute.isHighlyCongested ? 'Expect Delays' : 'Top Recommendation'}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="mt-2 sm:mt-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className={`w-5 h-5 ${suggestedRoute.isHighlyCongested ? 'text-amber-400' : densityTextColors[suggestedRoute.status]}`} />
                                    <h3 className={`font-black text-xl tracking-tight ${suggestedRoute.isHighlyCongested ? 'text-amber-400' : densityTextColors[suggestedRoute.status]}`}>
                                        {suggestedRoute.destination}
                                    </h3>
                                </div>
                                <p className="text-slate-300 text-sm font-medium">{suggestedRoute.message}</p>
                            </div>
                            <div className="bg-slate-900/80 px-6 py-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center shrink-0 shadow-inner">
                                <div className={`text-3xl font-black ${suggestedRoute.isHighlyCongested ? 'text-amber-400' : densityTextColors[suggestedRoute.status]}`}>
                                    {suggestedRoute.time} <span className="text-sm font-bold text-slate-500">min</span>
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Est. Wait Time</div>
                            </div>
                        </div>
                    </div>

                    {suggestedRoute.alternatives && suggestedRoute.alternatives.length > 0 && (
                        <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Alternative Options</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {suggestedRoute.alternatives.map((alt, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700 shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${densityColors[alt.density]}`}></div>
                                            <span className="text-sm font-semibold text-slate-300">{alt.name}</span>
                                        </div>
                                        <span className={`text-sm font-bold ${densityTextColors[alt.density]}`}>{alt.waitTime} min</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
