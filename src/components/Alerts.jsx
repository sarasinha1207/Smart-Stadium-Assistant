import React from 'react';
import { AlertTriangle, Info } from './Icons';

export default function Alerts({ alertsData }) {
    return (
        <section className="glass-panel rounded-2xl p-6 border border-slate-700/50">
            <div className="mb-5">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-bold flex items-center text-white">
                        <AlertTriangle className="mr-3 text-rose-400 w-6 h-6" /> 
                        System Alerts
                    </h2>
                    <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2.5 py-1 rounded-md border border-rose-500/30">
                        {alertsData.length} Active
                    </span>
                </div>
                <p className="text-sm text-slate-400 ml-9">Real-time incident notifications.</p>
            </div>
            
            <div className="space-y-3 mt-4">
                {alertsData.length === 0 ? (
                    <div className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/50 text-center">
                        <p className="text-slate-400 text-sm">No active alerts at this time.</p>
                    </div>
                ) : (
                    alertsData.map(note => (
                        <div key={note.id} className={`p-4 rounded-xl border-l-4 transition-all hover:translate-x-1 duration-300 ${
                            note.type === 'warning' ? 'border-l-amber-500 bg-slate-800/80 border-y border-r border-slate-700/50' : 
                            note.type === 'urgent' ? 'border-l-rose-500 bg-slate-800/80 border-y border-r border-slate-700/50 shadow-[0_0_10px_rgba(225,29,72,0.1)]' : 
                            'border-l-brand-500 bg-slate-800/80 border-y border-r border-slate-700/50'
                        }`}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex gap-3">
                                    <div className={`mt-0.5 ${
                                        note.type === 'warning' ? 'text-amber-500' : 
                                        note.type === 'urgent' ? 'text-rose-500' : 
                                        'text-brand-500'
                                    }`}>
                                        {note.type === 'warning' || note.type === 'urgent' ? <AlertTriangle className="w-4 h-4"/> : <Info className="w-4 h-4"/>}
                                    </div>
                                    <p className="text-slate-200 text-sm leading-snug font-medium">{note.message}</p>
                                </div>
                            </div>
                            <div className="mt-2 ml-7">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{note.time}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
