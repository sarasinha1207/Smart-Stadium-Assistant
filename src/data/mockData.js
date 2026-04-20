export const initialMapSections = [
    { id: 'north', name: 'North Stand', density: 'low', type: 'seating', waitTime: 0 },
    { id: 'south', name: 'South Stand', density: 'high', type: 'seating', waitTime: 0 },
    { id: 'east', name: 'East Stand', density: 'medium', type: 'seating', waitTime: 0 },
    { id: 'west', name: 'West Stand', density: 'low', type: 'seating', waitTime: 0 },
    { id: 'gate1', name: 'Gate 1', density: 'low', type: 'gate', waitTime: 2 },
    { id: 'gate2', name: 'Gate 2', density: 'medium', type: 'gate', waitTime: 12 },
    { id: 'gate3', name: 'Gate 3', density: 'high', type: 'gate', waitTime: 25 },
    { id: 'food1', name: 'Burger Stand A', density: 'high', type: 'food', waitTime: 18 },
    { id: 'food2', name: 'Drinks Kiosk B', density: 'low', type: 'food', waitTime: 4 },
    { id: 'washroom1', name: 'Washroom N', density: 'medium', type: 'washroom', waitTime: 5 },
    { id: 'washroom2', name: 'Washroom S', density: 'low', type: 'washroom', waitTime: 1 },
];

export const initialNotifications = [
    { id: 1, message: "System initialized. Monitoring real-time stadium telemetry.", type: "info", time: "Just now" },
    { id: 2, message: "Match starting in 15 minutes. Please head to your designated seating areas.", type: "warning", time: "10 min ago" },
];

export const densityColors = { low: "bg-emerald-500", medium: "bg-amber-500", high: "bg-rose-500" };
export const densityShadows = { low: "shadow-[0_0_15px_rgba(16,185,129,0.5)]", medium: "shadow-[0_0_15px_rgba(245,158,11,0.5)]", high: "shadow-[0_0_15px_rgba(225,29,72,0.5)]" };
export const densityTextColors = { low: "text-emerald-400", medium: "text-amber-400", high: "text-rose-400" };
export const densityBgLight = { low: "bg-emerald-500/10", medium: "bg-amber-500/10", high: "bg-rose-500/10" };
export const densityBorder = { low: "border-emerald-500/50", medium: "border-amber-500/50", high: "border-rose-500/50" };
