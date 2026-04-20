export const calculateOptimalRoute = (destinationType, currentMapData) => {
    const options = currentMapData.filter(s => s.type === destinationType);
    if (options.length === 0) return null;
    
    const sorted = [...options].sort((a, b) => {
        const densityWeight = { low: 0, medium: 10, high: 30 };
        return (densityWeight[a.density] + a.waitTime) - (densityWeight[b.density] + b.waitTime);
    });
    
    const best = sorted[0];
    const secondBest = sorted.length > 1 ? sorted[1] : null;
    
    let reason = "";
    if (secondBest) {
        const timeDiff = secondBest.waitTime - best.waitTime;
        if (timeDiff > 0 && best.density === secondBest.density) {
            reason = `${best.name} selected over ${secondBest.name} to save ${timeDiff} minutes of waiting.`;
        } else if (best.density !== secondBest.density) {
            reason = `${best.name} selected due to significantly lower congestion than ${secondBest.name}.`;
        } else {
            reason = `Optimal route found minimizing both walking and queue times.`;
        }
    } else {
        reason = `Optimal route to ${best.name} found.`;
    }

    const isHighlyCongested = best.waitTime >= 15;
    if (isHighlyCongested) {
        reason = `All ${destinationType} options are currently busy. ${best.name} is the best available option right now.`;
    }

    return {
        destination: best.name,
        status: best.density,
        time: best.waitTime,
        message: reason,
        isHighlyCongested,
        alternatives: sorted.slice(1, 3)
    };
};
