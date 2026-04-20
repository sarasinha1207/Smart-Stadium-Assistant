import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CrowdMap from '../components/CrowdMap';
import RouteSuggestion from '../components/RouteSuggestion';
import Alerts from '../components/Alerts';
import WaitTimes from '../components/WaitTimes';
import { initialMapSections, initialNotifications } from '../data/mockData';
import { calculateOptimalRoute } from '../utils/logic';

export default function Dashboard() {
    const [mapData, setMapData] = useState(initialMapSections);
    const [alertsData, setAlertsData] = useState(initialNotifications);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [suggestedRoute, setSuggestedRoute] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRouteSearch = () => {
        if (!selectedDestination) return;
        
        setIsCalculating(true);
        
        setTimeout(() => {
            const route = calculateOptimalRoute(selectedDestination, mapData);
            setSuggestedRoute(route);
            setIsCalculating(false);
        }, 200);
    };

    const handleRefreshData = () => {
        setIsRefreshing(true);
        
        setTimeout(() => {
            const newMapData = mapData.map(section => {
                const densityOptions = ['low', 'medium', 'high'];
                const staySame = Math.random() > 0.5; 
                let randomDensity = staySame ? section.density : densityOptions[Math.floor(Math.random() * densityOptions.length)];
                
                let newWaitTime = 0;
                if (section.type !== 'seating') {
                    if (randomDensity === 'low') newWaitTime = Math.floor(Math.random() * 5) + 1;
                    if (randomDensity === 'medium') newWaitTime = Math.floor(Math.random() * 10) + 6;
                    if (randomDensity === 'high') newWaitTime = Math.floor(Math.random() * 20) + 16;
                }
                
                return { ...section, density: randomDensity, waitTime: newWaitTime };
            });
            
            let newAlerts = [];
            
            // 1. Smart Alerts: Redirect users from high congestion areas to low congestion areas
            const highDensityAreas = newMapData.filter(s => s.density === 'high' && s.type !== 'seating');
            if (highDensityAreas.length > 0) {
                const randomHigh = highDensityAreas[Math.floor(Math.random() * highDensityAreas.length)];
                const alternatives = newMapData.filter(s => s.type === randomHigh.type && s.density !== 'high' && s.id !== randomHigh.id);
                
                if (alternatives.length > 0) {
                    const bestAlt = alternatives.reduce((prev, curr) => (prev.waitTime < curr.waitTime ? prev : curr), alternatives[0]);
                    newAlerts.push({
                        id: Date.now(),
                        message: `High congestion at ${randomHigh.name}, redirecting users to ${bestAlt.name}.`,
                        type: 'urgent',
                        time: 'Just now'
                    });
                } else {
                    newAlerts.push({
                        id: Date.now(),
                        message: `Crowd surge detected at ${randomHigh.name}. Consider alternative routes.`,
                        type: 'warning',
                        time: 'Just now'
                    });
                }
            }

            // 2. Auto Recommendations: Suggest less crowded food stalls or washrooms
            const highFood = newMapData.filter(s => s.density === 'high' && s.type === 'food');
            if (highFood.length > 0) {
                const randomHighFood = highFood[Math.floor(Math.random() * highFood.length)];
                const lowFood = newMapData.filter(s => s.density === 'low' && s.type === 'food');
                if (lowFood.length > 0) {
                    newAlerts.push({
                        id: Date.now() + 1,
                        message: `${randomHighFood.name} is extremely busy. We recommend grabbing food at ${lowFood[0].name} to save time.`,
                        type: 'info',
                        time: 'Just now'
                    });
                }
            }

            const highWashroom = newMapData.filter(s => s.density === 'high' && s.type === 'washroom');
            if (highWashroom.length > 0) {
                const randomHighWashroom = highWashroom[Math.floor(Math.random() * highWashroom.length)];
                const lowWashroom = newMapData.filter(s => s.density === 'low' && s.type === 'washroom');
                if (lowWashroom.length > 0) {
                    newAlerts.push({
                        id: Date.now() + 2,
                        message: `Long wait times at ${randomHighWashroom.name}. Suggesting alternate route to ${lowWashroom[0].name}.`,
                        type: 'info',
                        time: 'Just now'
                    });
                }
            }
            
            const combinedAlerts = [...newAlerts, ...alertsData].slice(0, 4);
            combinedAlerts.forEach(alert => {
                if(alert.time === 'Just now' && alert.id !== newAlerts[0]?.id) alert.time = 'Few mins ago';
            });
            
            setMapData(newMapData);
            setAlertsData(combinedAlerts);
            
            if (suggestedRoute && selectedDestination) {
                const updatedRoute = calculateOptimalRoute(selectedDestination, newMapData);
                setSuggestedRoute(updatedRoute);
            }
            
            setIsRefreshing(false);
        }, 400); 
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar isRefreshing={isRefreshing} alertsCount={alertsData.length} />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
                <div className="mb-8 p-5 glass-panel rounded-xl border border-brand-500/20 bg-brand-500/5 relative overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all hover:bg-brand-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                    <p className="text-brand-100 text-sm sm:text-base font-medium leading-relaxed pl-2">
                        This system enhances stadium experience by optimizing crowd movement, reducing wait times, and enabling real-time coordination.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <CrowdMap mapData={mapData} isRefreshing={isRefreshing} />
                        
                        <RouteSuggestion 
                            selectedDestination={selectedDestination}
                            setSelectedDestination={setSelectedDestination}
                            suggestedRoute={suggestedRoute}
                            handleRouteSearch={handleRouteSearch}
                            isCalculating={isCalculating}
                            isRefreshing={isRefreshing}
                        />
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <Alerts alertsData={alertsData} />
                        
                        <WaitTimes 
                            mapData={mapData} 
                            isRefreshing={isRefreshing} 
                            handleRefreshData={handleRefreshData} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
